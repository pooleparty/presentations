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

// By returning v * 2 (i.e., 42), we fulfill the p2 promise that the first then(..)
// call created and returned. When p2's then(..) call runs, it's receiving the
// fulfillment from the return v * 2 statement.
// p2.then(..) creates yet another promise, which we could have stored in a p3 variable.

// Without intermediate variables:
/*
var p = Promise.resolve( 21 );

p
.then( function(v){
	console.log( v );	// 21

	// fulfill the chained promise with value `42`
	return v * 2;
} )
// here's the chained promise
.then( function(v){
	console.log( v );	// 42
} );
*/
