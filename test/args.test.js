var test = require('ava')
var pp = require('..')

test(function (t) {
  var myArguments = pp.args('a', 'b', {c: 'c'})
  t.deepEqual(myArguments.args, ['a', 'b', {c: 'c'}])
})
