import Mark from './Mark.js'
import { is, isnt } from '../../utils/equals.js'

export default {
  mixins: [Mark],

  props: {
    x1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    x2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    x: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    w: {
      type: [Number, undefined],
      default: undefined
    },

    h: {
      type: [Number, undefined],
      default: undefined
    },

    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    fill: {
      type: String,
      default: '#000000'
    },

    opacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, undefined],
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

    coordinateSpecification () {
      let aes = this._props

      let [x1, x2] = convertSpecification(aes.x1, aes.x2, aes.x, aes.w)
      let [y1, y2] = convertSpecification(aes.y1, aes.y2, aes.y, aes.h)

      let newCoords = { x1, x2, y1, y2 }
      return newCoords
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
