# Async Javascript

---

### Javascript is single threaded

Notes:

* single-threading is the processing of one command at a time
* The JS engine doesn't run in isolation. It runs inside a hosting environment, which is for most developers the typical web browser or V8 engine for Node.
* there are multiple threads under the hood that are used for I/O and other async tasks, but the execution of messages in a JS runtime is single threaded
* How does Javascript handle 
---

### Event Loop

![Event loop](/images/eventloop.png)

Notes:

* A JavaScript runtime uses a message queue, which is a list of messages to be processed.
* Each message has an associated function which gets called in order to handle the message.
* At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one.
* To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter.
* The processing of functions continues until the stack is once again empty; then the event loop will process the next message in the queue (if there is one).
* `queue.waitForMessage()` waits synchronously for a message to arrive if there is none currently.
* In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there is no listener, the event is lost. So a click on an element with a click event handler will add a message--likewise with any other event.
* Things like async requests, I/O, events, and callbacks can add new messages onto the queue

---

### Run-to-Completion

Code inside of a function is atomic, which means that once it starts running, the entirety of the function's code will finish before any of the code in another function can run

Notes: 

* Each message in the event loop is processed completely before any other message is processed
* Whenever a function runs, it cannot be pre-empted and will run entirely before any other code runs (and can modify data the function manipulates) (single threaded)

---

### Never blocking

Handling I/O is typically performed via events and callbacks

Notes:
A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or an XHR request to return, it can still process other things like user input.

Legacy exceptions exist like alert or synchronous XHR, but it is considered as a good practice to avoid them. Beware, exceptions to the exception do exist (but are usually implementation bugs rather than anything else).

---

### Callbacks

```javascript
const button = document.getElementById("btn_1");

button.addEventListener('click', function() { // <- callback
  alert("Btn 1 Clicked");
});
```

Notes:

* A callback function, also known as a higher-order function, is a function that is passed to another function as a parameter, and the callback function is called inside the other function
* When a program makes an async request to fetch some data from a server, it sets up the "response" code in a callback function, and the JS engine tells the hosting environment it's running in, "Hey, I'm going to suspend execution for now, but whenever you finish with that network request, and you have some data, please call this function back."
* The hosting environment is then set up to listen for the response from the network, and when it has something to give you, it schedules the callback function to be executed by inserting it into the event loop.

----

### Issues with callbacks

----

### Callback Hell

