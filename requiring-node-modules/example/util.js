console.log('util.js', module);


// Show async update of exports
setTimeout(() => {
  // module.exports = 'Updated Hello world';
  exports.message = 'Updated Hello world';
  exports.number = 12345;
}, 0);

exports.message = 'Hello, world';
// module.exports = 'Hello, world';
