import CoordinateTreeUser from './CoordinateTreeUser.js'
import DataReceiver from '@/mixins/DataReceiver.js'

import CoordinateTransformation from '@/classes/CoordinateTransformation.js'
import id from '@/utils/id.js'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

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
      if (this.domains) {
        let domains = {}

        let x = this.domains.x
        let y = this.domains.y

        if (x.constructor === Array) {
          domains.x = x
        }

        if (x.constructor === Function) {
          if (this.$$dataContainer) {
            let context = {
              domains: this.$$dataContainer.getDomains(),
              metadata: this.$$dataContainer.getMetadata()
            }

            domains.x = x(context)
          } else {
            throw new Error('Cannot set variable domain without data')
          }
        }

        if (y.constructor === Array) {
          domains.y = y
        }

        if (y.constructor === Function) {
          if (this.$$dataContainer) {
            let context = {
              domains: this.$$dataContainer.getDomains(),
              metadata: this.$$dataContainer.getMetadata()
            }

            domains.y = y(context)
          } else {
            throw new Error('Cannot set variable domain without data')
          }
        }

        return domains
      }

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
