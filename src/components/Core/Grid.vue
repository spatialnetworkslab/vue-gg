<script>
import { calculateGridLayout, calculateRowsCols, validateGridOptions } from './utils/grid.js'
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

  computed: {
    children () {
      let children = this.$slots.default

      // Filter out undefined components (whitespace, v-if="false")
      let definedChildren = children.filter(c => c.tag !== undefined)

      let wrongUseError = new Error(`'vgg-grid' can have in its slot:
        1. any number of 'vgg-section' components
        2. a single 'vgg-map' component that only contains other 'vgg-section' components
      `)

      if (definedChildren[0].componentOptions.tag === 'vgg-map') {
        if (definedChildren.length > 1) {
          throw wrongUseError
        }
        return [definedChildren, 'map']
      }

      if (definedChildren.some(c => c.componentOptions.tag !== 'vgg-section')) {
        throw wrongUseError
      } else {
        return [definedChildren, 'section']
      }
    }
  },

  methods: {
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

  provide () {
    let [, childType] = this.children
    if (childType === 'map') {
      let $$grid = this.options
      return { $$grid }
    }
  },

  render (createElement) {
    let options = this.options
    validateGridOptions(options)

    let [children, childType] = this.children

    if (childType === 'section') {
      let sections = children

      let numberOfSections = sections.length
      let { rows, cols } = calculateRowsCols(options, numberOfSections)
      let ranges = this.parentBranch.domains
      let layout = calculateGridLayout(rows, cols, options, ranges)

      let newSections = this.updateGridSections(createElement, sections, layout)

      return createElement('g', { class: 'layout-grid' }, newSections)
    }

    if (childType === 'map') {
      return createElement('g', { class: 'layout-grid' }, children)
    }
  }
}
</script>
