import findBoundingBox from './utils/geometry/findBoundingBox.js'

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
        },

        polygon: {
          data: {
            start: null,
            points: null,
            end: null,
            bbox: null
          },
          screen: {
            start: null,
            points: null,
            end: null,
            bbox: null
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
    },

    _sectionBBox () {
      let domains = this.transformation.domains

      let cornerPoints = [
        [domains.x[0], domains.y[0]],
        [domains.x[0], domains.y[1]],
        [domains.x[1], domains.y[1]],
        [domains.x[1], domains.y[0]],
        [domains.x[0], domains.y[0]]
      ].map(this.$$ownTransform)

      let bbox = findBoundingBox(cornerPoints)
      return bbox
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
      if (this._inBBox([x, y], this._sectionBBox)) {
        let type = this._brush.type
        let brush

        if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
          if (type === 'swipeX') { y = this._sectionBBox.minY }
          if (type === 'swipeY') { x = this._sectionBBox.minX }
          brush = this.brushManager.retangle
        }

        if (type === 'polygon') {
          brush = this.brushManager.polygon
        }

        let dataCoords = this._getDataCoords(x, y)
        let selection = this.brushManager.selection

        // Empty current selection
        for (let uid in selection) {
          selection[uid].instance.$emit('deselect')
          delete selection[uid]
        }

        brush.screen.start = [x, y]
        brush.data.start = dataCoords

        if (type === 'polygon') {
          brush.screen.points = [[x, y]]
          brush.data.points = [dataCoords]

          brush.screen.bbox = this._getBBox([x, y], [x, y])
          brush.data.bbox = this._getBbox(dataCoords, dataCoords)
        }
      }
    },

    _onMouseMove ({ x, y }, e) {
      let type = this._brush.type

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let brush = this.brushManager.rectangle
        if (brush.screen.start) {
          if (type === 'swipeX') { y = this._sectionBBox.maxY }
          if (type === 'swipeY') { x = this._sectionBBox.maxX }

          let dataCoords = this._getDataCoords(x, y)

          brush.screen.current = [x, y]
          brush.data.current = dataCoords
          this._syncBrushPoints()

          if (this._anySelectables) {
            this._updateSelection()
          }
        }
      }

      if (type === 'polygon') {
        let brush = this.brushManager.polygon
        if (brush.screen.start) {
          let dataCoords = this._getDataCoords(x, y)

          brush.screen.points.push([x, y])
          brush.data.points.push(dataCoords)

          brush.screen.bbox = this._updateBBox(brush.screen.bbox, [x, y])
          brush.data.bbox = this._updateBBox(brush.data.bbox, dataCoords)

          this._syncBrushPoints()

          if (this._anySelectables) {
            this._updateSelection()
          }
        }
      }
    },

    _onMouseUp ({ x, y }, e) {
      let type = this._brush.type
      let brush
      let dataCoords = this._getDataCoords(x, y)

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        brush = this.brushManager.rectangle
      }

      if (type === 'polygon') {
        brush = this.brushManager.polygon
      }

      brush.screen.end = [x, y]
      brush.data.end = dataCoords
      this._emitBrushEvent()
      this._syncBrushPoints()
      this._resetEverything()
    },

    _getDataCoords (x, y) {
      return this.$$inverseTransform([x, y])
    },

    _syncBrushPoints () {
      let points = []
      let type = this._brush.type

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let start = this.brushManager.rectangle.screen.start
        let current = this.brushManager.rectangle.screen.current
        let end = this.brushManager.rectangle.screen.end

        if (!end) {
          points = this._getBrushPoints(start, current)
        }

        this.$emit('update:brushPoints', points)
      }

      if (type === 'polygon') {
        let start = this.brushManager.polygon.screen.start
        let points = this.brushManager.polygon.screen.points
        let end = this.brushManager.polygon.screen.end

        if (!end) {
          points = this._getBrushPoints(start, points)
        }

        this.$emit('update:brushPoints', points)
      }
    },

    _emitBrushEvent () {
      let type = this._brush.type

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let start = this.brushManager.rectangle.data.start
        let end = this.brushManager.rectangle.data.end

        let bbox = this._getBBox(start, end)

        this.$emit('brush', bbox)
      }

      if (type === 'polygon') {
        let bbox = findBoundingBox(this.brushManager.polygon.data.points)

        this.$emit('brush', bbox)
      }
    },

    _updateSelection () {
      let type = this._brush.type

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
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

      if (type === 'polygon') {
        let bbox = this.brushManager.polygon.screen.bbox

        let hits = this._spatialIndex.search(bbox)
        let currentSelection = {}

        for (let hit of hits) {
          // TODO
        }
      }
    },

    _getBBox (a, b) {
      return a && b ? {
        minX: Math.min(a[0], b[0]),
        minY: Math.min(a[1], b[1]),
        maxX: Math.max(a[0], b[0]),
        maxY: Math.max(a[1], b[1])
      } : null
    },

    _updateBBox (bbox, point) {
      return {
        minX: Math.min(bbox.minX, point[0]),
        minY: Math.min(bbox.minY, point[1]),
        maxX: Math.max(bbox.maxX, point[0]),
        maxY: Math.max(bbox.maxY, point[1])
      }
    },

    _getBrushPoints (a, b) {
      if (a && b) {
        let type = this._brush.type
        let rootTransform = this.$$coordinateTree.getBranch('root').inverseTransform

        if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
          let points = [
            a,
            [a[0], b[1]],
            b,
            [b[0], a[1]]
          ]

          return points.map(rootTransform)
        }

        if (type === 'polygon') {
          return b.map(rootTransform)
        }
      }
    },

    _resetEverything () {
      let type = this._brush.type
      let brush

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        brush = this.brushManager.rectangle
      }

      if (type === 'polygon') {
        brush = this.brushManager.polygon
      }

      for (let key in brush.screen) {
        brush.screen[key] = null
      }
      for (let key in brush.data) {
        brush.data[key] = null
      }
    },

    _inBBox (point, bbox) {
      return point[0] >= bbox.minX && point[0] <= bbox.maxX &&
        point[1] >= bbox.minY && point[1] <= bbox.maxY
    }
  }
}
