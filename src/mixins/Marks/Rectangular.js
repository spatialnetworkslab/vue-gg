import Mark from './Mark.js'
import { is, isnt } from '@/utils/equals.js'

export default {
  mixins: [Mark],

  props: {
    x1: {
      type: [Number, Object, undefined],
      default: undefined
    },

    x2: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y1: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y2: {
      type: [Number, Object, undefined],
      default: undefined
    },

    x: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y: {
      type: [Number, Object, undefined],
      default: undefined
    },

    w: {
      type: [Number, Object, undefined],
      default: undefined
    },

    h: {
      type: [Number, Object, undefined],
      default: undefined
    }
  },

  computed: {
    invalidX () {
      return invalidCombination(this.x1, this.x2, this.x, this.w)
    },

    invalidY () {
      return invalidCombination(this.y1, this.y2, this.y, this.h)
    },

    _x1 () { return this.default(this.x1, undefined) },
    _x2 () { return this.default(this.x2, undefined) },
    _y1 () { return this.default(this.y1, undefined) },
    _y2 () { return this.default(this.y2, undefined) },
    _x () { return this.default(this.x, undefined) },
    _y () { return this.default(this.y, undefined) },
    _w () { return this.default(this.w, undefined) },
    _h () { return this.default(this.h, undefined) },

    aesthetics () {
      if (this.invalidX) {
        throw new Error('Invalid combination of props x1, x2, x and w')
      }

      if (this.invalidY) {
        throw new Error('Invalid combination of props y1, y2, y and h')
      }

      return {
        'x1': this._x1,
        'x2': this._x2,
        'y1': this._y1,
        'y2': this._y2,
        'x': this._x,
        'y': this._y,
        'w': this._w,
        'h': this._h,
        'color': this._color
      }
    }
  },

  methods: {
    convertCoordinateSpecification (aes) {
      let [x1, x2] = convertSpecification(aes.x1, aes.x2, aes.x, aes.w)
      let [y1, y2] = convertSpecification(aes.y1, aes.y2, aes.y, aes.h)

      for (let aesKey in ['x', 'y', 'w', 'h']) {
        if (aes[aesKey]) { delete aes[aesKey] }
      }

      aes.x1 = x1
      aes.x2 = x2
      aes.y1 = y1
      aes.y2 = y2

      return aes
    }
  }
}

function invalidCombination (x1, x2, x, w) {
  let validCombinations = [
    // If there is nothing, just x1, just x2, or just x1 and x2
    isnt(x) && isnt(w),
    // If there is just x1 and w
    is(x1) && isnt(x2) && isnt(x) && is(w),
    // If there is just x2 and w
    isnt(x1) && is(x2) && isnt(x) && is(w),
    // If there is just x and w
    isnt(x1) && isnt(x2) && is(x) && is(w)
  ]

  return !(validCombinations.some(combo => combo === true))
}

// Converts any valid combination of x1, x2, x and w to [x1, x2]
function convertSpecification (x1, x2, x, w) {
  // If there is nothing, just x1, just x2, or just x1 and x2
  if (isnt(x) && isnt(w)) {
    return [x1, x2]
  }
  // If there is just x1 and w
  if (is(x1) && isnt(x2) && isnt(x) && is(w)) {
    return [x1, x1 + w]
  }
  // If there is just x2 and w
  if (isnt(x1) && is(x2) && isnt(x) && is(w)) {
    return [x2 - w, x2]
  }
  // If there is just x and w
  if (isnt(x1) && isnt(x2) && is(x) && is(w)) {
    return [x - (w / 2), x + (w / 2)]
  }
}
