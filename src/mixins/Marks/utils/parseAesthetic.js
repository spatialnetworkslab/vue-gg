import { is, isnt } from '../../../utils/equals.js'

export default function (prop, options) {
  options = options || {}
  if (prop && is(options.isFunction)) {
    for (let key in this.parentRangeTypes) {
      if (['categorical', 'temporal'].includes(this.parentRangeTypes[key])) {
        throw new Error(`
          Cannot use :func prop on 'vgg-line' in combination with
          '${this.parentRangeTypes[key]}' parent domain
        `)
      }
    }
  }

  if (!this.$$map) {
    if (is(prop) && prop.constructor === Object) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop)) { return prop }
    if (isnt(prop)) { return options.default }
  }
  if (this.$$map) {
    let isObject = is(prop) && prop.constructor === Object
    let isFunction = is(prop) && prop.constructor === Function

    if (is(prop) && isObject) {
      checkMappingObject(prop)
      return prop
    }
    if (is(prop) && isFunction) {
      if (options.isFunction) {
        return { assign: prop }
      } else {
        throw new Error(`Cannot use Function in '${prop}' mapping syntax`)
      }
    }
    if (is(prop) && !isObject && !isFunction) { return { assign: prop } }
    if (isnt(prop)) { return { assign: options.default } }
  }
}

function checkMappingObject (obj) {
  if (!obj.hasOwnProperty('get')) {
    throw new Error(`Missing required mapping option 'get'`)
  }

  const allowed = ['get', 'scale', 'NA']

  for (let key in obj) {
    if (!allowed.includes(key)) { throw new Error(`Invalid mapping option '${key}'`) }
  }
}
