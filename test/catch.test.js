const test = require('ava')
const pp = require('..')

test(t => {
  t.plan(1)
  const promise = pp().reject('reason')

  return promise.catch(function (reason) {
    t.is(reason, 'reason')
  })
})
