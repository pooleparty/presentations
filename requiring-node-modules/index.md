# Requiring Node Modules

---

## Two core modules

`require` - the command

`module` - the organizer

<notes>
- Node uses two core modules for managing module dependencies:
- The `require` module, which appears to be available on the global scope — no need to `require('require')`.
- The `module` module, which also appears to be available on the global scope — no need to `require('module')`.
- You can think of the require module as the command and the module module as the organizer of all required modules.
</notes>

---

## How

```js
const config = require("/path/to/file");
```

<notes>
- The main object exported by the require module is a function (as used in the above example).
- When Node invokes that `require()` function with a local file path or internal module name as the function’s only argument, Node goes through a sequence of five steps.
</notes>

---

## Fives Stages

- Resolving
- Loading
- Wrapping
- Evaluating
- Caching

<notes>
- Resolving: To find the absolute path of the file.
- Loading: To determine the type of the file content.
- Wrapping: To give the file its private scope. This is what makes both the require and module objects local to every file we require.
- Evaluating: This is what the VM eventually does with the loaded code.
- Caching: So that when we require this file again, we don’t go over all the steps another time.
</notes>

---

## Resolving

`module` object

<notes>
- Every required file becomes a module instance.
- Module objects contain information and properties about where the module is located and what the module exposes (exports).
- Every module object gets an `id` property to identify it. This `id` is usually the full path to the file.
- Node modules have a one-to-one relation with files on the file-system.
- We require a module by loading the content of a file into memory.
</notes>

---

## `module.paths`

```shell
> module.paths
[ '/Users/joshua/non-work-dev/presentations/requiring-node-modules/repl/node_modules',
  '/Users/joshua/non-work-dev/presentations/requiring-node-modules/node_modules',
  '/Users/joshua/non-work-dev/presentations/node_modules',
  '/Users/joshua/non-work-dev/node_modules',
  '/Users/joshua/node_modules',
  '/Users/node_modules',
  '/node_modules',
  '/Users/joshua/.node_modules',
  '/Users/joshua/.node_libraries',
  '/Users/joshua/.nvm/versions/node/v8.11.1/lib/node' ]
```

<notes>
- When we require a 'find-me' module, without specifying a path: Node will look for `find-me.js` in all the paths specified by `module.paths`  in order.
- The paths list is basically a list of node_modules directories under every directory from the current directory to the root directory.
- It also includes a few legacy directories whose use is not recommended.
- If Node can’t find `find-me.js` in any of these paths, it will throw a “cannot find module error.”
- Node will load the first instance of the file name that it finds when checking `module.paths`.
</notes>

---

You can also require a folder by placing an `index.js` file in the folder.

<notes>
- require('find-me') will load the index.js file in the folder
- You can change the name of the file that Node tries to load by default when requiring a folder by changing the `main` property in `package.json`
</notes>

---

## `require.resolve`

resolve a module, don't execute it.

<notes>
- Used to only resolve a module, not execute it.
- Behaves the same as the main require function, but does not load the file.
- It will still throw an error if the file does not exist.
- Will return the full path to the file when found.
- Can be useful for checking whether optional packages are install.
</notes>

---

## Relative and absolute paths

```js
const relativeModule = require('../../relativeModule');
const absoluteModule = require('/absoluteModule');
```

<notes>
- Besides resolving modules from within the node_modules directories, we can also place the module anywhere we want and require it with either relative paths (./ and ../) or with absolute paths starting with /.
- Node will attempt to resolve relative paths from the current file requiring the module.
</notes>

---

## Parent-child relation between files

```js
// index.js
require('./util')

// util.js
console.log(module.parent);

/*
 Module {
  id: '.',
    ...
    filename: '/Users/.../index.js',
    ...
  }
*/
```

<notes>
- Requiring module is set as `module.parent` in required module.
- Node allows circular module dependencies.
</notes>

---

## `exports`

```js
// Add property to exports object
exports.id = 'index';

/*
Module {
  id: '.',
  exports: { id: 'index' },
  loaded: false,
  ... }
*/

// Replace entire exports object
module.exports = function() {};
```

<notes>
- In any module, exports is a special object.
- You can put as many attributes as you want on that exports object, and you can actually change the whole object to be something else.
- Note how we did not do `exports = function() {}` to make the exports object into a function. We can’t actually do that because the exports variable inside each module is just a reference to module.exports which manages the exported properties. When we reassign the exports variable, that reference is lost and we would be introducing a new variable instead of changing the module.exports object.
- The module.exports object in every module is what the require function returns when we require that module.
</notes>

---

## Circular module dependency

```js
// lib/module1.js
exports.a = 1;
require('./module2');
exports.b = 2;
exports.c = 3;

// lib/module2.js
const Module1 = require('./module1');
console.log('Module1 is partially loaded here', Module1);
```

```shell
$ node lib/module1.js
Module1 is partially loaded here { a: 1 }
```

<notes>
- During the loading of a module, it builds the exports object.
- You can require the module before it’s done loading and you’ll just get a partial exports object with whatever was defined so far.
</notes>

---

## Loading

`module.loaded`

<notes>
- Every module object has a `loaded` attribute.
- This attribute is used to track which modules have been loaded (true value) and which modules are still being loaded (false value). This attribute also ensures that no module is loaded (executed) more than once.
- Requiring CommonJS modules (module.exports and require) is synchronous.
- We --cannot-- CAN change the exports object asynchronously. Since the module cache stores a reference to the module object passed to each file when its loaded, we can technically alter exports or module.exports after the module has been loaded.
</notes>

---

## Dynamic Import

```js
import fs from 'fs';
import path from 'path';
// ...
const util = await import('./util');
// ...
```

<notes>
- ES6/ES2015 added the proposal for a single, native module standard.
- ES6 modules are pre-parsed in order to resolve further imports before code is executed.
- CommonJS modules load dependencies on demand while executing the code.
- The rationale behind is that, specially on the Web, you might want to import modules on demand, as opposite to requiring mandatory tooling to bundle all your scripts upfront.
- Code splitting can be achieved using dynamic imports and webpack plugins.
</notes>
---

## Wrapping

```shell
~ $ node
> require('module').wrapper
[ '(function (exports, require, module, __filename, __dirname) { ',
  '\n});' ]
>
```

<notes>
- Before compiling a module, Node wraps the module code in a function, `module.wrapper`.
- This gives each module its own scope.
- `exports` is defined as a reference to `module.exports`
- `require` and `module` are both specific to the function to be executed.
- `__filename` and `__dirname` contain the wrapped module's absolute filename and directory path respectively.
- Can access all of these variables using the `arguments` keyword.
</notes>

---

## Evaluating

Node does not execute any code written in a file directly, it executes the wrapper function which has code inside it.

---

## Caching

Node caches `module` objects and does not load files on subsequent require calls for a module.

---

## References

- [Requiring modules in NodeJS](https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8)
- [Understanding ES6 Modules](https://www.sitepoint.com/understanding-es6-modules/)
- [Dynamic import() & export](https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4)
