var pp = require('..')

module.exports = {
  resolved: function (value) {
    var promise = pp()
    promise.resolve(value)
    return promise
  },

  rejected: function (reason) {
    var promise = pp()
    promise.reject(reason)
    return promise
  },

  deferred: function () {
    var promise = pp()

    return {
      promise: promise,
      resolve: promise.resolve.bind(promise),
      reject: promise.reject.bind(promise)
    }
  }
}
