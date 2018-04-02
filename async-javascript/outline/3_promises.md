# Promises

[Link to book chapter 3][1]

What if we could uninvert that inversion of control? What if instead of handing the continuation of our program to another party, we could expect it to return us a capability to know when its task finishes, and then our code could decide what to do next?

Promises let us accomplish this.

## Future Value

A promise is a _future value_.

### Cheeseburger scenario

I walk up to the counter at a fast-food restaurant, and place an order for a cheeseburger and pay. By placing my order and paying for it, I've made a request for a value back (the cheeseburger). I've started a transaction.

But often, the cheeseburger is not immediately available. The cashier hands me something in place of my cheeseburger: a receipt with an order number on it. This order number is an IOU ("I owe you") promise that ensures that eventually, I should receive my cheeseburger.

While I wait, I can do other things, like send a text message to a friend that says, "Hey, can you come join me for lunch? I'm going to eat a cheeseburger."

I am reasoning about my future cheeseburger already, even though I don't have it in my hands yet. My brain is able to do this because it's treating the order number as a placeholder for the cheeseburger. The placeholder essentially makes the value time independent. It's a future value.

Eventually, I hear, "Order 113!" and I walk back up to the counter with receipt in hand. I hand my receipt to the cashier, and I take my cheeseburger in return.

In other words, once my future value was ready, I exchanged my value-promise for the value itself.

But there's another possible outcome. They call my order number, but when I go to retrieve my cheeseburger, the cashier informs me, "I'm sorry, but we appear to be all out of cheeseburgers." This is an important characteristic of future values: they can either indicate a success or failure.

Every time I order a cheeseburger, I know that I'll either get a cheeseburger eventually, or I'll get the sad news of the cheeseburger shortage, and I'll have to figure out something else to eat for lunch.

By using a function that is temporally consistent -- it behaves the same across now and later times -- async code is much easier to reason about. In other words, to consistently handle both now and later, make both of them later: all operations become async.

## Promise Value

The underlying value that a promise represents may be ready now or later, but the promise normalizes the behavior to be the same regardless.

When a promise value is "ready" we say that the promise is resolved. A successful resolution is refered to as a promise fulfillment. It's also possible that the resolution of a promise is rejection instead of fulfillment.

Because Promises are time-independent, they can be composed (combined) in predictable ways regardless of the timing or outcome underneath.

Once a Promise is resolved, it stays that way forever -- it becomes an immutable value at that point -- and can then be observed as many times as necessary. This makes it safe to pass that promise around to any party and know that it cannot be modified accidentally or maliciously. It is not possible for one party to affect another party's ability to observe Promise resolution.

## Completion Event

There's another way to think of the resolution of a Promise: as a flow-control mechanism -- a temporal this-then-that -- for two or more steps in an asynchronous task.

Let's imagine calling a function `foo()` to perform some task. We don't know about any of its details, nor do we care. It may complete the task right away, or it may take a while.

We'd like a way to be notified of `foo()`'s completion so that we can continue.

Instead of using callbacks and relying on `foo()` to invoke our callback, we invert this pattern and restore control back to the calling code. `foo()` returns a future value (promise) that can be used by multiple separate parts of code.

## Promise Events

To create a promise, we can use the [revealing constructor pattern][3]:

```javascript
new Promise(function(resolve, reject) {
  // eventually, call `resolve(..)` or `reject(..)`,
  // which are the resolution callbacks for
  // the promise.
});
```

In this pattern, the function passed in is executed immediately, and it's provided two parameters, that are the resolution functions for the promise. `resolve(..)` generally signals fulfillment, and `reject(..)` signals rejection.

### Message passing

In order to pass a value, either as a part of promise fulfillment or rejection, to functions that consume our promise, we call either `resolve` or `reject` with the desired value.

