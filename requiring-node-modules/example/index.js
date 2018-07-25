exports.a = 1;

const util = require("./util");
console.log("Util:", util);

setTimeout(() => {
  // Show module caching
  console.log('Original util:', util);
  const cachedUtil = require("./util");
  console.log("Cached util:", cachedUtil);
}, 0);

// Show circular dependency and partial exports
require('./circularDependency');

exports.b = 2;
exports.c = 3;
