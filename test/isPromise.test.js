const test = require('ava')
const pp = require('..')

test('should return true', t => {
  const promise = pp()

  t.truthy(pp.isPromise(promise))
  t.truthy(pp.isPromise({then: function () {}}))
})

test('should return false', t => {
  t.not(pp.isPromise({}))
  t.not(pp.isPromise({then: null}))
  t.not(pp.isPromise({then: 'string'}))
  t.not(pp.isPromise(function () {}))
})
