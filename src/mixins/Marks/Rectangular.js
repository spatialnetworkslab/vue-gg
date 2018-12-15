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
    },

    color: {
      type: [String, Object, undefined],
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

    aesthetics () {
      if (this.invalidX) {
        throw new Error('Invalid combination of props x1, x2, x and w')
      }

      if (this.invalidY) {
        throw new Error('Invalid combination of props y1, y2, y and h')
      }

      return {
        'x1': this.parseMappable(this.x1, undefined),
        'x2': this.parseMappable(this.x2, undefined),
        'y1': this.parseMappable(this.y1, undefined),
        'y2': this.parseMappable(this.y2, undefined),
        'x': this.parseMappable(this.x, undefined),
        'y': this.parseMappable(this.y, undefined),
        'w': this.parseMappable(this.w, undefined),
        'h': this.parseMappable(this.h, undefined),
        'color': this.parseMappable(this.color, '#000000')
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
