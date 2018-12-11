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
      if (this.x1 !== undefined) { return this.x1 }

      if (this.x2 && this.w && (this.x === undefined)) {
        return this.x2 - this.w
      } else if (this.x && this.w && (this.x2 === undefined)) {
        return this.x - (this.w / 2)
      } else {
        throw new Error('Invalid combination of props (x, x1, x2, w)')
      }
    },

    _x2 () {
      if (this.x2 !== undefined) { return this.x2 }

      if (this.x1 && this.w && (this.x === undefined)) {
        return this.x1 + this.w
      } else if (this.x && this.w && (this.x1 === undefined)) {
        return this.x + (this.w / 2)
      } else {
        throw new Error('Invalid combination of props (x, x1, x2, w)')
      }
    },

    _y1 () {
      if (this.y1 !== undefined) { return this.y1 }

      if (this.y2 && this.h && (this.y === undefined)) {
        return this.y2 - this.h
      } else if (this.y && this.h && (this.y2 === undefined)) {
        return this.y - (this.h / 2)
      } else {
        throw new Error('Invalid combination of props (y, y1, y2, h)')
      }
    },

    _y2 () {
      if (this.y2 !== undefined) { return this.y2 }

      if (this.y1 && this.h && (this.y === undefined)) {
        return this.y1 + this.h
      } else if (this.y && this.h && (this.y1 === undefined)) {
        return this.y + (this.h / 2)
      } else {
        // throw new Error('Invalid combination of props (y, y1, y2, h)')
      }
    }
  }
}
