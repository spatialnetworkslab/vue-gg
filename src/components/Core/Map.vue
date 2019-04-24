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

import { initMappingTree, extractMappings, mapRow } from './utils/mappings.js'

import { createRenderOptions, renderMark } from './utils/batchRenderer.js'

import getRelevantOptions from './map/getRelevantOptions.js'

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
      mappedElements: [],
      rowCache: {}
    }
  },

  computed: {
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

  methods: {
    // mapRows (createElement) {
    //   let mappings = null
    //   let context = this.context
    //
    //   let mappedElements = []
    //
    //   this.$$dataInterface.forEachRow(scope => {
    //     let rowUUID = `${this.uuid}_${scope.i}`
    //
    //     let slotContent = this.$scopedSlots.default(scope) || []
    //     slotContent = slotContent.filter(el => el.tag !== undefined)
    //
    //     if (slotContent.length > 0) {
    //       if (mappings === null) { mappings = initMappingTree(slotContent) }
    //       mappings = extractMappings(mappings, slotContent, context)
    //
    //       let mappedContent = mapRow(mappings, slotContent, scope.i)
    //
    //       let renderOptions = mappedContent.map((entry, i) => {
    //         return createRenderOptions(
    //           entry, this.__interpolationNecessary, this.$$interactionManager,
    //           `${rowUUID}_${i}`, this.sectionParentChain
    //         )
    //       })
    //       let tags = mappedContent.map(entry => entry ? entry.componentOptions.tag : undefined)
    //
    //       let renderedEntries = renderOptions.map((options, i) => {
    //         return renderMark(tags[i], createElement, this._renderContext, options, mappedContent[i])
    //       })
    //
    //       mappedElements.push(...renderedEntries)
    //     }
    //   })
    //
    //   return mappedElements
    // },

    mapRows (createElement) {
      let mappingTree = null
      let context = this.context

      this.$$dataInterface.forEachRow(scope => {
        let slotContent = this.$scopedSlots.default(scope)
        let relevantOptions = getRelevantOptions(slotContent)
        let changedIndices = this.getChangedIndices(scope.i, relevantOptions)

        if (changedIndices.length > 0) {
          if (mappingTree === null) { mappingTree = initMappingTree(slotContent) }
          mappingTree = extractMappings(mappingTree, slotContent, context)
        } else {
          // TODO
        }
      })
    },

    mapDataframe () {
      let context = this.context

      let dataframe = this.$$dataInterface.getDataset()
      let scope = { dataframe }

      let slotContent = this.$scopedSlots.default(scope) || []
      slotContent = slotContent.filter(el => el.tag !== undefined)

      if (slotContent.length > 0) {
        let mappings = initMappingTree(slotContent)
        mappings = extractMappings(mappings, slotContent, context)

        let mappedElements = mapRow(mappings, slotContent, 0)
        return mappedElements
      } else {
        return []
      }
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

    getChangedIndices (i, rowOptions) {
      let changedIndices = []
      this.rowCache[i] = this.rowCache[i] || []

      for (let j = 0; i < rowOptions.length; j++) {
        let elementOptions = rowOptions[j]

        // If there are sections in here, we will always tag them as dirty
        if (elementOptions.tag === 'vgg-section') {
          changedIndices.push(i)
          continue
        }

        // If this thing doesn't matched our cached version:
        // Tag as dirty
        if (!this.matchCache(i, j, elementOptions)) {
          changedIndices.push(i)
          this.cacheRow(i, j, elementOptions)
        }
      }

      return changedIndices
    },

    cacheRow (i, j, elementOptions) {
      this.rowCache[i][j] = {
        tag: elementOptions.tag,
        props: JSON.stringify(elementOptions.props)
      }
    },

    matchCache (i, j, elementOptions) {
      let cachedElement = this.rowCache[i][j]
      if (!cachedElement) { return false }

      if (cachedElement.tag !== elementOptions.tag) {
        return false
      }

      return cachedElement.props === JSON.stringify(elementOptions.props)
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
      elements = this.mapDataframe()
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
