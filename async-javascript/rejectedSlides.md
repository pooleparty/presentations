----

## Solving issues with callbacks
* calling too early <!-- .element: class="fragment" -->
* calling too late <!-- .element: class="fragment" -->
* never calling the callback <!-- .element: class="fragment" -->
* calling too few/many times <!-- .element: class="fragment" -->
* failing to pass along any parameters/environment <!-- .element: class="fragment" -->

Notes:

#### Calling too early

* Promises by definition cannot be susceptible to this concern, because even an immediately fulfilled Promise cannot be observed synchronously.
* That is, when you call `then(..)` on a Promise, even if that Promise was already resolved, the callback you provide to `then(..)` will always be called asynchronously (see `Jobs`)

#### Calling too late

* A Promise's `then(..)` registered observation callbacks are automatically scheduled when either `resolve(..)` or `reject(..)` are called by the Promise creation capability.
* Those scheduled callbacks will predictably be fired at the next asynchronous moment.
* It's not possible for synchronous observation, so it's not possible for a synchronous chain of tasks to run in such a way to in effect "delay" another callback from happening as expected.
* That is, when a Promise is resolved, all `then(..)` registered callbacks on it will be called, in order, immediately at the next asynchronous opportunity (again, see `Jobs`), and nothing that happens inside of one of those callbacks can affect/delay the calling of the other callbacks (run-to-completion).

#### Never calling the callback

* First, nothing (not even a JS error) can prevent a Promise from notifying you of its resolution (if it's resolved).
  * If you register both fulfillment and rejection callbacks for a Promise, and the Promise gets resolved, one of the two callbacks will always be called.
* It is however possible for a Promise itself to never get resolved.
  * There are ways to handle this (Promise race with timeout promise)

#### Calling Too Few or Too Many Times

* By definition, one is the appropriate number of times for the callback to be called. The "too few" case would be zero calls, which is the same as the "never" case we just examined.
* Promises are defined so that they can only be resolved once.

* Because a Promise can only be resolved once, any then(..) registered callbacks will only ever be called once (each).
* If you register the same callback more than once, (e.g., `p.then(f); p.then(f);`), it will be called as many times as it was registered

#### Failing to Pass Along Any Parameters/Environment

* If the Promise creation code tries to call `resolve(..)` or `reject(..)` multiple times, or tries to call both, the Promise will only the first resolution, and will silently ignore any subsequent attempts.
* Promises can have, at most, one resolution value (fulfillment or rejection).
* If you want to pass along multiple values, you must wrap them in another single value that you pass, such as an array or an object.
* If you call `resolve(..)` or `reject(..)` with multiple parameters, all subsequent parameters beyond the first will be silently ignored.
* If you don't explicitly resolve (or reject) with a value, the value is `undefined`.
* As for environment, functions in JS always retain their closure of the scope in which they're defined, so they of course would continue to have access to whatever surrounding state you provide (same for callbacks). 

#### Swallowing Any Errors/Exceptions

* In the base sense, this is a restatement of the previous point.
* If you reject a Promise with a reason (aka error message), that value is passed to the rejection callback(s).
* If at any point in the creation of a Promise, or in the observation of its resolution, a JS exception error occurs, that exception will be caught, and it will force the Promise in question to become rejected.
* This effectively solves another potential Zalgo moment, which is that errors could create a synchronous reaction whereas nonerrors would be asynchronous

----



## Issues with Promises

* sequence error handling
* single value
* callback inertia
* uncancellable

Notes:

#### Sequence Error Handling

* The limitations of how Promises are designed -- how they chain, specifically -- creates a very easy pitfall where an error in a Promise chain can be silently ignored accidentally.
* Because a Promise chain is nothing more than some number of Promises wired together, there's no entity to refer to the entire chain as a single thing, which means there's no external way to observe any errors that may occur.
* If you construct a Promise chain that has no error handling in it, any error anywhere in the chain will propagate indefinitely down the chain, until observed (by registering a rejection handler at some step).
* Having a reference to the last promise in the chain is enough, because you can register a rejection handler there, and it will be notified of any propagated errors.
* It's basically the same limitation that exists with a `try..catch` that can catch an exception and simply swallow it. So this isn't a limitation unique to Promises.

#### Single Value

* Promises by definition only have a single fulfillment value or a single rejection reason. In simple examples, this isn't that big of a deal, but in more sophisticated scenarios, you may find this limiting.
* The typical advice is to construct a values wrapper (such as an object or array) to contain these multiple messages. This solution works, but it can be quite awkward and tedious to wrap and unwrap your messages with every single step of your Promise chain.

#### Inertia

* "A code base in motion (with callbacks) will remain in motion (with callbacks) unless acted upon by a smart, Promises-aware developer."
* If all the code that currently exists which is not already Promise-aware, you're gonna have a bad time. If you have lots of callback-based code, it's far easier to just keep coding in that same style.
* `promisify` utility in Node

#### Uncancellable

* Once you create a Promise and register a fulfillment and/or rejection handler for it, there's nothing external you can do to stop that progression if something else happens to make that task moot.
* if you kick off an expensive database query with a promise, and determine you didn't actually need it, too bad.
* Many Promise abstraction libraries provide facilities to cancel Promises, but this is a terrible idea! 
* Many developers wish Promises had natively been designed with external cancelation capability, but the problem is that it would let one consumer/observer of a Promise affect some other consumer's ability to observe that same Promise.
* This violates the future-value's trustability (external immutability), but moreover is the embodiment of the "action at a distance" anti-pattern
* "...behavior in one part of a program varies wildly based on difficult or impossible to identify operations in another part of the program..."

----

## Promise Chaining and Unwrapping

a Promise returned from a resolution (or rejection) handler will be unwrapped recursively

Notes: 

* We can string multiple Promises together to represent a sequence of async steps.
* The key to making this work is built on two behaviors intrinsic to Promises:
  * Every time you call `then(..)` on a Promise, it creates and returns a new Promise, which we can chain with.
  * Whatever value you return from the `then(..)` call's fulfillment callback (the first parameter) is automatically set as the fulfillment of the chained Promise (from the first point).
* Recall how `Promise.resolve(..)` operates when what you pass to it is a Promise or thenable instead of a final value. `Promise.resolve(..)` unwraps the value of a received thenable -- and keeps going recursively while it keeps unwrapping thenables.
* The same sort of unwrapping happens if you return a thenable or Promise from the fulfillment (or rejection) handler. 

----
