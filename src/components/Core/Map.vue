<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import {
  calculateGridLayout,
  calculateRowsCols,
  updateGridSections
} from './utils/grid.js'

import { initMappingTree, extractMappings, mapRow } from './utils/mappings.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser, ScaleReceiver],

  inject: ['$$grid'],

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
    }
  },

  methods: {
    mapRows () {
      let mappings = null
      let context = this.context

      let mappedElements = []

      this.$$dataInterface.forEachRow(scope => {
        let slotContent = this.$scopedSlots.default(scope)

        if (mappings === null) { mappings = initMappingTree(slotContent) }
        mappings = extractMappings(mappings, slotContent, context)

        let mappedContent = mapRow(mappings, slotContent, scope.i)
        mappedElements.push(...mappedContent)
      })

      return mappedElements
    },

    mapDataframe () {
      let context = this.context

      let dataframe = this.$$dataInterface.getDataset()
      let scope = { dataframe }

      let slotContent = this.$scopedSlots.default(scope)

      let mappings = initMappingTree(slotContent)
      mappings = extractMappings(mappings, slotContent, context)

      let mappedElements = mapRow(mappings, slotContent, 0)
      return mappedElements
    },

    validateSections (elements) {
      elements = elements.filter(el => el.tag !== undefined)
      if (!elements.every(el => el.componentOptions.tag === 'vgg-section')) {
        throw new Error(`'vgg-grid' can have in its slot:
          1. any number of 'vgg-section' components
          2. a single 'vgg-map' component that only contains other 'vgg-section' components
        `)
      }
      return elements
    }
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
      let sections = this.validateSections(elements)
      let options = this.$$grid

      let numberOfSections = sections.length
      let { rows, cols } = calculateRowsCols(options, numberOfSections)
      let ranges = this.parentBranch.domains
      let start = this.$$grid.start
      let layout = calculateGridLayout(rows, cols, options, ranges, undefined, start)

      elements = updateGridSections(createElement, sections, layout)
    }

    return createElement('g', { class: 'map' }, elements)
  }
}
</script>
