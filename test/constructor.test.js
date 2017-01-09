const test = require('ava')
const pp = require('..')
const isFunction = require('is-function')

test('should accept a resolver function that resolves the promise', t => {
  t.plan(3)

  const promise = pp(function (resolve, reject) {
    t.truthy(isFunction(resolve))
    t.truthy(isFunction(reject))

    resolve('resolved value')
  })

  return promise.then(function (value) {
    t.is(value, 'resolved value')
  })
})

test('should accept a resolver function that rejects the promise', t => {
  t.plan(3)

  const promise = pp(function (resolve, reject) {
    t.truthy(isFunction(resolve))
    t.truthy(isFunction(reject))

    setTimeout(function () {
      reject('rejected reason')
    }, 200)
  })

  return promise.catch(function (reason) {
    t.is(reason, 'rejected reason')
  })
})

test('should accept another promise as argument', function (t) {
  t.plan(2)

  const somePromise = pp().resolve('resolved value')
  const newPromise = pp(somePromise)

  t.truthy(newPromise instanceof pp)

  return newPromise.then(function (value) {
    t.is(value, 'resolved value')
  })
})

test('should accept a promise from a different library A/+ compliant', t => {
  t.plan(2)

  const somePromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('resolved value')
    }, 300)
  })

  const newPromise = pp(somePromise)

  t.truthy(newPromise instanceof pp)

  return newPromise.then(function (value) {
    t.is(value, 'resolved value')
  })
})
