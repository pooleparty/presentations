function ajaxSync(url, callback) {
  // Immediately invoke callback
  callback();
}

let a = 0;

function resultA(data) {
  console.log('A', a);
}

ajaxSync('..pre-cached-url..', resultA);
a += 1;

// ================================================

function ajaxAsync(url, callback) {
  // Asynchronous invocation callback
  setTimeout(callback, 1000);
}

let b = 0;

function resultB(data) {
  console.log('B', b);
}

ajaxAsync('..non-cached-url..', resultB);
b += 1;
