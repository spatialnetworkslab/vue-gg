import CoordinateTree from '@/classes/CoordinateTree.js'
import Transformation from '@/classes/Transformation.js'

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

  mounted () {
    this.setCoordinateTreeRoot()
    this.ready = true
  },

  methods: {
    setCoordinateTreeRoot () {
      let domains = {
        x: [0, this.width],
        y: [0, this.height]
      }

      let ranges = {
        x: [0, this.width],
        y: [0, this.height]
      }

      if (this.flip) {
        ranges.y = [this.height, 0]
      }

      let transformation = new Transformation({
        type: 'stretch',
        domains,
        ranges
      })

      this.coordinateTree.setRoot(transformation)
    }
  },

  provide () {
    let $$coordinateTree = this.coordinateTree
    let $$transformation = this.coordinateTree.getTransformation('root')
    let $$coordinateTreeParent = 'root'

    return { $$coordinateTree, $$transformation, $$coordinateTreeParent }
  }
}
