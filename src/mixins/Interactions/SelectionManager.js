import findBoundingBox from './utils/geometry/findBoundingBox.js'
import pointInPolygon from './utils/geometry/pointInPolygon.js'
import createScale from '../../scales/createScale.js'
import createGeoScale from '../../scales/createGeoScale.js'
import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'

export default {
  inject: ['$$interactionManager', '$$sectionParentChain'],

  props: {
    select: {
      type: [String, Object, undefined],
      default: undefined
    },

    selectionBounds: {
      type: [Array, undefined],
      default: undefined
    }
  },

  data () {
    return {
      selectionManager: {
        selection: {},

        rectangle: {
          screen: {
            start: null,
            current: null,
            end: null
          },
          local: {
            start: null,
            current: null,
            end: null
          },
          scaled: {
            start: null,
            current: null,
            end: null
          }
        },

        polygon: {
          screen: {
            start: null,
            points: null,
            end: null
          },
          local: {
            start: null,
            points: null,
            end: null
          },
          scaled: {
            start: null,
            points: null,
            end: null
          }
        }
      }
    }
  },

  computed: {
    _select () {
      if (this.props.select) {
        if (this.props.select.constructor === String) {
          return { type: this.props.select }
        } else {
          return this.props.select
        }
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
    },

    context () {
      return {
        ranges: this.transformation.domains,
        dataInterface: this.$$dataInterface,
        scaleManager: this.$$scaleManager
      }
    },

    _localScaledTransform () {
      if (this._select) {
        if (this._select.hasOwnProperty('scaleGeo')) {
          if (this._select.hasOwnProperty('scaleX') || this._select.hasOwnProperty('scaleY')) {
            throw new Error(`Cannot set 'scaleX' or 'scaleY' when 'scaleGeo' is defined`)
          }
          if (!this.$$dataInterface.hasColumn('geometry')) {
            throw new Error(`'scale-geo' is only allowed when data has geometry column`)
          }

          let { scaleX, scaleY } = createGeoScale(this.context, this._select.scaleGeo)

          return ([x, y]) => { return [scaleX.invert(x), scaleY.invert(y)] }
        } else {
          let scaleX = x => x
          let scaleY = y => y

          if (this._select.hasOwnProperty('scaleX')) {
            let _scaleX = createScale('x', this.context, this._select.scaleX).invert
            if (this.transformation.domainTypes.x !== 'quantitative') {
              scaleX = x => _scaleX(this.transformation.scaleX(x))
            } else {
              scaleX = _scaleX
            }
          }
          if (this._select.hasOwnProperty('scaleY')) {
            let _scaleY = createScale('y', this.context, this._select.scaleY).invert
            if (this.transformation.domainTypes.y !== 'quantitative') {
              scaleY = y => _scaleY(this.transformation.scaleY(y))
            } else {
              scaleY = _scaleY
            }
          }

          return ([x, y]) => { return [scaleX(x), scaleY(y)] }
        }
      }
    },

    _localScaledDomainTypes () {
      if (this._select) {
        if (this.props.scaleGeo) { return { x: 'quantitative', y: 'quantitative' } }
        let localScaledDomainTypes = {}

        if (this._select.hasOwnProperty('scaleX')) {
          localScaledDomainTypes.x = parseScaleOptions(
            this._select.scaleX, this.$$dataInterface, this.$$scaleManager
          )[1]
        } else { localScaledDomainTypes.x = this.transformation.domainTypes.x }
        if (this._select.hasOwnProperty('scaleY')) {
          localScaledDomainTypes.y = parseScaleOptions(
            this._select.scaleY, this.$$dataInterface, this.$$scaleManager
          )[1]
        } else { localScaledDomainTypes.y = this.transformation.domainTypes.y }

        return localScaledDomainTypes
      }
    },

    sectionParentChain () {
      return [...this.$$sectionParentChain, this.uuid]
    }
  },

  watch: {
    _select: 'updateInteractionManager'
  },

  mounted () {
    this.$nextTick(() => {
      if (this._select && !this.axes) {
        this.updateInteractionManager(this._select)
      }
    })
  },

  beforeDestroy () {
    if (this._select && !this.axes) {
      this.$$interactionManager.removeSelectionTool(this.uuid)
    }
  },

  methods: {
    updateInteractionManager (newVal, oldVal) {
      if (oldVal === undefined && newVal !== undefined) {
        let handlers = this.generateHandlers()
        this.$$interactionManager.addSelectionTool(this.uuid, handlers)
      }

      if (oldVal !== undefined && newVal === undefined) {
        this.$$interactionManager.removeSelectionTool(this.uuid)
      }
    },

    generateHandlers () {
      let select = this._select
      let events

      if (select) {
        events = {}
        events.mousedown = this._onMouseDown.bind(this)
        events.mousemove = this._onMouseMove.bind(this)
        events.mouseup = this._onMouseUp.bind(this)
      }

      return events
    },

    _onMouseDown ({ x, y }, e) {
      if (this._inBBox([x, y], this._sectionBBox)) {
        let type = this._select.type
        let selectionTool

        if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
          if (type === 'swipeX') { y = this._sectionBBox.minY }
          if (type === 'swipeY') { x = this._sectionBBox.minX }
          selectionTool = this.selectionManager.rectangle
        }

        if (type === 'polygon') {
          selectionTool = this.selectionManager.polygon
        }

        let localCoords = this._getLocalCoords(x, y)
        let transformedCoords = this._localScaledTransform(localCoords)
        let selection = this.selectionManager.selection

        // Empty current selection
        for (let uid in selection) {
          selection[uid].instance.$emit('deselect')
          delete selection[uid]
        }

        selectionTool.screen.start = [x, y]
        selectionTool.local.start = localCoords
        selectionTool.scaled.start = transformedCoords

        if (type === 'polygon') {
          selectionTool.screen.points = [[x, y]]
          selectionTool.local.points = [localCoords]
          selectionTool.scaled.points = [transformedCoords]
        }
      }
    },

    _onMouseMove ({ x, y }, e) {
      let type = this._select.type

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let selectionTool = this.selectionManager.rectangle
        if (selectionTool.screen.start) {
          if (type === 'swipeX') { y = this._sectionBBox.maxY }
          if (type === 'swipeY') { x = this._sectionBBox.maxX }

          let localCoords = this._getLocalCoords(x, y)
          let transformedCoords = this._localScaledTransform(localCoords)

          selectionTool.screen.current = [x, y]
          selectionTool.local.current = localCoords
          selectionTool.scaled.current = transformedCoords

          this._syncSelectionBounds()

          if (this._anySelectables) {
            this._updateSelection()
          }
        }
      }

      if (type === 'polygon') {
        let selectionTool = this.selectionManager.polygon
        if (selectionTool.screen.start) {
          let localCoords = this._getLocalCoords(x, y)
          let transformedCoords = this._localScaledTransform(localCoords)

          selectionTool.screen.points.push([x, y])
          selectionTool.local.points.push(localCoords)
          selectionTool.local.points.push(transformedCoords)
          this._syncSelectionBounds()

          if (this._anySelectables) {
            this._updateSelection()
          }
        }
      }
    },

    _onMouseUp ({ x, y }, e) {
      let type = this._select.type
      let selectionTool
      let localCoords = this._getLocalCoords(x, y)
      let transformedCoords = this._localScaledTransform(localCoords)

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        selectionTool = this.selectionManager.rectangle
      }

      if (type === 'polygon') {
        selectionTool = this.selectionManager.polygon
      }

      selectionTool.screen.end = [x, y]
      selectionTool.local.end = localCoords
      selectionTool.scaled.end = transformedCoords

      this._emitSelectionDoneEvent()
      this._syncSelectionBounds()
      this._resetEverything()
    },

    _getLocalCoords (x, y) {
      return this.$$inverseTransform([x, y])
    },

    _syncSelectionBounds () {
      let type = this._select.type

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let start = this.selectionManager.rectangle.screen.start
        let current = this.selectionManager.rectangle.screen.current
        let end = this.selectionManager.rectangle.screen.end

        if (!end) {
          let points = this._getSelectionBounds(start, current)
          this.$emit('update:selectionBounds', points)
        }

        if (end) {
          this.$emit('update:selectionBounds', [])
        }
      }

      if (type === 'polygon') {
        let start = this.selectionManager.polygon.screen.start
        let selectionPoints = this.selectionManager.polygon.screen.points
        let end = this.selectionManager.polygon.screen.end

        if (!end) {
          let points = this._getSelectionBounds(start, selectionPoints)
          this.$emit('update:selectionBounds', points)
        }

        if (end) {
          let points = []
          this.$emit('update:selectionBounds', points)
        }
      }
    },

    _emitSelectionDoneEvent () {
      let type = this._select.type
      let notPolar = this.type !== 'polar'

      if (notPolar && ['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let screen = this.selectionManager.rectangle.screen
        let local = this.selectionManager.rectangle.local
        let scaled = this.selectionManager.rectangle.scaled

        let localDomainTypes = this.transformation.domainTypes
        let scaledDomainTypes = this._localScaledDomainTypes

        let bboxScreen = this._getBBox(screen.start, screen.end)
        let bboxLocal = this._getBBox(local.start, local.end, localDomainTypes)
        let bboxScaled = this._getBBox(scaled.start, scaled.end, scaledDomainTypes)

        this.$emit('selectionDone', { bboxScreen, bboxLocal, bboxScaled })
      }
    },

    _updateSelection () {
      let type = this._select.type
      let sectionChain = JSON.stringify(this.sectionParentChain)

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        let start = this.selectionManager.rectangle.screen.start
        let current = this.selectionManager.rectangle.screen.current

        let bbox = this._getBBox(start, current)

        let hits = this._spatialIndex.search(bbox)
        let currentSelection = {}

        for (let hit of hits) {
          if (hit.parentSectionChain === sectionChain) {
            let uid = hit.uid
            currentSelection[uid] = true

            if (!this.selectionManager.selection[uid]) {
              this.selectionManager.selection[uid] = hit
              hit.instance.$emit('select')
            }
          }
        }

        for (let uid in this.selectionManager.selection) {
          if (!currentSelection[uid]) {
            this.selectionManager.selection[uid].instance.$emit('deselect')
            delete this.selectionManager.selection[uid]
          }
        }
      }

      if (type === 'polygon') {
        let points = this.selectionManager.polygon.screen.points
        let len = points.length
        if (len > 2) {
          let triangle = [
            points[0],
            points[len - 2],
            points[len - 1]
          ]

          let bboxTriangle = findBoundingBox(triangle)

          let hits = this._spatialIndex.search(bboxTriangle)
          let currentSelection = {}

          for (let hit of hits) {
            let centroid = [hit.minX, hit.minY]
            if (sectionChain === hit.parentSectionChain && pointInPolygon(centroid, triangle)) {
              let uid = hit.uid
              currentSelection[uid] = true

              if (!this.selectionManager.selection[uid]) {
                this.selectionManager.selection[uid] = hit
                hit.instance.$emit('select')
              } else {
                this.selectionManager.selection[uid].instance.$emit('deselect')
                delete this.selectionManager.selection[uid]
              }
            }
          }
        }
      }
    },

    _getBBox (a, b, _domainTypes) {
      if (a && b) {
        let domainTypes = _domainTypes || { x: 'quantitative', y: 'quantitative' }
        let bbox = {}

        if (domainTypes.x === 'quantitative') {
          bbox.minX = Math.min(a[0], b[0])
          bbox.maxX = Math.max(a[0], b[0])
        }

        if (domainTypes.x === 'categorical') {
          bbox.x = []
          let within = 0
          for (let cat of this.transformation.actualDomains.x) {
            if (cat === a[0] || cat === b[0]) {
              within++
            }
            if (within > 0) { bbox.x.push(cat) }
            if (within === 2) { break }
          }
        }

        if (domainTypes.x === 'temporal') {
          bbox.minX = new Date(Math.min(a[0].getTime(), b[0].getTime()))
          bbox.maxX = new Date(Math.max(a[0].getTime(), b[0].getTime()))
        }

        if (domainTypes.y === 'quantitative') {
          bbox.minY = Math.min(a[1], b[1])
          bbox.maxY = Math.max(a[1], b[1])
        }

        if (domainTypes.y === 'categorical') {
          bbox.y = []
          let within = 0
          for (let cat of this.transformation.actualDomains.y) {
            if (cat === a[1] || cat === b[1]) {
              within++
            }
            if (within > 0) { bbox.y.push(cat) }
            if (within === 2) { break }
          }
        }

        if (domainTypes.y === 'temporal') {
          bbox.minX = new Date(Math.min(a[1].getTime(), b[1].getTime()))
          bbox.maxX = new Date(Math.max(a[1].getTime(), b[1].getTime()))
        }

        return bbox
      }
    },

    _getSelectionBounds (a, b) {
      if (a && b) {
        let type = this._select.type
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
      let type = this._select.type
      let selectionTool

      if (['rectangle', 'swipeX', 'swipeY'].includes(type)) {
        selectionTool = this.selectionManager.rectangle
      }

      if (type === 'polygon') {
        selectionTool = this.selectionManager.polygon
      }

      for (let key in selectionTool.screen) {
        selectionTool.screen[key] = null
      }
      for (let key in selectionTool.local) {
        selectionTool.local[key] = null
      }
      for (let key in selectionTool.scaled) {
        selectionTool.scaled[key] = null
      }
    },

    _inBBox (point, bbox) {
      return point[0] >= bbox.minX && point[0] <= bbox.maxX &&
        point[1] >= bbox.minY && point[1] <= bbox.maxY
    }
  },

  provide () {
    return { $$sectionParentChain: this.sectionParentChain }
  }
}
