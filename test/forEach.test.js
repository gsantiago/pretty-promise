var test = require('ava')
var pp = require('..')

test(function (t) {
  t.plan(6)

  var dummy = ['a', 'b', 'c', 'd', 'e']

  var promise = pp(function (resolve) {
    setTimeout(function () {
      promise.resolve(dummy)
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
