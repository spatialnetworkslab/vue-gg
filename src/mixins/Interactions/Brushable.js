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
        selection: {},
        rectangle: {
          data: {
            start: null,
            current: null,
            end: null
          },
          screen: {
            start: null,
            current: null,
            end: null
          }
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
    },

    _listener () {
      return this.$$interactionManager.interactionManager.listenerTrackers.mousemove
    },

    _spatialIndex () {
      return this._listener.selectableSpatialIndex
    },

    _anySelectables () {
      let listener = this._listener
      return listener.trackedSelectables !== 0
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

    _onMouseDown ({ x, y }, e) {
      let type = this._brush.type
      let dataCoords = this._getDataCoords(x, y)

      let brush = this.brushManager[type]
      let selection = this.brushManager.selection

      for (let uid in selection) {
        selection[uid].instance.$emit('deselect')
        delete selection[uid]
      }

      brush.screen.start = [x, y]
      brush.data.start = dataCoords
    },

    _onMouseMove ({ x, y }, e) {
      let type = this._brush.type
      if (this.brushManager[type].screen.start) {
        let dataCoords = this._getDataCoords(x, y)

        this.brushManager[type].screen.current = [x, y]
        this.brushManager[type].data.current = dataCoords
        this._syncBrushPoints()

        if (this._anySelectables) {
          this._updateSelection()
        }
      }
    },

    _onMouseUp ({ x, y }, e) {
      let type = this._brush.type
      let dataCoords = this._getDataCoords(x, y)

      this.brushManager[type].screen.end = [x, y]
      this.brushManager[type].data.end = dataCoords
      this._emitBrushEvent()
      this._syncBrushPoints()
      this._resetEverything()
    },

    _getDataCoords (x, y) {
      return this.$$inverseTransform([x, y])
    },

    _syncBrushPoints () {
      if (this._brush.type === 'rectangle') {
        let start = this.brushManager.rectangle.screen.start
        let current = this.brushManager.rectangle.screen.current
        let end = this.brushManager.rectangle.screen.end

        let points = []

        if (!end) {
          points = this._getBrushPoints(start, current)
        } else {
          points = []
        }

        this.$emit('update:brushPoints', points)
      }
    },

    _emitBrushEvent () {
      let type = this._brush.type
      if (type === 'rectangle') {
        let start = this.brushManager.rectangle.data.start
        let end = this.brushManager.rectangle.data.end

        let bbox = this._getBBox(start, end)

        this.$emit('brush', bbox)
      }
    },

    _updateSelection () {
      let type = this._brush.type
      if (type === 'rectangle') {
        let start = this.brushManager.rectangle.screen.start
        let current = this.brushManager.rectangle.screen.current

        let bbox = this._getBBox(start, current)

        let hits = this._spatialIndex.search(bbox)
        let currentSelection = {}

        for (let hit of hits) {
          let uid = hit.uid
          currentSelection[uid] = true

          if (!this.brushManager.selection[uid]) {
            this.brushManager.selection[uid] = hit
            hit.instance.$emit('select')
          }
        }

        for (let uid in this.brushManager.selection) {
          if (!currentSelection[uid]) {
            this.brushManager.selection[uid].instance.$emit('deselect')
            delete this.brushManager.selection[uid]
          }
        }
      }
    },

    _getBBox (a, b) {
      return {
        minX: Math.min(a[0], b[0]),
        minY: Math.min(a[1], b[1]),
        maxX: Math.max(a[0], b[0]),
        maxY: Math.max(a[1], b[1])
      }
    },

    _getBrushPoints (a, b) {
      if (this._brush.type === 'rectangle') {
        let points = [
          a,
          [a[0], b[1]],
          b,
          [b[0], a[1]]
        ]

        let rootTransform = this.$$coordinateTree.getBranch('root').inverseTransform
        return points.map(rootTransform)
      }
    },

    _resetEverything () {
      let type = this._brush.type
      for (let key in this.brushManager[type].screen) {
        this.brushManager[type].screen[key] = null
      }
      for (let key in this.brushManager[type].data) {
        this.brushManager[type].data[key] = null
      }
    }
  }
}
