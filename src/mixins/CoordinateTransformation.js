import CoordinateTransformation from '@/classes/CoordinateTransformation.js'
import CoordinateTreeUser from './CoordinateTreeUser.js'
import id from '@/utils/id.js'

export default {
  mixins: [CoordinateTreeUser],

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
    },

    _domains () {
      if (this.domains) { return this.domains }

      if (!this.domains) { return this.ranges }
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
    ranges: 'updateCoordinateTreeBranch'
  },

  methods: {
    setCoordinateTreeBranch () {
      let transformation = new CoordinateTransformation({
        type: this.type,
        domains: this._domains,
        ranges: this.ranges
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
        domains: this._domains,
        ranges: this.ranges
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
