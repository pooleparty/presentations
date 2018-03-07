# Callbacks

[Link to book chapter 2][1]

Callbacks are functions that serve as the target for the event loop to "call back into" the program, whenever that item in the queue is processed.

[Simple Callback Example][2] - Ask someone to describe the way the program behaves

Multitasking is a lie, its just really fast context switching

Our brains plan things out in sequential, blocking, single-threaded semantic ways, but callbacks express asynchronous flow in a rather nonlinear, nonsequential way, which makes reasoning properly about such code much harder

>"I need to go to the store, but on the way I'm sure I'll get a phone call, so 'Hi, Mom', and while she starts talking, I'll be looking up the store address on GPS, but that'll take a second to load, so I'll turn down the radio so I can hear Mom better, then I'll realize I forgot to put on a jacket and it's cold outside, but no matter, keep driving and talking to Mom, and then the seatbelt ding reminds me to buckle up, so 'Yes, Mom, I am wearing my seatbelt, I always do!'. Ah, finally the GPS got the directions, now..."

## Callback Hell

```javascript
doA( function(){
	doB();

	doC( function(){
		doD();
	} )

	doE();
} );

doF();
```

What order do these functions execute

Answer:
- `doA()`
- `doF()`
- `doB()`
- `doC()`
- `doE()`
- `doD()`

Now imagine that `doA(..)` and `doC(..)` are not async and they immediately invoke their callbacks (Zalgo)

Now the order is:
- `doA()`
- `doB()`
- `doC()`
- `doD()`
- `doE()`
- `doF()`

To have steps that happen in succession, callbacks push us to hardcode steps together, i.e. hardcode step 2 into step 1 and step 3 into step 2, etc.

Hard coding is not necessarily a bad thing if its a fixed condition that step 1 should always lead to step 2 and step 2 should always lead to step 3.

Hardcoding makes the code much more brittle and does not account for anything going wrong that might trigger a deviation in the progression of steps, for example skipping step 3 if step 2 fails or retrying step 1 if it fails.

We can manually code for all of these alternate flows, but with ever logic branch, the code becomes more difficult to reason about and maintain/update.

## Trust Issues

```javascript
// A
ajax( "..", function(..){
  // C
} );
// B
```
Assume that `ajax` is some third party utility that you did not write and do not directly control.

Inversion of control is when you take part of your program and give over control of its execution to another third party

Inversion of control can lead to any number of issues with callbacks:
- Call the callback too early
- Call the callback too late (or never)
- Call the callback too few or too many times
- Fail to pass along any necessary environment/parameters to your callback
- Swallow any errors/exceptions that may happen

Imagine the complexity if we had to include logic to handle all of these cases in every callback in our program.

## Trying to Save Callbacks

There are a few patterns that some APIs use to attempt to solve some of the issues with callbacks.

- Include callbacks for both success and error cases (ES6 Promises)
- Error first style callbacks where, if an error occurs, it is passed as the first parameter to the callback ("Node style")

However, these solutions don't address the majority of trust issues we discussed earlier

## Zalgo

[Zalgo Example][3]

Any nondeterminism around the sync-or-async behavior of a callback function invocation is almost always going to lead to very difficult to track down bugs. The fictional insanity-inducing monster named Zalgo is used to describe the sync/async nightmares

[Don't release Zalgo][4]

## [Part 3 - Promises][5]

[1]:https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md
[2]:./examples/callbacks/simple.js
[3]:./examples/callbacks/zalgo.js
[4]:https://oren.github.io/blog/zalgo.html
[5]:./3_promises.js
