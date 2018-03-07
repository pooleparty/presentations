function fetchX(cb) {
  cb(1);
}

function fetchY(cb) {
  setTimeout(function() {
    cb(2);
  }, 1000);
}

function add(getX, getY, cb) {
  var x, y;
  getX(function(xVal) {
    x = xVal;
    // both are ready?
    if (y != undefined) {
      cb(x + y); // send along sum
    }
  });
  getY(function(yVal) {
    y = yVal;
    // both are ready?
    if (x != undefined) {
      cb(x + y); // send along sum
    }
  });
}

// `fetchX()` and `fetchY()` are sync or async
// functions
add(fetchX, fetchY, function(sum) {
  console.log("Add with callbacks");
  console.log(sum);
});

// ==================================================================

function fetchXPromise() {
  return Promise.resolve(2);
}

function fetchYPromise() {
  return new Promise(function(resolve) {
    setTimeout(function() {
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
      .then(function(values) {
        // `values` is an array of the messages from the
        // previously resolved promises
        return values[0] + values[1];
      })
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
  .then(function(sum) {
    console.log("Add with promises");
    console.log(sum); // that was easier!
  });
