import { is, isnt } from '@/utils/equals.js'

export default {
  props: {
    x1: {
      type: [Number, undefined],
      default: undefined
    },

    x2: {
      type: [Number, undefined],
      default: undefined
    },

    y1: {
      type: [Number, undefined],
      default: undefined
    },

    y2: {
      type: [Number, undefined],
      default: undefined
    },

    x: {
      type: [Number, undefined],
      default: undefined
    },

    y: {
      type: [Number, undefined],
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
    _x1 () {
      if (is(this.x1)) { return this.x1 }

      if (is(this.x2) && is(this.w) && isnt(this.x)) {
        return this.x2 - this.w
      } else if (is(this.x) && is(this.w) && isnt(this.x2)) {
        return this.x - (this.w / 2)
      } else {
        throw new Error('Invalid combination of props (x, x1, x2, w)')
      }
    },

    _x2 () {
      if (is(this.x2)) { return this.x2 }

      if (is(this.x1) && is(this.w) && isnt(this.x)) {
        return this.x1 + this.w
      } else if (is(this.x) && is(this.w) && isnt(this.x1)) {
        return this.x + (this.w / 2)
      } else {
        throw new Error('Invalid combination of props (x, x1, x2, w)')
      }
    },

    _y1 () {
      if (is(this.y1)) { return this.y1 }

      if (is(this.y2) && is(this.h) && isnt(this.y)) {
        return this.y2 - this.h
      } else if (is(this.y) && is(this.h) && isnt(this.y2)) {
        return this.y - (this.h / 2)
      } else {
        throw new Error('Invalid combination of props (y, y1, y2, h)')
      }
    },

    _y2 () {
      if (is(this.y2)) { return this.y2 }

      if (is(this.y1) && is(this.h) && isnt(this.y)) {
        return this.y1 + this.h
      } else if (is(this.y) && is(this.h) && isnt(this.y1)) {
        return this.y + (this.h / 2)
      } else {
        throw new Error('Invalid combination of props (y, y1, y2, h)')
      }
    }
  }
}
