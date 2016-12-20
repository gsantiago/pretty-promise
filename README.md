# pretty-promise

Small and lightweight implementation of [Promises A/+](https://promisesaplus.com).

```js
var pp = require('pretty-promise')

var promise = pp(function (resolve, reject) {
  someAsyncFunction(function (err, result) {
    if (err) return reject(err)
    resolve(result)
  })
})

promise
.then(function onFulfilled (value) {
  console.log(value)
}, function onRejected (reason) {
  console.log(reason)
})
```

## installation

`npm install pretty-promise --save`

## tests

Pretty Promise uses the [Promises A/+ Compliance Tests](https://github.com/promises-aplus/promises-tests).

Before you run the tests, you need to install all devDependencies:

`npm install`

Then, just run:

`npm test`

## api

You can create promises with a `resolver` function:

```js
function myAsyncFunc () {
  return pp(function (resolve, reject) {
    // ...

    if (!err) {
      resolve(value)
    } else {
      reject(err)
    }
  })
}
```

Or you can use a Defer-like syntax:

```js
function myAsyncFunc () {
  var promise = pp()

  // ...

  if (!err) {
    promise.resolve(value)
  } else {
    promise.reject(err)
  }

  return promise
}
```

## todo

- [x] Implements [Promises A/+ spec](https://promisesaplus.com).
- [ ] Implements `catch(onRejected)` alias.
- [ ] Implements `tp.when()` static method.

## license

MIT
