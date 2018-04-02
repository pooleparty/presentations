function fetchX(cb) {
  cb(1);
}

function fetchY(cb) {
  setTimeout(() => {
    cb(2);
  }, 1000);
}

function add(getX, getY, cb) {
  let x;
  let y;
  getX((xVal) => {
    x = xVal;
    // both are ready?
    if (y !== undefined) {
      cb(x + y); // send along sum
    }
  });
  getY((yVal) => {
    y = yVal;
    // both are ready?
    if (x !== undefined) {
      cb(x + y); // send along sum
    }
  });
}

// `fetchX()` and `fetchY()` are sync or async
// functions
add(fetchX, fetchY, (sum) => {
  console.log('Add with callbacks');
  console.log(sum);
});

// ==================================================================

function fetchXPromise() {
  return Promise.resolve(2);
}

function fetchYPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

function addPromise(xPromise, yPromise) {
  // `Promise.all([ .. ])` takes an array of promises,
  // and returns a new promise that waits on them
  // all to finish
  return (
    Promise.all([xPromise, yPromise])

      // when that promise is resolved, let's take the
      // received `X` and `Y` values and add them together.
      .then(values =>
      // `values` is an array of the messages from the
      // previously resolved promises
        values[0] + values[1])
  );
}

// `fetchX()` and `fetchY()` return promises for
// their respective values, which may be ready
// *now* or *later*.
addPromise(fetchXPromise(), fetchYPromise())
  // we get a promise back for the sum of those
  // two numbers.
  // now we chain-call `then(..)` to wait for the
  // resolution of that returned promise.
  .then((sum) => {
    console.log('Add with promises');
    console.log(sum); // that was easier!
  });
