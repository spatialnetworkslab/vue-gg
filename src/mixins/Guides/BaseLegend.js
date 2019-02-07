import Rectangular from '../../mixins/Marks/Rectangular.js'
import parseScaleSpecification from '../../utils/parseScaleSpecification.js'

export default {
  mixins: [Rectangular],

  props: {
    name: {
      type: String,
      default: 'Legend'
    },

    type: {
      type: String,
      default: 'gradient',
      validator: function (value) {
        return ['gradient', 'discrete', 'symbol'].indexOf(value) !== -1
      }
    },

    labels: {
      type: [Object, Array, String],
      required: true,
    },

    orient: {
      type: String,
      default: 'vertical',
      validator: function (value) {
        return ['vertical', 'horizontal'].indexOf(value) !== -1
      }
    },

    position: {
      type: String,
      default: 'right',
      validator: function (value) {
        return ['left', 'right', 'top', 'bottom', 'tl', 'tr', 'bl', 'br'].indexOf(value) !== -1
      }
    },

    width: {
      type: Number,
      default: 80
    },

    height:{
      type: Number,
      default: 250
    },

    numTicks: {
      type: Number,
      default: 6
    },

    flip: {
      type: Boolean,
      default: false
    },

    //direction: {},
    //fill: {},
    //offset: {},
    //padding: {},
    //strokeColor: {},
    //strokeWidth: {},
    //tickCount: {},
    //values: {},
    //zindex: {}
  },
  computed: {
    _parsedScalingOptions () {
      let variableDomains
      if (this.$$dataContainer) {
        variableDomains = this.$$dataContainer.getDomains()
      }

      return parseScaleSpecification(this.scale, variableDomains)
    },

    _domain () {
      return this._parsedScalingOptions[0]
    },

    _domainType () {
      return this._parsedScalingOptions[1]
    },

    _scalingOptions () {
      return this._parsedScalingOptions[2]
    },

    ranges () {
      return this.convertCoordinateSpecification(this.aesthetics)
    },

    plotWidth () {
      return (this.parentBranch.ranges.x[1] - this.parentBranch.ranges.x[0])
    },

    plotHeight () {
      return (this.parentBranch.ranges.y[0] - this.parentBranch.ranges.y[1])
    },

    plotMargin () {
      return 40
    },

    legendLeft () {
      console.log(this.legendTop, this.plotWidth - this.width, this.plotWidth, this.width)
      let p = this.position
      if (p === 'right' || p === "tr" || p === "br" ) {
        return this.plotWidth - this.width
      } else if (p === 'left' || p === "tl" || p === "bl" || p === "top") {
        return 0
      } else {
        return this.plotMargin
      }
    },

    legendRight () {
      let p = this.position
      if (p === 'right') {
        return this.plotWidth - this.plotMargin
      } else if (p === 'left') {
        return this.width
      } else {
        return this.plotMargin + this.width
      }
    },

    legendTop () {
      console.log(this.position, this.plotHeight, this.height)
      let p = this.position
      if (p === 'top' || p === "tl" || p === "tr") {
        return this.height - this.plotHeight + this.plotMargin
      } else if (p === 'bottom' || p === "bl" || p === "br") {
        return 0
      } else {
        return this.plotMargin
      }
    },

    legendLabels () {
      let labels = this.labels
      if (labels) {
        if (labels.constructor === Array) {
          return labels
        } else {
          let variableData = this.$$dataContainer._dataset[labels]
          let variableType = this.$$dataContainer._types[labels]
          if (variableType === 'nominal') {
            return variableData
          } else {
            return this.getNumericLabels()
          }
        }
      }
    }
  },

  beforeDestroy () {},

  methods: {
    round (value, n) {
      return Math.floor(value/n) * n
    },

    getNumericLabels () {
      let dataDomain = this.$$dataContainer._domains[this.labels]
      let variableType = this.$$dataContainer._types[this.labels]
      if (variableType === 'count') { dataDomain[0] = 0 }

      let interval = (dataDomain[1] - dataDomain[0]) / (this.numTicks - 1)

      let ticks = []

      for (let i = 0; i < this.numTicks; i++) {
        let value = Math.floor(dataDomain[0] + i * interval)

        if (interval <= 10) {
          value = value
        } else {
          value = this.round(value, 10)
        }

        ticks.push(value)
      }

      return ticks
    },
  }
}
