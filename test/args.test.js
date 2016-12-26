var test = require('ava')
var pp = require('..')

test(function (t) {
  var myArguments = pp.args('a', 'b', {c: 'c'})
  t.deepEqual(myArguments.args, ['a', 'b', {c: 'c'}])
})

test('then args', function (t) {
  t.plan(3)

  var promise = pp().resolve(pp.args('a', 'b', 'c'))

  return promise.then(function (a, b, c) {
    t.is(a, 'a')
    t.is(b, 'b')
    t.is(c, 'c')
  })
})

test('then args chaining', function (t) {
  t.plan(3)

  var promise = pp().resolve()

  promise = promise.then(function () {
    return pp.args(1, 2, 3)
  })

  return promise.then(function (value1, value2, value3) {
    t.is(value1, 1)
    t.is(value2, 2)
    t.is(value3, 3)
  })
})
