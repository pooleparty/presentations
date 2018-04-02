// BASIC PROMISE CHAINING

(function basicChaining() {
  const p = Promise.resolve(21);

  const p2 = p.then((v) => {
    console.log(v); // 21

    // fulfill `p2` with value `42`
    return v * 2;
  });

  // chain off `p2`
  p2.then((v) => {
    console.log(v); // 42
  });
}());

// By returning v * 2 (i.e., 42), we fulfill the p2 promise that the
// first then(..) call created and returned.
// When p2's then(..) call runs, it's receiving the fulfillment from the return v * 2 statement.
// Of course, p2.then(..) creates yet another promise, which we could have stored in a p3 variable.

// But it's a little annoying to have to create an intermediate variable p2 (or p3, etc.).
// Thankfully, we can easily just chain these together:

// PROMISING CHAINING - NO INTERMEDIATE VARS

(function basicChaining2() {
  const p = Promise.resolve(21);

  p
    .then((v) => {
      console.log(v); // 21

      // fulfill the chained promise with value `42`
      return v * 2;
    })
    // here's the chained promise
    .then((v) => {
      console.log(v); // 42
    });
}());

// PROMISE CHAINING - UNWRAPPING

(function promiseUnwrapping() {
  const p = Promise.resolve(21);

  p
    .then((v) => {
      console.log(v); // 21

      // create a promise and return it
      return new Promise((resolve, reject) => {
        // fulfill with value `42`
        resolve(v * 2);
      });
    })
    .then((v) => {
      console.log(v); // 42
    });
}());

// PROMISE CHAINING - ASYNC UNWRAPPING

(function asyncUnwrapping() {
  const p = Promise.resolve(21);

  p
    .then((v) => {
      console.log(v); // 21

      // create a promise to return
      return new Promise(((resolve, reject) => {
        // introduce asynchrony!
        setTimeout(() => {
          // fulfill with value `42`
          resolve(v * 2);
        }, 100);
      }));
    })
    .then((v) => {
      // runs after the 100ms delay in the previous step
      console.log(v); // 42
    });
}());

// Of course, the value passing from step to step in these examples is optional.
// If you don't return an explicit value, an implicit undefined is assumed,
// and the promises still chain together the same way.
// Each Promise resolution is thus just a signal to proceed to the next step.

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

console.log('step 1');

delay(1000)
  .then(() => {
    console.log('step 2 (after 1000ms)');
    return delay(2000);
  })
  .then(() => {
    console.log('step 3 (after another 2000ms)');
  })
  .then(() => {
    console.log('step 4 (next Job)');
    return delay(3000);
  })
  .then(() => {
    console.log('step 5 (after another 3000ms)');
  });
