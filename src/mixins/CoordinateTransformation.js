import CoordinateTransformation from '@/classes/CoordinateTransformation.js'
import id from '@/utils/id.js'

export default {
  inject: ['$$coordinateTree', '$$coordinateTreeParent'],

  props: {
    type: {
      type: String,
      default: 'linear'
    },

    x: {
      type: Number,
      required: true
    },

    x2: {
      type: Number,
      required: true
    },

    y: {
      type: Number,
      required: true
    },

    y2: {
      type: Number,
      required: true
    },

    domains: {
      type: [Object, undefined],
      default: undefined
    },

    transform: {
      type: [Function, undefined],
      default: undefined
    }
  },

  data () {
    return {
      ready: false,
      id: id()
    }
  },

  computed: {
    ranges () {
      return {
        x: [this.x, this.x2],
        y: [this.y, this.y2]
      }
    }
  },

  beforeDestroy () {
    this.$$coordinateTree.removeBranch(this.id)
  },

  mounted () {
    this.setCoordinateTreeBranch()
    this.ready = true
  },

  watch: {
    type: 'updateCoordinateTreeBranch',
    domains: 'updateCoordinateTreeBranch',
    ranges: 'updateCoordinateTreeBranch',
    transform: 'updateCoordinateTreeBranch'
  },

  methods: {
    setCoordinateTreeBranch () {
      let transformation = new CoordinateTransformation({
        type: this.type,
        domains: this.domains,
        ranges: this.ranges,
        transform: this.transform
      })

      this.$$coordinateTree.addBranch(
        this.id,
        this.$$coordinateTreeParent,
        transformation
      )
    },

    updateCoordinateTreeBranch () {
      let transformation = new CoordinateTransformation({
        type: this.type,
        domains: this.domains,
        ranges: this.ranges,
        transform: this.transform
      })

      this.$$coordinateTree.updateBranch(this.id, transformation)
    }
  },

  provide () {
    let $$transform = this.$$coordinateTree.getTotalTransformation(this.id)
    let $$coordinateTreeParent = this.id

    return { $$transform, $$coordinateTreeParent }
  }
}
