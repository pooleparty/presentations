# Asynchrony: Now & Later

Assume people have heard that javascript is single threaded, they have heard about the event loop (but not necessarily know what it is).
Relate single threadedness and event loop

Bank on 40 minutes
Focus on
- relating event loop to single threading
- using promises as an API to a function
- Promise tricks (wrap things in Promise.resolve), Promise.race, Promise.all)
- Promise unwrapping
- returning promises from promises
- Error handling
- fetch Promise based API - part of the DOM spec
- async/await (if there is time)
- marking a function as async makes it automatically return a Promise


O'reily - building progressive web apps:
web/service workers
cache API
manifest file
indexDB

[Link to book chapter 1][1]

## Programming in Chunks: Now & Later

- Later does not happen strictly and immediately after now
- Async behavior is non blocking in JS
- Callbacks are a simple way of waiting for async behavior to finish

## Event Loop

- Javascript is single threaded
- Executes single chunk of code at a time
- JS engine has had no sense of time, but is instead an on-demand execution environment
- Event loop is a mechanism that handles executing multiple chunks of a program over time
- surrounding environment that has always scheduled "events" (JS code executions)
- When a program makes an async request to fetch some data from a server, it sets up the "response" code in a callback function, and the JS engine tells the hosting environment it's running in, "Hey, I'm going to suspend execution for now, but whenever you finish with that network request, and you have some data, please call this function back."
- The hosting environment is then set up to listen for the response from the network, and when it has something to give you, it schedules the callback function to be executed by inserting it into the event loop.

## Parallel vs Async

- Async is about the gap between now and later
- Parallel is about things being able to occur simultaneously
- Event loop breaks its work into tasks and executes them in serial, disallowing parallel access and changes to shared memory

## Parallel Threading

- Threaded programming is tricky, because if you don't take special steps to prevent interruption/interleaving between individual thread operations from happening, there can be surprising, nondeterministic behavior.
- JavaScript never shares data across threads, which means that level of nondeterminism isn't a concern.
- That doesn't mean JS is always deterministic.
- The order of function execution can produce different result.

## Run to Completion

- Code inside of a function is atomic, which means that once it starts running, the entirety of the function's code will finish before any of the code in another function can run

## Concurrency

- Concurrency is when two or more "processes" or tasks are executing simultaneously over the same period, regardless of whether their individual operations happen in parallel (at the same instant on separate processors or cores) or not. 
- You can think of concurrency then as "process"-level (or task-level) parallelism, as opposed to operation-level parallelism (separate-processor threads).
- If two or more concurrent tasks within a program are unrelated and don't interact, nondeterminism is perfectly acceptable.
- When two or more concurrent tasks interact, we need to coordinate these interactions to prevent race conditions.

## Jobs - move this to the Promises section

- As of ES6, there's a new concept layered on top of the event loop queue, called the "Job queue."
- (Mechanism without an exposed API)?
- [Ecmascript Job spec][2]
- Queue hanging off the end of every tick in the event loop queue
- "Oh, here's this other thing I need to do later, but make sure it happens right away before anything else can happen."
- The event loop queue is like an amusement park ride, where once you finish the ride, you have to go to the back of the line to ride again. But the Job queue is like finishing the ride, but then cutting in line and getting right back on.

## [Part 2 - Callbacks][3]

[1]:https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch1.md
[2]:http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues
[3]:./2_callbacks.md
