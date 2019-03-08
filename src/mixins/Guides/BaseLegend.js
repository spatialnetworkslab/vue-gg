import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import createScale from '@/scales/createScale.js'
import defaultFormat from './defaultFormat.js'

export default {
  mixins: [Rectangular, DataReceiver],

  props: {
    title: {
      type: String,
      default: 'Legend'
    },

    scale: {
      type: [Array, String, Object, undefined],
      default: undefined,
      required: true
    },

    flip: {
      type: Boolean,
      default: false
    },

    flipNumbers: {
      type: Boolean,
      default: false
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
      default: 'left',
      validator: function (value) {
        return ['left', 'right', 'top', 'bottom', 'tl', 'tr', 'bl', 'br', 'cr', 'cl'].indexOf(value) !== -1
      }
    },

    width: {
      type: Number,
      default: 60
    },

    height:{
      type: Number,
      default: 260
    },

    tickCount: {
      type: Number,
      default: 6
    },

    fontSize: {
      type: Number,
      default: 12
    },

    titleFontSize: {
      type: Number,
      default: 16
    },

    color: {
      type: [String, Object, Array],
      default: '#8FD8D8',
    },

    labelPadding: {
      type: Number,
      default: 5
    },

    x: {
      type: [Number, Object, Array],
      default: undefined,
    },

    y: {
      type: [Number, Object, Array],
      default: undefined,
    }

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
      return parseScaleOptions(this.scale, this.$$dataInterface, this.$$scaleManager)
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

    _parentNodes () {
      return this.getParents(this.parentBranch, [this.parentBranch])
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
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'right' || p === "tr" || p === "br" || p === "cr") {
          if (this.orient === "vertical") {
            return this.plotWidth - this.width
          } else {
            return this.plotWidth - this.height
          }
        } else {
          return 0
        }
      } else {
        return this.x
      }
    },

    legendTop () {
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'top' || p === "tl" || p === "tr") {
          if (this.orient === "vertical"){
            return this.height - this.plotHeight * 0.95
          } else {
            return this.width - this.plotHeight + this.plotMargin
          }
        } else if (p === 'bottom' || p === "bl" || p === "br") {
          return 0
        } else {
          return -this.plotHeight * 0.4
        }
      } else {
        if (this.position && this.position != 'left'){
          console.warn("Ignoring position value ``" + this.position + "` because of `x` and `y` inputs")
        }
        return this.y * -1
      }
    },

    legendLabels () {
      let labels = this.labels
      if (labels) {
        if (labels.constructor === Array) {
          return labels
        } else {
          let variableType = this._domainType
          let variableData = this._domain
          if (variableType === 'nominal') {
            return variableData
          } else {
            return this.getNumericLabels(variableData, variableType)
          }
        }
      }
    },

    colorScale () {
      let color = this.color

      if (color.constructor === Array) {
        return (index) => {return color[index]}
      } else {
        let scaleOptions = {
          aestheticType: 'color',
          domain: this._parsedScalingOptions[0],
          domainMid: (this._parsedScalingOptions[0][0] + this._parsedScalingOptions[0][1])/2,
          scaleArgs: [[0, this.tickCount]],
          type: this.color.type
        }

        let scalingFunction = createScale('color', this.$$dataInterface, scaleOptions)
        return scalingFunction
      }
    },

    segmentHeight () {
      return 100 / this.tickCount
    },

    colors () {
      let ticks = this.tickCount
      let colors = []
      for (let i = 0; i < ticks - 1; i++) {
        let color = this.colorScale(i)
        colors.push(color)
      }

      return colors
    }

  },

  beforeDestroy () {},

  methods: {
    round (value, n) {
      return Math.floor(value/n) * n
    },

    // expand this for categorical, time data too
    getNumericLabels (dataDomain, variableType) {
      if (variableType === 'count') { dataDomain[0] = 0 }

      let interval = (dataDomain[1] - dataDomain[0]) / (this.tickCount - 1)

      let ticks = []

      for (let i = 0; i < this.tickCount; i++) {
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