![callback hell](http://blog.mclain.ca/assets/images/callbackhell.png)

----

## Callback Hell (cont)

```javascript
A(function() {
  C();

  D(function() {
    F();
  });

  E();
});

B();
```
Normal Execution: A, B, C, D, E, F <!-- .element: class="fragment" -->

Immediate Callback Execution: A, C, D, E, B, F <!-- .element: class="fragment" -->


Notes:

What order do these functions execute

Now imagine that `A(..)` and `C(..)` are not async and they immediately invoke their callbacks. 

This difference in behavior is often referred to as releasing Zalgo.

Releasing Zalgo is, essentially, building a function which could be resolved asynchronously or synchronously, without the caller having any clear signal about which happened.

If you have an API which takes a callback,
and sometimes that callback is called immediately,
and other times that callback is called at some point in the future,
then you will render any code using this API impossible to reason about, and cause the release of Zalgo.
----

### Inversion of control

take part of your program and give over control of its execution to another third party

Notes:
* Call the callback too early
* Call the callback too late (or never)
* Call the callback too few or too many times
* Fail to pass along any necessary environment/parameters
* Swallow any errors/exceptions that may happen

---

## Promises

an object representing the eventual completion or failure of an asynchronous operation

Notes:

* A `Promise` is an object representing the eventual completion or failure of an asynchronous operation (from docs)
* A promise is an object to which you attach callbacks, instead of passing callbacks into a function.
* The underlying value that a promise represents may be ready now or later, but the promise normalizes the behavior to be the same regardless.

A Promise is in one of three states:

* _pending_: initial state, neither fulfilled nor rejected.
* _fulfilled_: meaning that the operation completed successfully.
* _rejected_: meaning that the operation failed.

----

### Callbacks to Promises

Callbacks:

```javascript
function successCallback(result) {
  console.log("It succeeded with " + result);
}

function failureCallback(error) {
  console.log("It failed with " + error);
}

doSomething(successCallback, failureCallback);
```

Promises: <!-- .element: class="fragment" data-fragment-index="1" -->

```javascript
const promise = doSomething(); 
promise.then(successCallback, failureCallback);
```
<!-- .element: class="fragment" data-fragment-index="1" -->

```javascript
doSomething().then(successCallback, failureCallback);
```
<!-- .element: class="fragment" -->

----

### Promise Guarantees

* Callbacks will never be called before the completion of the current run of the JavaScript event loop.
* Callbacks added with `.then` even after the success or failure of the asynchronous operation, will be called
* Multiple callbacks may be added by calling `.then` several times, to be executed independently in insertion order.

Notes:

* Unlike old-style passed-in callbacks, a promise comes with some guarantees:

* Callbacks will never be called before the completion of the current run of the JavaScript event loop.
  * Solves "called too early" issue with callbacks

* Callbacks added with `.then` even after the success or failure of the asynchronous operation, will be called
  * Solves the "never called" issue with callbacks


----

### Promise Chaining

```javascript
doSomething()
  .then(function(result) {
    return doSomethingElse(result);
  })
  .then(function(newResult) {
    return doThirdThing(newResult);
  })
  .then(function(finalResult) {
    console.log('Got the final result: ' + finalResult);
  })
  .catch(failureCallback);
```

Notes: 

* A common need is to execute two or more asynchronous operations back to back, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step.
* We accomplish this by creating a promise chain.
* The `then` function returns a new promise, different from the original
* The arguments to `then` are optional
* `catch(failureCallback)` is short for `then(null, failureCallback)`
* **Important:** Always return results, otherwise callbacks won't catch the result of a previous promise

----

### Returning Promises from Promises

```javascript
// don't need to do it this way
doSomething()
  .then(function(result) {
    return doSomethingElse(result)
      .then(function(newResult) {
        return doThirdThing(newResult)
          .then(function(finalResult) {
            console.log('Got the final result: ' + finalResult);
            return finalResult + 42;
          });
      });
  });
  .catch(failureCallback);
```

Notes:

* If a handler returns a value in the a `.then()` call it is automatically wrapped in a Promise when returned and then properly unwrapped to pass the value to further chained `.then()` calls.

----

### Promise Error Propagation

```javascript
doSomething()
  .then(function(result) {
    return doSomethingElse(result);
  })
  .then(function(newResult) {
    return doThirdThing(newResult);
  })
  .then(function(finalResult) {
    console.log('Got the final result: ' + finalResult);
  })
  .catch(failureCallback); 
  // ^ will catch any errors from original Promise
  //   or any of its handlers
```

Notes:

* A promise chain stops if there's an exception and looks down the chain for catch handlers
* You should use `.catch()` for handling errors, rather than `.then(null, fn)`.
* When chaining you can have a single `.catch()` at the end of the chain to handle any rejection or thrown exceptions from either the original promise or any of it's handlers.
* You can pass a secondary error handler function to `then` for more fine tuned exception handling

----

### Creating a Promise

```javascript
new Promise(function(resolve, reject) {
  // initiates some asynchronous work, then call

  // resolve(...) to indicate success or

  // reject(...) to indicate failure
});
```

Notes:

* Promise constructor take a function that is passed with the arguments `resolve` and `reject` (called executor). 
* The executor function is executed immediately by the Promise implementation, passing resolve and reject functions
* The executor is called before the Promise constructor even returns the created object).
* The resolve and reject functions, when called, resolve or reject the promise, respectively.
* The executor normally initiates some asynchronous work, and then, once that completes, either calls the resolve function to resolve the promise or else rejects it if an error occurred.
* If an error is thrown in the executor function, the promise is rejected.
* The return value of the executor is ignored.

* If the Promise creation code tries to call `resolve(..)` or `reject(..)` multiple times, or tries to call both, the Promise will only the first resolution, and will silently ignore any subsequent attempts.
* Promises can have, at most, one resolution value (fulfillment or rejection).
* If you want to pass along multiple values, you must wrap them in another single value that you pass, such as an array or an object.
* If you call `resolve(..)` or `reject(..)` with multiple parameters, all subsequent parameters beyond the first will be silently ignored.
* If you don't explicitly resolve (or reject) with a value, the value is `undefined`.

----

### `Promise.resolve()` and `Promise.reject()`

```javascript
new Promise(function (resolve, reject) {
  resolve(42);
});

// ...is the same as...

Promise.resolve(42);
```

Notes:

