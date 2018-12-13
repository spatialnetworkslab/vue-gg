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
    // This looks very complicated, but it basically means this:
    // You can have:
    // - Nothing
    // - just x1
    // - just x2
    // - just x1 and x2
    // - just x1 and w
    // - just x2 and w
    // - just x and w
    //
    // If you have nothing or just x1 or x2, the missing values will default to 0.
    // If you have any other combination than listed above, we throw an error.
    // Same goes for y1, y2 etc.

    _x1 () {
      if (isnt(this.x)) {
        return this.default(this.x1, 0)
      }

      if (is(this.x2) && is(this.w) && isnt(this.x)) {
        return this.default(this.x2 - this.w, 0)
      } else if (is(this.x) && is(this.w) && isnt(this.x2)) {
        return this.default(this.x - (this.w / 2), 0)
      } else {
        throw new Error('Invalid combination of props (x, x1, x2, w)')
      }
    },

    _x2 () {
      if (isnt(this.x)) {
        return this.default(this.x2, 0)
      }

      if (is(this.x1) && is(this.w) && isnt(this.x)) {
        return this.default(this.x1 + this.w, 0)
      } else if (is(this.x) && is(this.w) && isnt(this.x1)) {
        return this.default(this.x + (this.w / 2), 0)
      } else {
        throw new Error('Invalid combination of props (x, x1, x2, w)')
      }
    },

    _y1 () {
      if (isnt(this.y)) {
        return this.default(this.y1, 0)
      }

      if (is(this.y2) && is(this.h) && isnt(this.y)) {
        return this.default(this.y2 - this.h, 0)
      } else if (is(this.y) && is(this.h) && isnt(this.y2)) {
        return this.default(this.y - (this.h / 2), 0)
      } else {
        throw new Error('Invalid combination of props (y, y1, y2, h)')
      }
    },

    _y2 () {
      if (isnt(this.y)) {
        return this.default(this.y2, 0)
      }

      if (is(this.y1) && is(this.h) && isnt(this.y)) {
        return this.default(this.y1 + this.h, 0)
      } else if (is(this.y) && is(this.h) && isnt(this.y1)) {
        return this.default(this.y + (this.h / 2), 0)
      } else {
        throw new Error('Invalid combination of props (y, y1, y2, h)')
      }
    }
  }
}
