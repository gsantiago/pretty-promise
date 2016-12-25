'use strict'

/**
 * Module dependencies.
 */

var isFunction = require('is-function')
var isObject = require('is-object')
var toArray = require('to-array')
var Args = require('./lib/Args')

/**
 * Exposes `PrettyPromise`.
 */

module.exports = PrettyPromise

/**
 * Promise States.
 */

var PENDING = 'PENDING'
var FULFILLED = 'FULFILLED'
var REJECTED = 'REJECTED'

/**
 * PrettyPromise Constructor.
 * @constructor
 * @param {Function} resolver
 */

function PrettyPromise (resolver) {
  if (!(this instanceof PrettyPromise)) return new PrettyPromise(resolver)

  if (resolver instanceof PrettyPromise) return resolver

  if (pp.isPromise(resolver)) {
    return pp(function (resolve, reject) {
      resolver.then(resolve, reject)
    })
  }

  // this.value = undefined
  // this.reason = undefined

  this.handlers = {
    onFulfilled: [],
    onRejected: []
  }

  this.state = PENDING

  if (isFunction(resolver)) {
    resolver(this.resolve.bind(this), this.reject.bind(this))
  }
}

/**
 * Alias for `PrettyPromise`.
 */

var pp = PrettyPromise

/**
 * Alias for the prototype.
 */

var fn = PrettyPromise.prototype

/**
 * Set the current Promises's state.
 * @method
 * @private
 * @param {String} newState
 */

fn._setState = function _setState (newState) {
  this.state = newState
}

/**
 * Runs a function asynchronously and keeps the context (`this`).
 * @method
 * @private
 * @param {Function} fn
 */

fn._runAsync = function _runAsync (fn) {
  process.nextTick(fn.bind(this))
}

/**
 * Adds the handlers.
 * @method
 * @private
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 * @param {Promise} nextPromise
 */

fn._addHandlers = function _addHandlers (onFulfilled, onRejected, nextPromise) {
  this.handlers.onFulfilled.push({
    fn: onFulfilled,
    nextPromise: nextPromise
  })

  this.handlers.onRejected.push({
    fn: onRejected,
    nextPromise: nextPromise
  })
}

/**
 * Then method.
 * @method
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 * @return {Promise} nextPromise
 */

fn.then = function then (onFulfilled, onRejected) {
  var nextPromise = pp()

  this._addHandlers(onFulfilled, onRejected, nextPromise)

  if (this.state === FULFILLED) {
    this._executeOnFulfilledHandlers()
  }

  if (this.state === REJECTED) {
    this._executeOnRejectedHandlers()
  }

  return nextPromise
}

/**
 * Alias for `then(null, onRejected)`.
 * @method
 * @param {Function} onRejected
 */

fn.catch = function catchPromise (onRejected) {
  return this.then(null, onRejected)
}

/**
 * Resolves the promise with the given value.
 * @method
 * @param {*} value
 */

fn.resolve = function resolve (value) {
  if (this.state !== PENDING) return

  this._setState(FULFILLED)
  this.value = value
  this._executeOnFulfilledHandlers()

  return this
}

/**
 * Rejects the promise with the given reason.
 * @method
 * @param {*} reason
 */

fn.reject = function reject (reason) {
  if (this.state !== PENDING) return

  this._setState(REJECTED)
  this.reason = reason
  this._executeOnRejectedHandlers()

  return this
}

/**
 * Executes a handler.
 * @method
 * @private
 * @param {Function} handler
 * @param {*} argument
 * @param {Promise} nextPromise
 */

fn._executeHandler = function _executeHandler (handler, argument, nextPromise) {
  this._runAsync(function () {
    if (isFunction(handler)) {
      var x

      try {
        x = handler(argument)
      } catch (e) {
        return nextPromise.reject(e)
      }

      return pp.resolutionProcedure(nextPromise, x)
    }

    if (this.state === FULFILLED) {
      nextPromise.resolve(this.value)
    }

    if (this.state === REJECTED) {
      nextPromise.reject(this.reason)
    }
  })
}

/**
 * Executes a list of handlers.
 * @method
 * @private
 * @param {Array} handlers
 * @param {*} value
 */

fn._executeListOfHandlers = function _executeListOfHandlers (handlers, value) {
  handlers.forEach(function (handler) {
    this._executeHandler(handler.fn, value, handler.nextPromise)
  }, this)
  handlers.length = 0
}

/**
 * Executes all onFulfilled handlers.
 * @method
 * @private
 */

fn._executeOnFulfilledHandlers = function _executeOnFulfilledHandlers () {
  this._executeListOfHandlers(this.handlers.onFulfilled, this.value)
}

/**
 * Executes all onRejected handlers.
 * @method
 * @private
 */

fn._executeOnRejectedHandlers = function _executeOnRejectedHandlers () {
  this._executeListOfHandlers(this.handlers.onRejected, this.reason)
}

/**
 * `forEach` implementation for promises.
 * @method
 * @param {Function} iterator
 */

fn.forEach = function forEach (iterator) {
  return this.then(function (values) {
    values.forEach(iterator)
    return values
  })
}

/**
 * Promise Resolution Procedure
 * @static
 * @param {Promise} promise
 * @param {*} x
 */

pp.resolutionProcedure = function resolutionProcedure (promise, x) {
  if (promise === x) {
    return promise.reject(new TypeError())
  }

  if (isObject(x) || isFunction(x)) {
    var then

    try {
      then = x.then
    } catch (e) {
      return promise.reject(e)
    }

    if (isFunction(then)) {
      var hasResolvePromiseBeenCalled = false
      var hasRejectPromiseBeenCalled = false

      var resolvePromise = function (y) {
        if (hasResolvePromiseBeenCalled || hasRejectPromiseBeenCalled) return
        hasResolvePromiseBeenCalled = true
        pp.resolutionProcedure(promise, y)
      }

      var rejectPromise = function (r) {
        if (hasResolvePromiseBeenCalled || hasRejectPromiseBeenCalled) return
        hasRejectPromiseBeenCalled = true
        promise.reject(r)
      }

      try {
        then.call(x, resolvePromise, rejectPromise)
      } catch (e) {
        if (hasResolvePromiseBeenCalled || hasRejectPromiseBeenCalled) return
        promise.reject(e)
      }
    } else {
      promise.resolve(x)
    }
  } else {
    promise.resolve(x)
  }
}

/**
 * Checks if the given value is a Promise object.
 * @static
 * @param {*} obj
 * @return {Boolean} isPromise
 */

pp.isPromise = function (obj) {
  return obj && isFunction(obj.then)
}

/**
 * Resolves promises or anything you pass as params.
 * @static
 * @param {Array} items
 * @return {Promise} promise
 */

pp.when = function when (items) {
  var results = []
  var promiseResolution = pp()

  items = [].concat(items)

  process.nextTick(function () {
    var total = items.length
    var remaining = total

    items.forEach(function (item, index) {
      if (!remaining) return

      if (!pp.isPromise(item)) {
        item = pp().resolve(item)
      }

      item
      .then(function onFulfilled (value) {
        results[index] = value
        remaining -= 1
        if (!remaining) {
          promiseResolution.resolve(results)
        }
      }, function onRejected (reason) {
        promiseResolution.reject(reason)
        remaining = 0
      })
    })
  })

  return promiseResolution
}

/**
 * A simple class that allows you to return multiple values from Promises.
 * @static
 * @param {*}
 * @return {Args} args
 */

pp.args = function args () {
  return new Args(toArray(arguments))
}
