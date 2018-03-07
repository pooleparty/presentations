function request(url) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 500);
  });
}

// What if something went wrong in one of the steps of the Promise chain?
// An error/exception is on a per-Promise basis, which means it's possible
// to catch such an error at any point in the chain, and that catching acts
// to sort of "reset" the chain back to normal operation at that point:

// step 1:
request("http://some.url.1/")
  // step 2:
  .then(function(response1) {
    foo.bar(); // undefined, error!

    // never gets here
    return request("http://some.url.2/?v=" + response1);
  })

  // step 3:
  .then(
    function fulfilled(response2) {
      // never gets here
    },
    // rejection handler to catch the error
    function rejected(err) {
      console.log(err); // `TypeError` from `foo.bar()` error
      return 42;
    }
  )

  // step 4:
  .then(function(msg) {
    console.log(msg); // 42
  });

// When the error occurs in step 2, the rejection handler in step 3 catches it.
// The return value (42 in this snippet), if any, from that rejection handler
// fulfills the promise for the next step (4), such that the chain is now back
// in a fulfillment state.

function implicitRejectionHandler() {
  // If you call then(..) on a promise, and you only pass a fulfillment handler to it,
  //an assumed rejection handler is substituted:

  var p = new Promise(function(resolve, reject) {
    reject("Oops");
  });

  var p2 = p.then(
    function fulfilled() {
      // never gets here
    }
    // assumed rejection handler, if omitted or
    // any other non-function value passed
    // function(err) {
    //     throw err;
    // }
  );
}

function implicitResolutionHandler() {
  // If a proper valid function is not passed as the fulfillment handler
  // parameter to then(..), there's also a default handler substituted:

  var p = Promise.resolve(42);

  p.then(
    // assumed fulfillment handler, if omitted or
    // any other non-function value passed
    // function(v) {
    //     return v;
    // }
    null,
    function rejected(err) {
      // never gets here
    }
  );
}