```javascript
function foo(x, y) {
  return new Promise(function(resolve, reject) {
    var sum = x + y;
    if (sum % 2 === 0) {
      resolve(sum);
    } else {
      reject(new Error(x + " + " + y + " is not even"));
    }
  });
}

foo(1, 2).then(
  function(sum) {
    console.log("Even", sum);
  },
  function(error) {
    console.error("Not even", error);
  }
);
```

### Flow control

Promise resolution doesn't necessarily need to involve sending along a message, it can just be a flow-control signal.

```javascript
function bar() {
  // `foo(..)` has definitely finished, so
  // do `bar(..)`'s task
}

function oopsBar() {
  // oops, something went wrong in `foo(..)`,
  // so `bar(..)` didn't run
}

// ditto for `baz()` and `oopsBaz()`

var p = foo(42);

p.then(bar, oopsBar);

p.then(baz, oopsBaz);
```

The fact that this snippet calls then(..) twice against the same promise `p` illustrates the point that Promises (once resolved) retain their same resolution (fulfillment or rejection) forever, and can be observed as many times as necessary.

## Thenable Duck Typing

> "If it looks like a duck, and quacks like a duck, it must be a duck"

An important detail when working with promises is how to know for sure if some value will behave like a Promise.

The way to recognize a Promise is to define something called a "thenable" as any object or function which has a `then(..)` method on it. It is assumed that any such value is a Promise-conforming thenable.

If you try to fulfill a Promise with any object/function value that happens to have a then(..) function on it, but you weren't intending it to be treated as a Promise/thenable, you're out of luck, because it will automatically be recognized as thenable.

This means that no value (or any of its delegates), either past, present, or future, can have a then(..) function present, either on purpose or by accident, or that value will be confused for a thenable in Promises systems, which will probably create bugs that are really hard to track down.

## Promise Trust

Recall the trust issues with callbacks-only coding. When you pass a callback to a utility `foo(..)`, it might:

* Call the callback too early
* Call the callback too late (or never)
* Call the callback too few or too many times
* Fail to pass along any necessary environment/parameters
* Swallow any errors/exceptions that may happen

### Calling Too Early

Even an immediately fulfilled Promise (like `new Promise(function(resolve){ resolve(42); })`) cannot be observed synchronously.

That is, when you call `then(..)` on a Promise, even if that Promise was already resolved, the callback you provide to `then(..)` will always be called asynchronously (for more on this, refer back to [Jobs][4]).

### Calling Too Late

A Promise's `then(..)` registered observation callbacks are automatically scheduled when either `resolve(..)` or `reject(..)` are called by the Promise creation function. Those scheduled callbacks will predictably be fired at the next asynchronous moment (see [Jobs][4]).

When a Promise is resolved, all `then(..)` registered callbacks on it will be called, in order, immediately at the next asynchronous opportunity, and nothing that happens inside of one of those callbacks can affect/delay the calling of the other callbacks.

### Promise Scheduling Quirks

It's important to note, though, that there are lots of nuances of scheduling where the relative ordering between callbacks chained off two separate Promises is not reliably predictable.

If two promises p1 and p2 are both already resolved, it should be true that p1.then(..); p2.then(..) would end up calling the callback(s) for p1 before the ones for p2. But there are subtle cases where that might not be true, such as the following:

```javascript
var p3 = new Promise(function(resolve, reject) {
  resolve("B");
});

var p1 = new Promise(function(resolve, reject) {
  resolve(p3);
});

var p2 = new Promise(function(resolve, reject) {
  resolve("A");
});

p1.then(function(v) {
  console.log(v);
});

p2.then(function(v) {
  console.log(v);
});

// A B  <-- not  B A  as you might expect
```

As you can see, `p1` is resolved not with an immediate value, but with another promise `p3` which is itself resolved with the value "B". The specified behavior is to unwrap `p3` into `p1`, but asynchronously, so `p1`'s callback(s) are behind `p2`'s callback(s) in the asynchronous Job queue.

You should never rely on anything about the ordering/scheduling of callbacks across Promises. In fact, a good practice is not to code in such a way where the ordering of multiple callbacks matters at all.

### Never Calling the Callback

