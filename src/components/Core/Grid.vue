<script>
import { calculateGridLayout } from './utils/grid.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import Section from './Section.vue'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  props: {
    options: {
      type: Object,
      required: true
    }
  },

  methods: {
    validateChildren (children) {
      // Filter out undefined components (whitespace, v-if="false")
      let definedChildren = children.filter(c => c.tag !== undefined)

      if (definedChildren.some(c => c.componentOptions.tag !== 'vgg-section')) {
        throw new Error('Only Sections allowed as direct children in layout')
      }

      return definedChildren
    },

    calculateGridLayout (options, numberOfCells) {
      this.validateGridOptions(options)
      let ranges = this.parentBranch.domains

      let rows
      let cols

      if (options.cols) {
        rows = Math.ceil(numberOfCells / options.cols)
        cols = options.cols
      }

      if (options.rows) {
        rows = options.rows
        cols = Math.ceil(numberOfCells / options.rows)
      }

      return calculateGridLayout(rows, cols, options, ranges)
    },

    validateGridOptions (options) {
      let hasRows = options.hasOwnProperty('rows')
      let hasCols = options.hasOwnProperty('cols')
      if (hasRows && hasCols) { throw new Error('Cannot have both rows and cols') }
      if (!hasRows && !hasCols) {
        throw new Error('Layout must have either rows or cols specified')
      }
      if (hasCols && options.cols < 1) { throw new Error('Cols must be higher than 0') }
      if (hasRows && options.rows < 1) { throw new Error('Rows must be higher than 0') }
    },

    updateGridSections (createElement, sections, gridLayout) {
      let newSections = []
      for (let i = 0; i < sections.length; i++) {
        let section = sections[i]
        let layout = gridLayout[i]
        newSections.push(this.updateSection(createElement, section, layout))
      }

      return newSections
    },

    updateSection (createElement, section, layout) {
      let props = this.mergeProps(layout, section.componentOptions.propsData)
      let slots = section.componentOptions.children
      let newSection = createElement(Section, { props }, slots)
      return newSection
    },

    mergeProps (coords, other) {
      for (let key in other) {
        if (!['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(key)) {
          coords[key] = other[key]
        }
      }

      return coords
    }
  },

  render (createElement) {
    let slotContent = this.$slots.default
    let sections = this.validateChildren(slotContent)

    let numberOfSections = sections.length
    let layout = this.calculateGridLayout(this.options, numberOfSections)

    let newSections = this.updateGridSections(createElement, sections, layout)

    return createElement('g', { class: 'layout-grid' }, newSections)
  }
}
</script>
