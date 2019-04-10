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
      if (this.invalidX || this.invalidY) {
        throw new Error('Invalid combination of props')
      }

      let [x1, x2] = this.convertSpecification(this.x1, this.x2, this.x, this.w, this.parentBranch, 'x')
      let [y1, y2] = this.convertSpecification(this.y1, this.y2, this.y, this.h, this.parentBranch, 'y')

      let newCoords = { x1, x2, y1, y2 }

      return newCoords
    }
  },

  methods: {
    // Converts any valid combination of x1, x2, x and w to [x1, x2]
    convertSpecification (x1, x2, x, w, parentBranch, dimension) {
      let domainType = parentBranch.domainTypes[dimension]
      let converter
      if (domainType === 'quantitative') {
        converter = x => x
      } else {
        converter = parentBranch[dimension === 'x' ? 'getX' : 'getY']
      }

      // If there is nothing, just x1, just x2, or just x1 and x2
      if (isnt(x) && isnt(w)) {
        return [x1, x2].map(converter)
      }
      // If there is just x1 and w
      if (is(x1) && isnt(x2) && isnt(x) && is(w)) {
        let cx1 = converter(x1)
        return [cx1, cx1 + w]
      }
      // If there is just x2 and w
      if (isnt(x1) && is(x2) && isnt(x) && is(w)) {
        let cx2 = converter(x2)
        return [cx2 - w, cx2]
      }
      // If there is just x and w
      if (isnt(x1) && isnt(x2) && is(x) && is(w)) {
        let cx = converter(x)
        return [cx - (w / 2), cx + (w / 2)]
      }
    }
  }
}

function invalidCombination (x1, x2, x, w) {
  let validCombinations = [
    // If there is  just x1 and x2
    is(x1) && is(x2) && isnt(x) && isnt(w),
    // If there is just x1 and w
    is(x1) && isnt(x2) && isnt(x) && is(w),
    // If there is just x2 and w
    isnt(x1) && is(x2) && isnt(x) && is(w),
    // If there is just x and w
    isnt(x1) && isnt(x2) && is(x) && is(w)
  ]

  return !(validCombinations.some(combo => combo === true))
}
