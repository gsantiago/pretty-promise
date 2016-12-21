var test = require('ava')
var pp = require('..')

test(function (t) {
  t.plan(1)

  var promise = pp.when(['a', 'b', 'c'])

  return promise.then(function (values) {
    t.deepEqual(values, ['a', 'b', 'c'])
  })
})
