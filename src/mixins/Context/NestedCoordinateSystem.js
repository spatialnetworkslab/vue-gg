import * as d3 from 'd3'
import id from '@/utils/id.js'

export default {
  inject: ['$$context', '$coordinateSystemParent'],

  props: {
    system: {
      type: String,
      required: false,
      default: 'cartesian'
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
    _ranges () {
      return {
        x: [this.x, this.x2],
        y: [this.y, this.y2]
      }
    },

    _domains () {
      if (!this.domains) {
        return this._ranges
      }

      return {
        x: [this.domains.x, this.domains.x2],
        y: [this.domains.y, this.domains.y2]
      }
    },

    transform () {
      if (this.system === 'cartesian') {
        let scaleX = d3.scaleLinear().domain(this._domains.x).range(this._ranges.x)
        let scaleY = d3.scaleLinear().domain(this._domains.y).range(this._ranges.y)

        return ([x, y]) => {
          return [scaleX(x), scaleY(y)]
        }
      }

      if (this.system === 'polar') {
        let deltaDomainX = this._domains.x[1] - this._domains.x[0]
        let deltaDomainY = this._domains.y[1] - this._domains.y[0]

        let mirrorDomainX = [-deltaDomainX, deltaDomainX]
        let mirrorDomainY = [-deltaDomainY, deltaDomainY]

        let scaleX = d3.scaleLinear().domain(mirrorDomainX).range(this._ranges.x)
        let scaleY = d3.scaleLinear().domain(mirrorDomainY).range(this._ranges.y)

        return ([x, y]) => {
          let polar = this.dataToPolar([x, y])
          let cartesian = this.polarToCartesian(polar)

          return [scaleX(cartesian[0]), scaleY(cartesian[1])]
        }
      }
    }
  },

  beforeDestroy () {
    this.$$context.coordinateSystem.removeBranch(this.id)
  },

  mounted () {
    this._setCoordinateSystem()
    this.ready = true
  },

  watch: {
    system: '_updateCoordinateSystem',
    _domains: '_updateCoordinateSystem',
    _ranges: '_updateCoordinateSystem',
    transform: '_updateCoordinateSystem'
  },

  methods: {
    _setCoordinateSystem () {
      this.$$context.coordinateSystem.addBranch(this.id, this.$coordinateSystemParent, {
        system: this.system,
        domains: this._domains,
        ranges: this._ranges,
        transform: this.transform
      })
    },

    _updateCoordinateSystem () {
      this.$$context.coordinateSystem.updateBranch(this.id, {
        system: this.system,
        domains: this._domains,
        ranges: this._ranges,
        transform: this.transform
      })
    },

    dataToPolar ([x, y]) {
      let r = x
      let thetaFunc = d3.scaleLinear().domain(this._domains.y).range([0, 2 * Math.PI])
      let theta = thetaFunc(y)

      return [r, theta]
    },

    polarToCartesian ([r, theta]) {
      let x = r * Math.sin(theta)
      let y = r * Math.cos(theta)

      return [x, y]
    }
  },

  provide () {
    let $coordinateSystemParent = this.id
    return { $coordinateSystemParent }
  }
}
