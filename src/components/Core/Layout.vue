<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import calculateGridLayout from '../../utils/calculateGridLayout.js'

import SectionWrapper from './SectionWrapper.vue'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  props: {
    type: {
      type: String,
      required: true,
      validator: t => ['grid', 'repeat', 'facet'].includes(t)
    },
    options: {
      type: Object,
      required: true
    }
  },

  methods: {
    validateChildren (children) {
      // Weird bug... not sure if it is in our library or in vue?
      // Bug is that sometimes some undefined elements end up in the default slot
      let definedChildren = children.filter(c => c.tag !== undefined)

      if (definedChildren.some(c => c.componentOptions.tag !== 'vgg-section')) {
        throw new Error('Only Sections allowed as direct children in layout')
      }

      return definedChildren
    },

    // GRID
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
      let newSection = createElement(SectionWrapper, { props }, slots)
      return newSection
    },

    mergeProps (coords, other) {
      for (let key in other) {
        if (!['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(key)) {
          coords[key] = other[key]
        }
      }

      return coords
    },

    // REPEAT
    calculateRepeatLayout (options) {
      this.validateRepeatOptions(options)

      let ranges = this.parentBranch.domains

      let cols = options.x ? options.x.length : 1
      let rows = options.y ? options.y.length : 1

      return calculateGridLayout(rows, cols, options, ranges)
    },

    validateRepeatOptions (options) {
      if (!(options.hasOwnProperty('x') || options.hasOwnProperty('y'))) {
        throw new Error(`Repeat layout must at least have 'x' or 'y' repeat specified`)
      }
      if (options.x && options.x.constructor !== Array) {
        throw new Error(`'x' must be an Array`)
      }
      if (options.y && options.y.constructor !== Array) {
        throw new Error(`'y' must be an Array`)
      }
    },

    createRepeatGroups (createElement, slot, options, layout) {
      let cols = options.x ? options.x.length : 1
      let rows = options.y ? options.y.length : 1

      let index = (i, j) => i * cols + j

      let groups = []

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let scopeProps = this.createScopeProps(options, i, j)
          let layoutProps = layout[index(i, j)]

          let slotContent = slot(scopeProps)
          slotContent = slotContent.constructor === Array ? slotContent : [slotContent]

          let newSections = slotContent.map(section => {
            return this.updateSection(createElement, section, layoutProps)
          })

          groups.push(createElement('g', { class: `repeat-${i}-${j}` }, newSections))
        }
      }

      return groups
    },

    createScopeProps (options, i, j) {
      let scopeProps = {}
      if (options.x) { scopeProps.x = options.x[j] }
      if (options.y) { scopeProps.y = options.y[i] }
      return scopeProps
    },

    // FACET
    calculateFacetLayout (options) {
      this.validateFacetOptions(options)

      if (!this.$$dataInterface.hasColumn('grouped')) {
        throw new Error('Faceting requires grouped data')
      }

      if (options.hasOwnProperty('x') || options.hasOwnProperty('y')) {
        // TODO
      } else {
        let numberOfCells = this.$$dataInterface.getLength()
        this.calculateGridLayout(options, numberOfCells)
      }
    },

    validateFacetOptions (options) {
      if (options.hasOwnProperty('cells')) {
        if (options.hasOwnProperty('x') || options.hasOwnProperty('y')) {
          throw new Error(`Cannot combine 'cells' and 'x' or 'y' options`)
        }
      } else {
        if (!(options.hasOwnProperty('x') || options.hasOwnProperty('y'))) {
          throw new Error(`Missing required layout options'`)
        }
      }
    },

    createFacetGroups (createElement, slot, options, layout) {
      let groups = []
      this.$$dataInterface.forEachRow((row, i, prevRow, nextRow) => {
        let scopeProps = { row, i, prevRow, nextRow }
        let layoutProps = layout[i]

        let slotContent = slot(scopeProps)
        slotContent = slotContent.constructor === Array ? slotContent : [slotContent]

        let newSections = slotContent.map(section => {
          return this.updateSection(createElement, section, layoutProps)
        })

        groups.push(createElement('g', { class: `facet-${i}` }, newSections))
      })

      return groups
    }
  },

  render (createElement) {
    if (this.type === 'grid') {
      let children = this.$slots.default
      let validChildren = this.validateChildren(children)

      let numberOfChildren = validChildren.length
      let layout = this.calculateGridLayout(this.options, numberOfChildren)
      let sections = this.updateGridSections(createElement, validChildren, layout)

      return createElement('g', { class: 'layout-grid' }, sections)
    }

    if (this.type === 'repeat') {
      let children = this.$scopedSlots.default({})
      children = children.constructor === Array ? children : [children]

      this.validateChildren(children)

      let layout = this.calculateRepeatLayout(this.options)
      let sections = this.createRepeatGroups(
        createElement, this.$scopedSlots.default, this.options, layout
      )

      return createElement('g', { class: 'layout-repeat' }, sections)
    }

    if (this.type === 'facet') {
      let children = this.$scopedSlots.default({})
      children = children.constructor === Array ? children : [children]

      this.validateChildren(children)

      let layout = this.calculateFacetLayout(this.options)
      let sections = this.createFacetGroups(
        createElement, this.$scopedSlots.default, this.options, layout
      )
    }
  },

  provide () {
    return { $$map: false }
  }
}
</script>
