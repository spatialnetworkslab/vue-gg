export default {
  inject: ['$$interactionManager'],

  props: {
    brush: {
      type: [String, Object, undefined],
      default: undefined
    }
  },

  data () {
    return {
      brushManager: {
        rectangle: {
          start: null,
          previous: null,
          current: null,
          end: null
        }
      }
    }
  },

  computed: {
    _brush () {
      if (this.brush && this.brush.constructor === String) {
        return { type: this.brush }
      } else {
        return this.brush
      }
    },

    $$inverseTransform () {
      return this.$$coordinateTree.getInverseTransformation(this.coordinateTreeBranchID)
    }
  },

  watch: {
    _brush: 'updateInteractionManager'
  },

  mounted () {
    this.$nextTick(() => {
      if (this._brush) {
        this.updateInteractionManager(this._brush)
      }
    })
  },

  beforeDestroy () {
    if (this._brush) {
      this.$$interactionManager.removeBrush(this.uuid)
    }
  },

  methods: {
    updateInteractionManager (newVal, oldVal) {
      if (oldVal === undefined && newVal !== undefined) {
        let handlers = this.generateHandlers()
        this.$$interactionManager.addBrush(this.uuid, handlers)
      }

      if (oldVal !== undefined && newVal === undefined) {
        this.$$interactionManager.removeBrush(this.uuid)
      }
    },

    generateHandlers () {
      let brush = this._brush
      let events

      if (brush) {
        events = {}
        events.mousedown = this._onMouseDown.bind(this)
        events.mousemove = this._onMouseMove.bind(this)
        events.mouseup = this._onMouseUp.bind(this)
      }

      return events
    },

    _onMouseDown (coords, e) {
      let type = this._brush.type
      let dataCoords = this._getDataCoords(coords)

      this.brushManager[type].start = dataCoords
    },

    _onMouseMove (coords, e) {
      let type = this._brush.type
      if (this.brushManager[type].start) {
        let dataCoords = this._getDataCoords(coords)

        this.brushManager[type].current = dataCoords
        this._syncBrushPoints()
      }
    },

    _onMouseUp (coords, e) {
      let type = this._brush.type
      let dataCoords = this._getDataCoords(coords)

      this.brushManager[type].end = dataCoords
      this._emitBrushEvent()
      this._syncBrushPoints()
    },

    _getDataCoords ({ x, y }) {
      let dataCoords = this.$$inverseTransform([x, y])
      return dataCoords
    },

    _syncBrushPoints () {
      if (this._brush.type === 'rectangle') {
        let start = this.brushManager.rectangle.start
        let current = this.brushManager.rectangle.current
        let end = this.brushManager.rectangle.end

        let points = []

        if (!end) {
          points = [
            start,
            [start[0], current[1]],
            current,
            [current[0], start[1]]
          ]
        } else {
          points = []
          this.brushManager.rectangle.start = null
          this.brushManager.rectangle.current = null
          this.brushManager.rectangle.end = null
        }

        this.$emit('update:brushPoints', points)
      }
    },

    _emitBrushEvent () {
      let type = this._brush.type
      if (type === 'rectangle') {
        let start = this.brushManager.rectangle.start
        let end = this.brushManager.rectangle.end

        let bbox = {
          minX: Math.min(start[0], end[0]),
          minY: Math.min(start[1], end[1]),
          maxX: Math.max(start[0], end[0]),
          maxY: Math.max(start[1], end[1])
        }

        this.$emit('brush', bbox)
      }
    }
  }
}