* shortcuts to manually create an already resolved or rejected promise respectively.
* If you pass an immediate, non-Promise, non-thenable value to `Promise.resolve(..)`, you get a promise that's fulfilled with that value.
* But if you pass a genuine Promise to `Promise.resolve(..)`, you just get the same promise back
* Even more importantly, if you pass a non-Promise thenable value to `Promise.resolve(..)`, it will attempt to unwrap that value, and the unwrapping will keep going until a concrete final non-Promise-like value is extracted.
* It's a good idea to wrap all non-genuine (thenable duck typing) Promises with `Promise.resolve` to protect from unintended behavior

----

### Promise.all(iterable)

```javascript
const promises = [getUser(1), getUser(2), getUser(3)];

Promise.all(promises).then((users) => {
  console.log('User 1', users[0]);
  console.log('User 2', users[1]);
  console.log('User 3', users[2]);
});
```

Notes:

* Returns a promise that either fulfills when all of the promises in the iterable argument have fulfilled or rejects as soon as one of the promises in the iterable argument rejects. 
* If the returned promise fulfills, it is fulfilled with an array of the values from the fulfilled promises in the same order as defined in the iterable.
* If the returned promise rejects, it is rejected with the reason from the first promise in the iterable that rejected.
* This method can be useful for aggregating results of multiple promises.

----

### Promise.race(iterable)

```javascript
function timeoutPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Promise timed out')
    }, delay);
  });
}

Promise.race([getUser(1), timeoutPromise(3000)])
  .then((user) => {
    console.log('User 1', user);
  }).catch((error) => {
    console.error(error);
  });
```

Notes:

Returns a promise that fulfills or rejects as soon as one of the promises in the iterable fulfills or rejects, with the value or reason from that promise.

----

### IE has NO support for native Promises

Have to use a third party library like [Bluebird](http://bluebirdjs.com/docs/getting-started.html)

![Shaking fist](/images/shakingfist.gif)

---

## Fetch API

Promise based API for fetching resources

```javascript
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}
```

<small>(also no IE support, there's a polyfill though)</small>

Notes:

* `response.json()` returns a Promise
---

## Async / Await

Notes:

* special syntax to work with promises in a more "synchronous" looking and easy to read way

----

### Async

```javascript
async function f() {
  return 1; // <- Javascript will wrap this to Promise.resolve(1)
}
```

Notes:

* The word `async` before a function means one simple thing: the function always returns a promise.
* If the code has `return <non-promise>` in it, then JavaScript automatically wraps it into a resolved promise with that value.

----

### Await

```javascript
// works only inside async functions
let value = await promise;
```

Notes:

* Does not uphold "run to completion" behavior
* Expression that pauses the execution of the async function and waits for the passed Promise's resolution
* Then resumes the async function's execution and returns the resolved value
* Works only inside `async` functions

----

### Async/Await Error Handling

```javascript
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

...is the same as...

```javascript
async function f() {
  throw new Error("Whoops!");
}
```

Notes:

* If a promise resolves normally, then await promise returns the result.
* In case of a rejection it throws the error, just if there were a throw statement at that line.

----

### Error Handling (cont)

```javascript
async function f() {
  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}
```

Notes:

* Awaited promise rejections can be caught just like any other exception

---

### Exercise

Refactor this code snippet to use `async/await`

```javascript
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json(); // returns a Promise
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```

----

### Solution

```javascript
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Notes:

1. The function `loadUrl` becomes `async`.
2. All `.then` inside are replaced with await.
3. We can return `response.json()` instead of awaiting for it, like this:
```javascript
if (response.status == 200) {
  return response.json();
}
```
Then the outer code would have to await for that promise to resolve. In our case it doesn’t matter.
4. The error thrown from loadJson is handled by .catch. We can’t use await loadJson(…) there, because we’re not in an async function.

---

### Another Exercise

```javascript
function foo() {
  doSomething()
    .then(function(result) {
      return doSomethingElse(result);
    })
    .then(function(newResult) {
      return doThirdThing(newResult);
    })
    .then(function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    })
    .catch(failureCallback);
}
```

----

### Solution

```javascript
async function foo() { // (1)
  try {
    const result = await doSomething(); // (2)
    const newResult = await doSomethingElse(result); // (3)
    const finalResult = await doThirdThing(newResult); // (4)
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error); // (5)
  }
}
```

---

## Resources

[You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) - Kyle Simpson

[Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) - MDN

[Async Await Essentials](https://hackernoon.com/async-await-essentials-for-production-loops-control-flows-limits-23eb40f171bd) - Schahriar SaffarShargh
 
[Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - MDN

[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - MDN

---

# Questions?

---
