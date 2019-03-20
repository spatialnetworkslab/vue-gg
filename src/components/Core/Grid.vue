<script>
import {
  calculateGridLayout,
  calculateRowsCols,
  validateGridOptions,
  updateGridSections
} from './utils/grid.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  props: {
    rows: {
      type: [Number, undefined],
      default: undefined
    },
    cols: {
      type: [Number, undefined],
      default: undefined
    },
    layoutPadding: {
      type: [Number, Object],
      default: 0
    },
    cellPadding: {
      type: [Number, Object],
      default: 0
    }
  },

  methods: {
    getSlotContent () {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default()
      } else if (this.$slots.default) {
        return this.$slots.default
      } else {
        return []
      }
    },

    children (slotContent) {
      // Filter out undefined components (whitespace, v-if="false")
      let definedChildren = slotContent.filter(c => c.tag !== undefined)

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

  provide () {
    let slotContent = this.getSlotContent()
    let [, childType] = this.children(slotContent)
    if (childType === 'map') {
      let $$grid = this._props
      return { $$grid }
    }
  },

  render (createElement) {
    let options = this._props
    validateGridOptions(options)

    let slotContent = this.getSlotContent()
    let [children, childType] = this.children(slotContent)

    if (childType === 'section') {
      let sections = children

      let numberOfSections = sections.length
      let { rows, cols } = calculateRowsCols(options, numberOfSections)
      let ranges = this.parentBranch.domains
      let layout = calculateGridLayout(rows, cols, options, ranges)

      let newSections = updateGridSections(createElement, sections, layout)

      return createElement('g', { class: 'layout-grid' }, newSections)
    }

    if (childType === 'map') {
      return createElement('g', { class: 'layout-grid' }, children)
    }
  }
}
</script>
