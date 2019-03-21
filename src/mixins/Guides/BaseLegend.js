// import { ticks as arrayTicks } from 'd3-array'
// import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import createScale from '@/scales/createScale.js'
import defaultFormat from './utils/defaultFormat.js'
// import ticksFromIntervals from './utils/ticksFromIntervals.js'

export default {
  mixins: [Rectangular, DataReceiver, ScaleReceiver],

  props: {
    title: {
      type: String,
      default: ''
    },

    titleAnchorPoint: {
      type: String,
      default: 'center',
      validator: function (value) {
        return ['left', 'right', 'top', 'bottom', 'tl', 'tr', 'bl', 'br', 'center'].indexOf(value) !== -1
      }
    },

    titleFontSize: {
      type: Number,
      default: 16
    },

    titleFont: {
      type: String,
      default: 'Helvetica'
    },

    titlePadding: {
      type: Number,
      default: 0
    },

    titleOpacity: {
      type: Number,
      default: 1
    },

    titleFontColor: {
      type: String,
      default: 'black'
    },

    titleFontWeight: {
      type: String,
      default: 'normal'
    },

    scale: {
      type: [Array, String, Object, undefined],
      default: undefined,
      required: true
    },

    format: {
      type: [String, Function, undefined],
      default: undefined
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

    legendStroke: {
      type: String,
      default: 'none'
    },

    legendFill: {
      type: String,
      default: 'none'
    },

    legendStrokeWidth: {
      type: Number,
      default: 0
    },

    labels: {
      type: [Array],
      default: undefined
    },

    labelFontSize: {
      type: Number,
      default: 10
    },

    labelFont: {
      type: String,
      default: 'Helvetica'
    },

    labelPadding: {
      type: Number,
      default: 0
    },

    labelOpacity: {
      type: Number,
      default: 1
    },

    labelColor: {
      type: String,
      default: 'black'
    },

    labelFontWeight: {
      type: String,
      default: 'normal'
    },

    labelAnchorPoint: {
      type: String,
      default: undefined,
      validator: function (value) {
        return ['l', 'r', 'center'].indexOf(value) !== -1
      }
    },

    labelRotate: {
      type: Boolean,
      default: false
    },

    orientation: {
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

    w: {
      type: Number,
      default: undefined
    },

    h: {
      type: Number,
      default: undefined
    },

    fill: {
      type: [Object, Array],
      default: function () { return { type: 'blues' } }
    },

    x: {
      type: [Number, Object, Array],
      default: undefined
    },

    y: {
      type: [Number, Object, Array],
      default: undefined
    },

    tickCount: {
      type: Number,
      default: 6
    },

    ticks: {
      type: Boolean,
      default: true
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickMinStep: {
      type: Number,
      default: undefined
    }
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

    parentDomains () {
      return this.parentBranch.domains
    },

    parentDomainWidths () {
      return {
        x: this.parentDomains.x[1] - this.parentDomains.x[0],
        y: this.parentDomains.y[1] - this.parentDomains.y[0]
      }
    },

    ranges () {
      return {
        x: [this.legendLeft, this.legendLeft + this.sectionWidth],
        y: [this.legendTop, this.legendTop + this.sectionHeight]
      }
    },

    context () {
      return {
        ranges: this.ranges,
        parentBranch: this.parentBranch,
        dataInterface: this.$$dataInterface,
        scaleManager: this.$$scaleManager
      }
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
      let p = this.titleAnchorPoint
      if (p === 'right' || p === 'tr' || p === 'br') {
        return 95
      } else if (p === 'left' || p === 'tl' || p === 'bl') {
        return 0
      } else {
        return 50
      }
    },

    titleY () {
      let p = this.titleAnchorPoint
      if (p === 'tr' || p === 'tl' || p === 'right' || p === 'left') {
        return 95
      } else if (p === 'bl' || p === 'br') {
        return 0
      } else {
        if (this.orientation === 'horizontal') {
          return 90
        } else {
          return 95
        }
      }
    },

    legendLeft () {
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'right' || p === 'tr' || p === 'br' || p === 'cr') {
          return (this.plotWidth - this.sectionWidth) * 0.95
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

        if (p === 'top' || p === 'tl' || p === 'tr') {
          return -(this.plotHeight - this.sectionHeight) * 0.9
        } else if (p === 'bottom' || p === 'bl' || p === 'br') {
          return 0
        } else {
          return -this.plotHeight * 0.45
        }
      } else {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `x` and `y` inputs')
        }
        return -this.y
      }
    },

    legendLabels () {
      // let firstValue = this._domain[0]
      // let newTickValues
      //
      // if (this.labels) {
      //   newTickValues = this.labels
      //
      //   if (this.tickValues[0] !== firstValue) {
      //     newTickValues.unshift(firstValue)
      //   }
      //
      //   return newTickValues.map(value => {
      //     return { value }
      //   })
      // } else {
      //   let labels
      //   let format = this.format && this.format.constructor === Function ? this.format : defaultFormat
      //
      //   if (this._domainType === 'quantitative') {
      //     newTickValues = arrayTicks(...this._domain, this.tickCount)
      //     if (this.tickExtra && newTickValues[0] !== firstValue) {
      //       newTickValues.unshift(firstValue)
      //     }
      //
      //     labels = newTickValues.map((value, i) => {
      //       if (i === 0 && this.tickExtra && !this.tickExtraLabel) {
      //         return { value, label: '' }
      //       } else {
      //         return { value, label: format(value) }
      //       }
      //     })
      //   }
      //
      //   if (this._domainType === 'categorical') {
      //     labels = this._domain.map(value => {
      //       return { value, label: format(value) }
      //     })
      //   }
      //
      //   if (this._domainType === 'temporal') {
      //     if (this.format) {
      //       if (this.format.constructor === String) { format = timeFormat(this.format) }
      //     } else {
      //       format = timeFormat('%d/%m/%Y')
      //     }
      //
      //     let scale = scaleTime().domain(this._domain)
      //
      //     newTickValues = scale.ticks(this.tickCount)
      //
      //     if (this.tickExtra && newTickValues[0] !== firstValue) {
      //       newTickValues.unshift(firstValue)
      //     }
      //
      //     labels = newTickValues.map((value, i) => {
      //       let date = new Date(value)
      //
      //       if (i === 0 && this.tickExtra && !this.tickExtraLabel) {
      //         return { value: date, label: '' }
      //       } else {
      //         return { value: date, label: format(date) }
      //       }
      //     })
      //   }
      //
      //   if (this._domainType === 'interval:quantitative') {
      //     let intervals = this.$$dataInterface.getColumn(this.scale)
      //     labels = ticksFromIntervals(intervals).map(value => {
      //       return { value, label: format(value) }
      //     })
      //   }

      let labels = this.labels
      let variableType, variableData

      if (labels) {
        if (labels.constructor === Array) {
          return labels
        } else {
          console.warn('Ignoring labels value ' + labels + ' as it is a string input. Using domain ' + this._domain + ' given in scale input')
          variableType = this._domainType
          variableData = this._domain
        }
      } else {
        variableType = this._domainType
        variableData = this._domain
      }

      let format = this.format && this.format.constructor === Function ? this.format : defaultFormat

      if (variableType === 'nominal' || variableType === 'categorical') {
        return variableData
      } else if (variableType === 'temporal') {
        if (this.format) {
          if (this.format.constructor === String) {
            format = timeFormat(this.format)
          }
        } else {
          format = timeFormat('%d/%m/%Y')
        }

        // let scale = scaleTime().domain(this._domain)
        let ticks = variableData.map((value, i) => {
          let date = new Date(value)
          return format(date)
        })

        return ticks
      } else if (variableType === 'interval:temporal') {
        if (this.format) {
          if (this.format.constructor === String) { format = timeFormat(this.format) }
        } else {
          format = timeFormat('%d/%m/%Y')
        }

        let intervals = this.$$dataInterface.getColumn(this.scale.domain)
        let ticks = this.ticksFromIntervals(intervals).map(value => {
          let date = new Date(value)
          return format(date)
        })

        return ticks
      } else {
        return this.formatLabels(variableData, variableType)
      }
    },

    segmentHeight () {
      return 100 / this.tickCount
    },

    sectionWidth () {
      if (!this.w) {
        if (this.orientation === 'vertical') {
          return this.labelFontSize * 6
        } else {
          return this.plotWidth * 0.3 + this.titleFontSize + this.titlePadding * 2
        }
      } else {
        return this.w
      }
    },

    sectionHeight () {
      if (!this.h) {
        if (this.orientation === 'vertical') {
          return this.plotHeight * 0.3 + this.titleFontSize + this.titlePadding * 2
        } else {
          return this.labelFontSize * 6
        }
      } else {
        return this.h
      }
    },

    positionElements () {
      if (this.type === 'discrete' || this.type === 'gradient') {
        let rectangle, label, labelAnchorPoint, title

        if (this.orientation === 'vertical') {
          title = this.titleX
          if (!this.flipNumbers) {
            rectangle = { x1: 0, x2: 75, y1: 0, y2: 100 }
            label = 80 + this.labelPadding
            if (!this.labelAnchorPoint) {
              labelAnchorPoint = 'l'
            }
          } else {
            rectangle = { x1: 25, x2: 100, y1: 0, y2: 100 }
            label = 20 - this.labelPadding
            if (!this.labelAnchorPoint) {
              labelAnchorPoint = 'r'
            }
          }
        } else {
          title = 55
          if (!this.flipNumbers) {
            rectangle = { x1: 0, x2: 100, y1: 15, y2: 85 }
            label = 20 - this.labelPadding
          } else {
            rectangle = { x1: 0, x2: 100, y1: 0, y2: 70 }
            label = 80 + this.labelPadding
          }
          labelAnchorPoint = 'center'
        }
        return { rectangle, label, title, labelAnchorPoint }
      } else if (this.type === 'symbol') {
        if (this.orientation === 'vertical') {
          let multilineX, symbolX, labelX, labelAnchorPoint
          if (!this.flipNumbers) {
            multilineX = [0.25 - this.symbolPadding, 0.55 - this.symbolPadding]
            symbolX = 0.3 - this.symbolPadding
            labelX = 0.7 + this.labelPadding
            if (!this.labelAnchorPoint) {
              labelAnchorPoint = 'l'
            }
          } else {
            multilineX = [0.6 + this.symbolPadding, 0.9 + this.symbolPadding]
            symbolX = 0.7 + this.symbolPadding
            labelX = 0.3 - this.labelPadding
            if (!this.labelAnchorPoint) {
              labelAnchorPoint = 'r'
            }
          }
          return { multilineX, symbolX, labelX, labelAnchorPoint }
        } else {
          let multilineY, symbolY, labelY, labelAnchorPoint
          if (!this.flipNumbers) {
            multilineY = [0.6 + this.symbolPadding, 0.6 + this.symbolPadding]
            symbolY = 0.6 + this.symbolPadding
            labelY = 0.3 - this.labelPadding
          } else {
            multilineY = [0.5 - this.symbolPadding, 0.5 - this.symbolPadding]
            symbolY = 0.3 - this.symbolPadding
            labelY = 0.6 + this.labelPadding
          }
          labelAnchorPoint = 'center'
          return { multilineY, symbolY, labelY, labelAnchorPoint }
        }
      }
    }
  },

  methods: {
    ticksFromIntervals (intervals) {
      let ticks = new Set()
      for (let interval of intervals) {
        ticks.add(interval[0])
        ticks.add(interval[1])
      }
      return Array.from(ticks)
    },

    round (value, n) {
      return Math.floor(value / n) * n
    },

    formatLabels (dataDomain, variableType) {
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

        if (this.format) { value = this.format(value) }
        ticks.push(value)
      }

      return ticks
    },

    generateColorScale (prop, colorBasis) {
      let color = colorBasis || this.fill
      let scaleOptions

      if (color.constructor === Array) {
        return (index) => { return color[index] }
      } else {
        if (this._domainType === 'categorical') {
          scaleOptions = {
            aestheticType: prop,
            domain: color.domain ? color.domain : this._domain,
            type: color.type,
            ranges: color.ranges
          }
        } else {
          scaleOptions = {
            aestheticType: prop,
            domain: color.domain ? color.domain : this._domain,
            domainMid: (this._parsedScalingOptions[0][0] + this._parsedScalingOptions[0][1]) / 2,
            scaleArgs: [[0, this.tickCount]],
            type: color.type,
            ranges: color.ranges
          }
        }

        let scalingFunction = createScale(prop, this.$$dataInterface, scaleOptions)
        return scalingFunction
      }
    }

  }
}
