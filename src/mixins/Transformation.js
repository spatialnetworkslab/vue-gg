import Transformation from '@/classes/Transformation.js'
import id from '@/utils/id.js'

export default {
  inject: ['$$coordinateTree', '$$coordinateTreeParent'],

  props: {
    type: {
      type: String,
      required: true
    },

    domains: {
      type: [Object, undefined],
      default: undefined
    },

    ranges: {
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
      let transformation = new Transformation({
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
      let transformation = new Transformation({
        type: this.type,
        domains: this.domains,
        ranges: this.ranges,
        transform: this.transform
      })

      this.$$coordinateTree.updateBranch(this.id, transformation)
    }
  },

  provide () {
    let $$transformation = this.$$coordinateTree.getTransformation(this.id)
    let $$coordinateTreeParent = this.id

    return { $$transformation, $$coordinateTreeParent }
  }
}
