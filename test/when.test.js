const test = require('ava')
const pp = require('..')

test('only strings', t => {
  t.plan(1)

  const promise = pp.when(['a', 'b', 'c'])

  return promise.then(function (values) {
    t.deepEqual(values, ['a', 'b', 'c'])
  })
})

test('only promises', t => {
  t.plan(1)

  const promise1 = pp()
  const promise2 = pp()
  const promise3 = pp()

  promise1.resolve('dummy1')
  promise2.resolve('dummy2')
  promise3.resolve('dummy3')

  return pp.when([promise1, promise2, promise3]).then(function (values) {
    t.deepEqual(values, ['dummy1', 'dummy2', 'dummy3'])
  })
})

test('mixed arguments', t => {
  t.plan(1)

  const promise1 = pp().resolve('dummy1')
  const promise2 = pp()
  const promise3 = pp().resolve('dummy3')

  setTimeout(function () {
    promise2.resolve('dummy2')
  }, 300)

  const args = ['a', promise1, 'b', promise2, 'c', promise3]

  return pp.when(args).then(function (values) {
    t.deepEqual(values, ['a', 'dummy1', 'b', 'dummy2', 'c', 'dummy3'])
  })
})

test('single object', t => {
  t.plan(1)

  return pp.when({dummy: 'dummy'}).then(function (values) {
    t.deepEqual(values, [{dummy: 'dummy'}])
  })
})

test('single promise', t => {
  t.plan(1)

  const promise = pp()

  setTimeout(function () {
    promise.resolve('dummy')
  }, 150)

  return pp.when(promise).then(function (values) {
    t.deepEqual(values, ['dummy'])
  })
})

test('rejected promise', t => {
  t.plan(1)

  const promise1 = pp().resolve('dummy1')
  const promise2 = pp().reject('reason')

  return pp.when([promise1, 'a', promise2, 'b']).catch(function (reason) {
    t.is(reason, 'reason')
  })
})

test('mixed objects with a eventually-rejected promise', t => {
  t.plan(1)

  const promise1 = pp()
  const promise2 = pp().resolve('dummy2')
  const promise3 = pp()

  setTimeout(function () {
    promise1.resolve('dummy1')
  }, 300)

  setTimeout(function () {
    promise3.reject('reason1')
  })

  const args = ['a', promise1, {b: 'b'}, promise2, ['c'], promise3]

  return pp.when(['a', promise1, promise2, promise3]).catch(function (reason) {
    t.is(reason, 'reason1')
  })
})
