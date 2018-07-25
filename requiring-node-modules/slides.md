# Requiring Node Modules

---

## Two core modules

`require` - the command

`module` - the organizer

Notes:

Node uses two core modules for managing module dependencies:

The `require` module, which appears to be available on the global scope — no need to `require('require')`.

The `module` module, which also appears to be available on the global scope — no need to `require('module')`.

You can think of the require module as the command and the module module as the organizer of all required modules.

---

## How

```js
const config = require('/path/to/file');
```

Notes:

The main object exported by the require module is a function (as used in the above example).

When Node invokes that `require()` function with a local file path as the function’s only argument, Node goes through a sequence of five steps.

---

## Fives Stages

- Resolving
- Loading
- Wrapping
- Evaluating
- Caching

Notes:

- Resolving: To find the absolute path of the file.
- Loading: To determine the type of the file content.
- Wrapping: To give the file its private scope. This is what makes both the require and module objects local to every file we require.
- Evaluating: This is what the VM eventually does with the loaded code.
- Caching: So that when we require this file again, we don’t go over all the steps another time.

---

## Resolving

### Find the absolute path of the file

---

## Loading

### Determine the type of the file content

---

## Wrapping

### Give the file its private scope

---

## Evaluating

### What the VM does with the loaded code

---

## Caching

### Don't do all this multiple time for the same file

---

## What about `import`?
