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
    }
  },

  methods: {
    mapRows () {
      let mappings = null
      let context = this.context

      let mappedElements = []

      this.$$dataInterface.forEachRow(scope => {
        let slotContent = this.$scopedSlots.default(scope) || []
        slotContent = slotContent.filter(el => el.tag !== undefined)

        if (slotContent.length > 0) {
          if (mappings === null) { mappings = initMappingTree(slotContent) }
          mappings = extractMappings(mappings, slotContent, context)

          let mappedContent = mapRow(mappings, slotContent, scope.i)
          console.log(mappedContent)
          mappedElements.push(...mappedContent)
        }
      })

      return mappedElements
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

    isSquareComponent
  },

  provide () {
    return { $$grid: false }
  },

  render (createElement) {
    let elements

    if (this.unit === 'row') {
      elements = this.mapRows()
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
