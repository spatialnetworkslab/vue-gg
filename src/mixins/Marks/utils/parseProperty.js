import { is, isnt } from '../../../utils/equals.js'

export default function (prop, options) {
  if (!this.$$map) {
    if (is(prop) && (prop.constructor === Object)) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop)) { return prop }
    if (isnt(prop)) { return options.default }
  }

  if (this.$$map) {
    if (is(prop) && prop.constructor === Object) {
      throw new Error(`Property '${prop}' is unmappable.`)
    }

    if (is(prop)) { return { assign: prop } }
    if (isnt(prop)) { return { assign: options.default } }
  }
}
