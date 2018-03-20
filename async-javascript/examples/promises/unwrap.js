function unwrap1() {
  const p = Promise.resolve(21);

  const p2 = Promise.resolve(p);

  const p3 = Promise.resolve(p2);

  p3.then((value) => {
    console.log(value); // 21
  });
}

function unwrap2() {
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
}

// Even though we wrapped 42 up in a promise that we returned,
// it still got unwrapped and ended up as the resolution of the
// chained promise, such that the second then(..) still received 42.
//
// If we introduce asynchrony to that wrapping promise, everything
// still nicely works the same:

function unwrap3() {
  const p = Promise.resolve(21);

  p
    .then((v) => {
      console.log(v); // 21

      // create a promise to return
      return new Promise((resolve, reject) => {
        // introduce asynchrony!
        setTimeout(() => {
          // fulfill with value `42`
          resolve(v * 2);
        }, 100);
      });
    })
    .then((v) => {
      // runs after the 100ms delay in the previous step
      console.log(v); // 42
    });
}
