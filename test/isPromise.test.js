var test = require('ava')
var pp = require('..')

test('should return true', function (t) {
  var promise = pp()

  t.truthy(pp.isPromise(promise))
  t.truthy(pp.isPromise({then: function () {}}))
})

test('should return false', function (t) {
  t.not(pp.isPromise({}))
  t.not(pp.isPromise({then: null}))
  t.not(pp.isPromise({then: 'string'}))
  t.not(pp.isPromise(function () {}))
})
