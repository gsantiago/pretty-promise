const test = require('ava')
const pp = require('..')

test('forEach iterator', t => {
  t.plan(6)

  const dummy = ['a', 'b', 'c', 'd', 'e']

  const promise = pp(function (resolve) {
    setTimeout(function () {
      resolve(dummy)
    })
  })

  return promise
  .forEach(function (item, index) {
    t.is(item, dummy[index])
  })
  .then(function (values) {
    t.deepEqual(values, dummy)
  })
})

test('forEach iterator with a promise from another library', t => {
  t.plan(6)

  const dummy = ['a', 'b', 'c', 'd', 'e']

  const promise = new Promise(function (resolve) {
    setTimeout(function () {
      resolve(dummy)
    })
  })

  return pp(promise)
  .forEach(function (item, index) {
    t.is(item, dummy[index])
  })
  .then(function (values) {
    t.deepEqual(values, dummy)
  })
})
