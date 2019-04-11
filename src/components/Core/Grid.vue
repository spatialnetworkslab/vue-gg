<script>
import {
  calculateGridLayout,
  calculateRowsCols,
  validateGridOptions,
  updateGridComponents
} from './utils/grid.js'
import isSquareComponent from './utils/isSquareComponent.js'
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
    },
    start: {
      type: String,
      default: 'b',
      validator: s => ['b', 't'].includes(s)
    }
  },

  computed: {
    childType () {
      let children = this.$slots.default

      if (!children || children.length === 0) {
        return [undefined, undefined]
      }

      // Filter out undefined components (whitespace, v-if="false")
      let definedChildren = children.filter(c => c.tag !== undefined)

      let wrongUseError = new Error(`'vgg-grid' can have in its slot:
        1. any number of 'square' (with x1, x2, y1 and y2 props) components
        2. a single 'vgg-map' component that only contains other 'square' components
      `)

      if (definedChildren[0].componentOptions.tag === 'vgg-map') {
        if (definedChildren.length > 1) {
          throw wrongUseError
        }
        return 'map'
      }

      if (definedChildren.some(c => !this.isSquareComponent(c))) {
        throw wrongUseError
      } else {
        return 'square'
      }
    }
  },

  methods: {
    isSquareComponent
  },

  provide () {
    let childType = this.childType
    if (childType === 'map') {
      let $$grid = this._props
      return { $$grid }
    }
  },

  render (createElement) {
    let options = this._props
    validateGridOptions(options)

    // let [children, childType] = this.children
    let children = this.$slots.default.filter(c => c.tag !== undefined)
    let childType = 'square'

    if (children === undefined) {
      return createElement('g', { class: 'layout-grid' })
    }

    if (childType === 'square') {
      let squareComponents = children

      let numberOfSquareComponents = squareComponents.length
      let { rows, cols } = calculateRowsCols(options, numberOfSquareComponents)
      let ranges = this.parentBranch.domains
      let start = this.start
      let layout = calculateGridLayout(rows, cols, options, ranges, undefined, start)

      let newComponents = updateGridComponents(squareComponents, layout)

      return createElement('g', { class: 'layout-grid' }, newComponents)
    }

    if (childType === 'map') {
      return createElement('g', { class: 'layout-grid' }, children)
    }
  }
}</script>
