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
      default: undefined
    },

    direction: {
      type: String,
      default: 'vertical',
      validator: function (value) {
        return ['vertical', 'horizontal'].indexOf(value) !== -1
      }
    },

    titlePosition: {
      type: String,
      default: 'center',
      validator: function (value) {
        return ['left', 'right', 'top', 'bottom', 'tl', 'tr', 'bl', 'br', 'center'].indexOf(value) !== -1
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
      default: function (value) { if (this.direction === "vertical") { return 60 } else { return 280 }}
    },

    height:{
      type: Number,
      default: function (value) { if (this.direction === "horizontal") { return 60 } else { return 280}}
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
      default: 14
    },

    fill: {
      type: [Array, Object, String],
      default: '#8FD8D8'
    },

    labelPadding: {
      type: Number,
      default: 0
    },

    titlePadding: {
      type: Number,
      default: 0
    },

    columnPadding: {
      type: Number,
      default: 0
    },

    rowPadding: {
      type: Number,
      default: 0
    },

    x: {
      type: [Number, Object, Array],
      default: undefined,
    },

    y: {
      type: [Number, Object, Array],
      default: undefined,
    },

    tickMinStep: {
      type: Number,
      default: undefined
    },

    labelOpacity:{
      type: Number,
      default: undefined
    },

    titleOpacity: {
      type: Number,
      default: undefined
    },

    titleFontColor: {
      type: String,
      default: 'black'
    },

    strokeOpacity: {
      type: [Number, Object, Array],
      default: undefined,
    },

    fillOpacity: {
      type: [Number, Object, Array],
      default: undefined,
    }

    //rowPadding
    //fillColor = background color
    //titleAnchor
    //titleColor
    //titleFont
    //titleFontSize
    //titleOrient
    //fill: {},
    //offset: {},
    //padding: {},
    //strokeColor: {},
    //strokeWidth: {},
    //values: {},
    //zindex: {}
    //ordering legends
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
      return this.coordinateSpecification
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

    titleX () {
      let p = this.titlePosition
      if (p === 'right' || p === "tr" || p === "br") {
        return 100
      } else if (p === 'left' || p === "tl" || p === "bl") {
        return 0
      } else {
        return 50
      }
    },

    titleY () {
      let p = this.titlePosition
      if (p === 'tr' || p === "tl" || p === "right" || p === "left") {
        return 100
      } else if (p === "bl" || p === "br") {
        return 0
      } else {
        if (this.direction === "horizontal") {
          return 105
        } else {
          return 100
        }
      }
    },

    legendLeft () {
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'right' || p === "tr" || p === "br" || p === "cr") {
          return (this.plotWidth - this.width) * 0.98
        } else {
          return this.plotWidth * 0.01
        }
      } else {
        return this.x
      }
    },

    legendTop () {
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'top' || p === "tl" || p === "tr") {
          return (this.height - this.plotHeight) * 0.9
        } else if (p === 'bottom' || p === "bl" || p === "br") {
          return 0
        } else {
          return -this.plotHeight * 0.45
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
          console.warn('Ignoring labels value ' + labels + ' as it is a string input. Using domain ' + this._domain + ' given in scale input')
          let variableType = this._domainType
          let variableData = this._domain
          if (variableType === 'nominal') {
            return variableData
          } else {
            return this.getNumericLabels(variableData, variableType)
          }
        }
      } else {
        let variableType = this._domainType
        let variableData = this._domain
        if (variableType === 'nominal') {
          return variableData
        } else {
          return this.getNumericLabels(variableData, variableType)
        }
      }
    },

    segmentHeight () {
      return 100 / this.tickCount
    },

    sectionWidth () {
      return this.width
    },

    sectionHeight () {
      return this.height
    },

    positionElements() {
      if (this.type === 'discrete' || this.type === 'gradient') {
        let rectangle, label, title
        console.log(this.type)
        if (this.direction === "vertical") {
          title = this.titleX
          if (!this.flipNumbers) {
            rectangle = { x1: 0,  x2: 75, y1: 0, y2: 100 }
            label = 90 + this.labelPadding
          } else {
            rectangle = { x1: 25,  x2: 100, y1: 0, y2: 100}
            label = 10 - this.labelPadding
          }
        } else {
          title = 55
          if (!this.flipNumbers) {
            rectangle = { x1: 0,  x2: 100, y1: 25,  y2: 95 }
            label = 10 - this.labelPadding
          } else {
            rectangle = { x1: 0,  x2: 100, y1: 0,  y2: 70}
            label = 80 + this.labelPadding
          }
        }
        return { rectangle, label, title }
      } else if (this.type === 'symbol') {
        if (this.direction === "vertical") {
          let multilineX, symbolX, labelX
          if (!this.flipNumbers) {
            multilineX = [0.25 - this.symbolPadding, 0.55 - this.symbolPadding]
            symbolX = 0.3 - this.symbolPadding
            labelX = 0.8 + this.labelPadding
          } else {
            multilineX = [0.6 + this.symbolPadding, 0.9 + this.symbolPadding]
            symbolX = 0.7 + this.symbolPadding
            labelX = 0.3 - this.labelPadding
          }
          return { multilineX, symbolX, labelX }
        } else {
          let multilineY, symbolY, labelY
          if (!this.flipNumbers) {
            multilineY = [0.6 + this.symbolPadding, 0.6 + this.symbolPadding]
            symbolY = 0.6 + this.symbolPadding
            labelY = 0.3 - this.labelPadding
          } else {
            multilineY = [0.5 - this.symbolPadding, 0.5 - this.symbolPadding]
            symbolY = 0.35 - this.symbolPadding
            labelY = 0.7 + this.labelPadding
          }
          return { multilineY, symbolY, labelY }
        }
      }
    },

    //
    // colors () {
    //   let ticks = this.tickCount
    //   let colors = []
    //   for (let i = 0; i < ticks - 1; i++) {
    //     let color = this.colorScale(i)
    //     colors.push(color)
    //   }
    //
    //   return colors
    // }
  },

  mounted () {
  },

  beforeDestroy () {},

  methods: {
    round (value, n) {
      return Math.floor(value/n) * n
    },

    // expand this for categorical, time data too
    getNumericLabels (dataDomain, variableType) {
      if (variableType === 'count') { dataDomain[0] = 0 }
      let interval = this.tickMinStep ? (dataDomain[1] - dataDomain[0]) / (this.tickCount - 1) < this.tickMinStep ? this.tickMinStep : (dataDomain[1] - dataDomain[0]) / (this.tickCount - 1) : (dataDomain[1] - dataDomain[0]) / (this.tickCount - 1)
      let ticks = []

      for (let i = 0; i < this.tickCount; i++) {
        let value = Math.floor(dataDomain[0] + i * interval)

        if (interval >= 10) {
          if (dataDomain[0] === 0) {
            value = this.round(value, 10)
          } else {
            value = this.round(value, 1)
          }
        }

        ticks.push(value)
      }

      return ticks
    },

    generateColorScale (prop, colorBasis) {
      let color = colorBasis ? colorBasis : this.stroke

      if (color.constructor === Array) {
        return (index) => {return color[index]}
      } else {
        let scaleOptions = {
          aestheticType: prop,
          domain: this._parsedScalingOptions[0],
          domainMid: (this._parsedScalingOptions[0][0] + this._parsedScalingOptions[0][1])/2,
          scaleArgs: [[0, this.tickCount]],
          type: color.type
        }

        let scalingFunction = createScale(prop, this.$$dataInterface, scaleOptions)
        return scalingFunction
      }
    }

  }
}
