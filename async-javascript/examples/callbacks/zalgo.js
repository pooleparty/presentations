function ajaxSync(url, callback) {
  // Immediately invoke callback
  callback();
}

var a = 0;

function resultA(data) {
  console.log('A', a);
}

ajaxSync("..pre-cached-url..", resultA);
a++;

// ================================================

function ajaxAsync(url, callback) {
  // Asynchronous invocation callback
  setTimeout(callback, 1000);
}

var b = 0;

function resultB(data) {
  console.log('B', b);
}

ajaxAsync("..non-cached-url..", resultB);
b++;
