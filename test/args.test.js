const test = require('ava')
const pp = require('..')

test(t => {
  const myArguments = pp.args('a', 'b', {c: 'c'})
  t.deepEqual(myArguments.args, ['a', 'b', {c: 'c'}])
})

test('then args', t => {
  t.plan(3)

  const promise = pp().resolve(pp.args('a', 'b', 'c'))

  return promise.then(function (a, b, c) {
    t.is(a, 'a')
    t.is(b, 'b')
    t.is(c, 'c')
  })
})

test('then args chaining', t => {
  t.plan(3)

  const promise = pp().resolve()

  const promise2 = promise.then(function () {
    return pp.args(1, 2, 3)
  })

  return promise2.then(function (value1, value2, value3) {
    t.is(value1, 1)
    t.is(value2, 2)
    t.is(value3, 3)
  })
})
