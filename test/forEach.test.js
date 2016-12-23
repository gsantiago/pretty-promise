var test = require('ava')
var pp = require('..')

test('forEach iterator', function (t) {
  t.plan(6)

  var dummy = ['a', 'b', 'c', 'd', 'e']

  var promise = pp(function (resolve) {
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

test('forEach iterator with a promise from another library', function (t) {
  t.plan(6)

  var dummy = ['a', 'b', 'c', 'd', 'e']

  var promise = new Promise(function (resolve) {
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
