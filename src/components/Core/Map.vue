<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'
import isSquareComponent from './utils/isSquareComponent.js'

import {
  calculateGridLayout,
  calculateRowsCols,
  updateGridComponents
} from './utils/grid.js'

import getRelevantOptions from './map/getRelevantOptions.js'
import { initMappingTree, extractMappings } from './map/mappingTree.js'
import mapRow from './map/mapRow.js'
import { createRenderOptions, renderMark } from './map/batchRenderer.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser, ScaleReceiver],

  inject: ['$$grid', '$$transform', '$$interactionManager', '$$sectionParentChain'],

  props: {
    unit: {
      type: String,
      default: 'row',
      validator: u => ['row', 'dataframe'].includes(u)
    }
  },

  data () {
    return {
      rowCache: {},
      firstRender: true,
      dataLength: null,
      markIDs: {}
    }
  },

  computed: {
    __update () {
      return this.parentBranch.updateCount
    },

    context () {
      return {
        ranges: this.parentBranch.domains,
        parentBranch: this.parentBranch,
        dataInterface: this.$$dataInterface,
        scaleManager: this.$$scaleManager
      }
    },

    sectionParentChain () {
      return JSON.stringify(this.$$sectionParentChain)
    },

    _renderContext () {
      return {
        $$transform: this.$$transform,
        $$coordinateTreeParent: this.$$coordinateTreeParent,
        $$coordinateTree: this.$$coordinateTree,
        parentBranch: this.parentBranch
      }
    },

    __interpolationNecessary () {
      return this.interpolationNecessary(this.$$coordinateTreeParent)
    }
  },

  beforeDestroy () {
    this.cleanupSpatialIndex()
  },

  methods: {
    mapRows (createElement) {
      let mappingTree = null

      let mappedElements = []

      let dataLength = this.$$dataInterface.getDataset().length
      if (this.dataLength !== dataLength) {
        if (!this.firstRender) {
          this.cleanupSpatialIndex()
        }

        this.firstRender = true
        this.dataLength = dataLength
      }

      if (this.lastUpdate !== this.__update) {
        this.rowCache = {}
        this.firstRender = true
      }

      if (this.firstRender) {
        this.lastUpdate = this.__update

        this.$$dataInterface.forEachRow(scope => {
          // // We create slotContent, an array of elements.
          // // For each row we might create one or more elements.
          let slotContent = this.$scopedSlots.default(scope)

          // We extract the 'relevant' parts: props, events, the tag name, etc
          let relevantOptions = getRelevantOptions(slotContent)

          let _temp = this.mapMarks(createElement, mappingTree, slotContent, scope.i)
          let mappedMarks = _temp.mappedMarks
          mappingTree = _temp.mappingTree

          mappedElements.push(...mappedMarks.filter(mark => mark !== undefined))
          this.cacheRow(scope.i, relevantOptions, mappedMarks)
        })
      }

      if (!this.firstRender) {
        this.$$dataInterface.forEachRow(scope => {
          // We create slotContent, an array of elements.
          // For each row we might create one or more elements.
          let slotContent = this.$scopedSlots.default(scope)

          // We extract the 'relevant' parts: props, events, the tag name, etc
          let relevantOptions = getRelevantOptions(slotContent)

          // Based on the 'relevant' parts, we check if anything changed
          let anythingChanged = this.anythingChanged(scope.i, relevantOptions)

          if (anythingChanged) {
            let _temp = this.mapMarks(createElement, mappingTree, slotContent, scope.i)
            let mappedMarks = _temp.mappedMarks
            mappingTree = _temp.mappingTree

            mappedElements.push(...mappedMarks)
            this.cacheRow(scope.i, relevantOptions, mappedMarks)
          }

          if (!anythingChanged) {
            let cachedMarks = this.getRowFromCache(scope.i)
            mappedElements.push(...cachedMarks)
          }
        })
      }

      this.firstRender = false

      return mappedElements
    },

    mapDataframe (createElement) {
      let mappingTree = null
      let dataframe = this.$$dataInterface.getDataset()
      let scope = { dataframe }

      let slotContent = this.$scopedSlots.default(scope)

      let mappedMarks = this.mapMarks(createElement, mappingTree, slotContent, 0).mappedMarks
      return mappedMarks
    },

    mapMarks (createElement, mappingTree, slotContent, i) {
      let context = this.context
      let rowUUID = `${this.uuid}_${i}`

      // The mapping tree caches scale definitions, so that we
      // don't need to rebuild the scale functions for every row
      if (mappingTree === null) { mappingTree = initMappingTree(slotContent) }
      mappingTree = extractMappings(mappingTree, slotContent, context)

      let mappedRow = mapRow(mappingTree, slotContent, i)

      let mappedMarks = []

      for (let j = 0; j < mappedRow.length; j++) {
        let element = mappedRow[j]
        let markID = `${rowUUID}_${j}`

        let renderOptions = createRenderOptions(
          element, this.__interpolationNecessary, this.$$interactionManager,
          markID, this.sectionParentChain
        )

        let tag = element ? element.componentOptions.tag : undefined

        let renderedMark = renderMark(
          tag, createElement, this._renderContext, renderOptions, element
        )

        this.markIDs[markID] = true

        mappedMarks.push(renderedMark)
      }

      return { mappedMarks, mappingTree }
    },

    validateComponents (elements) {
      let wrongUseError = new Error(`'vgg-grid' can have in its slot:
        1. any number of 'square' (with x1, x2, y1 and y2 props) components
        2. a single 'vgg-map' component that only contains other 'square' components
      `)

      elements = elements.filter(el => el.tag !== undefined)
      if (elements.some(c => !this.isSquareComponent(c))) {
        throw wrongUseError
      } else {
        return elements
      }
    },

    isSquareComponent,

    interpolationNecessary (id) {
      let currentLocation = this.$$coordinateTree.getBranch(id)
      if (currentLocation.type !== 'scale') { return true }

      while (currentLocation.parentID) {
        currentLocation = this.$$coordinateTree.getBranch(currentLocation.parentID)
        if (currentLocation.type !== 'scale') { return true }
      }

      return false
    },

    anythingChanged (i, rowOptions) {
      let cachedRow = this.rowCache[i]

      for (let j = 0; j < rowOptions.length; j++) {
        let elementOptions = rowOptions[j]
        let cachedElement = cachedRow[j]

        if (!this.match(elementOptions, cachedElement)) return true
      }

      return false
    },

    match (elementOptions, cachedElement) {
      if (!cachedElement && !elementOptions) return true
      if (!cachedElement && elementOptions) return false
      if (cachedElement && !elementOptions) return false

      if (cachedElement.tag !== elementOptions.tag) {
        return false
      }

      return cachedElement.props === JSON.stringify(elementOptions.props)
    },

    cacheRow (i, relevantRowOptions, marks) {
      this.rowCache[i] = this.rowCache[i] || {}

      for (let j = 0; j < relevantRowOptions.length; j++) {
        let elementOptions = relevantRowOptions[j]

        if (elementOptions) {
          this.rowCache[i][j] = {
            tag: elementOptions.tag,
            props: JSON.stringify(elementOptions.props),
            mark: marks[j]
          }
        } else {
          this.rowCache[i][j] = {}
        }
      }
    },

    getRowFromCache (i) {
      let cachedRow = this.rowCache[i]
      let marks = []
      for (let key in cachedRow) {
        marks.push(cachedRow[key].mark)
      }

      return marks
    },

    cleanupSpatialIndex () {
      for (let markID in this.markIDs) {
        this.$$interactionManager.removeItem(markID)
        delete this.markIDs[markID]
      }
    }
  },

  provide () {
    return { $$grid: false }
  },

  render (createElement) {
    let elements

    if (this.unit === 'row') {
      elements = this.mapRows(createElement)
    }

    if (this.unit === 'dataframe') {
      elements = this.mapDataframe(createElement)
    }

    elements = elements.filter(el => {
      return el !== undefined
    })

    if (this.$$grid !== false) {
      let squareComponents = this.validateComponents(elements)
      let options = this.$$grid

      let numberOfSquareComponents = squareComponents.length
      let { rows, cols } = calculateRowsCols(options, numberOfSquareComponents)
      let ranges = this.parentBranch.domains
      let start = this.$$grid.start
      let layout = calculateGridLayout(rows, cols, options, ranges, undefined, start)

      elements = updateGridComponents(squareComponents, layout)
    }

    return createElement('g', { class: 'map' }, elements)
  }
}
</script>
