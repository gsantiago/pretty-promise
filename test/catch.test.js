var test = require('ava')
var pp = require('..')

test(function (t) {
  t.plan(1)
  var promise = pp().reject('reason')

  return promise.catch(function (reason) {
    t.is(reason, 'reason')
  })
})
