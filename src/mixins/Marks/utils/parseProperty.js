import { is, isnt } from '../../../utils/equals.js'

export default function (prop, options) {
  if (!this.$$map) {
    if (is(prop) && (prop.constructor === Object || prop.constructor === Function)) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop)) { return prop }
    if (isnt(prop)) { return options.default }
  }

  if (this.$$map) {
    if (is(prop) && prop.constructor === Object) {
      throw new Error(`Property '${prop}' is unmappable.`)
    }

    let isFunction = is(prop) && prop.constructor === Function

    if (is(prop) && isFunction) { return { func: prop } }
    if (is(prop) && !isFunction) { return { assign: prop } }
    if (isnt(prop)) { return { assign: options.default } }
  }
}