Nothing (not even a JS error) can prevent a Promise from notifying you of its resolution (if it's resolved). If you register both fulfillment and rejection callbacks for a Promise, and the Promise gets resolved, one of the two callbacks will always be called.

If your callbacks themselves have JS errors, you may not see the outcome you expect, but the callback will in fact have been called.

But what if the Promise itself never gets resolved either way? Even that is a condition that Promises provide an answer for, using a higher level abstraction called a "race":

```javascript
// a utility for timing out a Promise
function timeoutPromise(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject("Timeout!");
    }, delay);
  });
}

// setup a timeout for `foo()`
Promise.race([
  foo(), // attempt `foo()`
  timeoutPromise(3000) // give it 3 seconds
]).then(
  function() {
    // `foo(..)` fulfilled in time!
  },
  function(err) {
    // either `foo()` rejected, or it just
    // didn't finish in time, so inspect
    // `err` to know which
  }
);
```

### Calling Too Few or Too Many Times

By definition, one is the appropriate number of times for the callback to be called. The "too few" case would be zero calls, which is the same as the "never" case we just examined.

Promises are defined so that they can only be resolved once. If for some reason the Promise creation code tries to call `resolve(..)` or `reject(..)` multiple times, or tries to call both, the Promise will accept only the first resolution, and will silently ignore any subsequent attempts.

Because a Promise can only be resolved once, any then(..) registered callbacks will only ever be called once (each).

If you register the same callback more than once, (e.g., `p.then(f); p.then(f);`), it'll be called as many times as it was registered.

### Failing to Pass Along Any Parameters/Environment

Promises can have, at most, one resolution value (fulfillment or rejection).

If you don't explicitly resolve with a value either way, the value is `undefined`. But whatever the value, it will always be passed to all registered (and appropriate: fulfillment or rejection) callbacks, either now or in the future.

If you call `resolve(..)` or `reject(..)` with multiple parameters, all subsequent parameters beyond the first will be silently ignored. If you want to pass along multiple values, you must wrap them in another single value that you pass, such as an array or an object.

As for environment, functions in JS always retain their closure of the scope in which they're defined, so they of course would continue to have access to whatever surrounding state you provide. The same is true of callbacks-only design, so this isn't a specific augmentation of benefit from Promises.

### Swallowing Any Errors/Exceptions

In the base sense, this is a restatement of the previous point. If you reject a Promise with a reason (aka error message), that value is passed to the rejection callback(s).

If at any point in the creation of a Promise, or in the observation of its resolution, a JS exception error occurs, such as a `TypeError` or `ReferenceError`, that exception will be caught, and it will force the Promise in question to become rejected.

This is an important detail, because it effectively solves another potential Zalgo moment, which is that errors could create a synchronous reaction whereas nonerrors would be asynchronous. Promises turn even JS exceptions into asynchronous behavior, thereby reducing the race condition chances greatly.

```javascript
var p = new Promise(function(resolve, reject) {
  resolve(42);
});

p.then(
  function fulfilled(msg) {
    foo.bar(); // foo is not defined, error is thrown
    console.log(msg); // never gets here
  },
  function rejected(err) {
    // never gets here either
  }
);
```

Wait, that makes it seem like the exception from `foo.bar()` really did get swallowed. Never fear, it didn't. But something deeper is wrong, which is that we've failed to listen for it.

The `p.then(..)` call itself returns another promise, and it's that promise that will be rejected with the `TypeError` exception.

Why couldn't it just call the error handler we have defined there? Seems like a logical behavior on the surface. But it would violate the fundamental principle that Promises are immutable once resolved. `p` was already fulfilled to the value `42`, so it can't later be changed to a rejection just because there's an error in observing `p`'s resolution.

Besides the principle violation, such behavior could wreak havoc, if say there were multiple `then(..)` registered callbacks on the promise `p`, because some would get called and others wouldn't, and it would be very opaque as to why.

### Trustable Promise?

Promises don't get rid of callbacks.

They just change where the callback is passed to. Instead of passing a callback to `foo(..)`, we get something (ostensibly a genuine Promise) back from `foo(..)`, and we pass the callback to that something instead.

How can we be sure the something we get back is in fact a trustable Promise?

Promises have a solution to this issue as well. Included with the native ES6 `Promise` implementation is `Promise.resolve(..)`.

Promises is that they have a solution to this issue as well. Included with the native ES6 Promise implementation is Promise.resolve(..).

If you pass an immediate, non-Promise, non-thenable value to `Promise.resolve(..)`, you get a promise that's fulfilled with that value.

As such, these two promises `p1` and `p2` will behave basically identically:

```javascript
var p1 = new Promise(function(resolve, reject) {
  resolve(42);
});

var p2 = Promise.resolve(42);
```

But if you pass a genuine Promise to `Promise.resolve(..)`, you just get the same promise back:

```javascript
var p1 = Promise.resolve(42);

var p2 = Promise.resolve(p1);

p1 === p2; // true
```

`Promise.resolve(..)` will accept any thenable, and will unwrap it to its non-thenable value. But you get back from `Promise.resolve(..)` a real, genuine Promise in its place, one that you can trust. If what you passed in is already a genuine Promise, you just get it right back, so there's no downside at all to filtering through `Promise.resolve(..)` to gain trust.

## Chain Flow

Promises are not just a mechanism for a single-step _this-then-that_ sort of operation. We can string multiple Promises together to represent a sequence of async steps.

The key to making this work is built on two behaviors intrinsic to Promises:

* Every time you call `then(..)` on a Promise, it creates and returns a new Promise, which we can chain with.
* Whatever value you return from the `then(..)` call's fulfillment callback (the first parameter) is automatically set as the fulfillment of the chained Promise (from the first point).

[Chaining Example][5]

```javascript
var p = Promise.resolve(21);

var p2 = p.then(function(v) {
  console.log(v); // 21

  // fulfill `p2` with value `42`
  return v * 2;
});

// chain off `p2`
p2.then(function(v) {
  console.log(v); // 42
});
```

But there's something missing here. What if we want step 2 to wait for step 1 to do something asynchronous? We're using an immediate return statement, which immediately fulfills the chained promise.

The same sort of behavior that happens with `Promise.resolve(..)` happens if you return a thenable or Promise from the fulfillment (or rejection) handler, it unwraps the value of a received thenable -- and keeps going recursively while it keeps unwrapping thenables.

[Unwrap Example][6]

## Terminology: Resolve, Fulfill, and Reject

```javascript
var p = new Promise(function(X, Y) {
  // X() for fulfillment
  // Y() for rejection
});
```

As you can see, two callbacks (here labeled `X` and `Y`) are provided. The first is _usually_ used to mark the Promise as fulfilled, and the second **always** marks the Promise as rejected. But what's the "usually" about, and what does that imply about accurately naming those parameters?

## Error Handling

## Promise Patterns

### `Promise.all([ .. ])`

### `Promise.race([ .. ])`

### Concurrent Iterations

## Promise Limitations

### Sequence Error Handling

### Single Value

Promises by definition only have a single fulfillment value or a single rejection reason. In simple examples, this isn't that big of a deal, but in more sophisticated scenarios, you may find this limiting.

### Single Resolution

### Inertia

One concrete barrier to starting to use Promises in your own code is all the code that currently exists which is not already Promise-aware. If you have lots of callback-based code, it's far easier to just keep coding in that same style.

>"A code base in motion (with callbacks) will remain in motion (with callbacks) unless acted upon by a smart, Promises-aware developer."

### Promise Uncancelable

### Promise Performance

[1]: https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md
[2]: ./examples/promises/callbacksToPromises.js
[3]: https://blog.domenic.me/the-revealing-constructor-pattern/
[4]: ./1_asynchrony.md#jobs
[5]: ./examples/promises/chaining.js
[6]: ./examples/promises/unwrap.js
