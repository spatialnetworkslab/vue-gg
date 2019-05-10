import CoordinateTree from '../classes/CoordinateTree/CoordinateTree.js'
import CoordinateTransformation from '../classes/CoordinateTree/CoordinateTransformation.js'

export default {
  props: {
    width: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true
    },

    flip: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      ready: false,
      coordinateTree: new CoordinateTree()
    }
  },

  computed: {
    ranges () {
      return {
        x: [0, this.width],
        y: [0, this.height]
      }
    }
  },

  mounted () {
    this.setCoordinateTreeRoot()
    this.ready = true
  },

  methods: {
    setCoordinateTreeRoot () {
      let domains = this.ranges
      let ranges = JSON.parse(JSON.stringify(this.ranges))

      if (this.flip) {
        ranges.y = [this.height, 0]
      }

      let transformation = new CoordinateTransformation({
        type: 'scale',
        scales: domains,
        ranges
      })

      this.coordinateTree.setRoot(transformation)
    }
  },

  provide () {
    let $$coordinateTree = this.coordinateTree
    let $$transform = this.coordinateTree.getTotalTransformation('root')
    let $$coordinateTreeParent = 'root'

    return { $$coordinateTree, $$transform, $$coordinateTreeParent }
  }
}
