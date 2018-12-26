import { is, isnt } from '../../../utils/equals.js'

export default function (prop, defaultVal, funcProp = false) {
  if (prop && funcProp) {
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

    if (is(prop) && prop.constructor === Function && funcProp === false) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop)) { return prop }
    if (isnt(prop)) { return defaultVal }
  }
  if (this.$$map) {
    let isObject = is(prop) && prop.constructor === Object
    let isFunction = is(prop) && prop.constructor === Function

    if (is(prop) && isObject) { return prop }
    if (is(prop) && isFunction) { return { func: prop } }
    if (is(prop) && !isObject && !isFunction) { return { assign: prop } }
    if (isnt(prop)) { return { assign: defaultVal } }
  }
}
