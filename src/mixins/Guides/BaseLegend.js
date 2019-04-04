import { ticks as arrayTicks } from 'd3-array'
import { scaleTime, scaleLinear } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import createScale from '@/scales/createScale.js'
import defaultFormat from './utils/defaultFormat.js'
import ticksFromIntervals from './utils/ticksFromIntervals.js'

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
      default: 14
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
      default: 'bold'
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
        return ['left', 'right', 'top', 'bottom', 'center', 'tl', 'tr', 'tc', 'bl', 'br', 'bc'].indexOf(value) !== -1
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
      type: [String, Object, Array],
      default: function () { return { type: 'blues' } }
    },

    fillOpacity: {
      type: [Number, Object, Array],
      default: 1
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
      default: 10
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickMinStep: {
      type: Number,
      default: undefined
    },

    nice: {
      type: Boolean,
      default: true
    },

    rowPadding: {
      type: Number,
      default: 0
    },

    colPadding: {
      type: Number,
      default: 0
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
          return 95
        } else {
          return 95
        }
      }
    },

    legendLeft () {
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'right' || p === 'tr' || p === 'br') {
          return (this.plotWidth - this.sectionWidth) * 0.95
        } else if (p === 'center' || p === 'tc' || p === 'bc') {
          return this.plotWidth * 0.5 - this.sectionWidth / 2
        } else {
          return this.plotWidth * 0.02
        }
      } else {
        return this.x
      }
    },

    legendTop () {
      if (!this.x && !this.y) {
        let p = this.position
        if (p === 'top' || p === 'tl' || p === 'tr' || p === 'tc') {
          if (this.plotHeight - this.sectionHeight < 0) {
            return (this.plotHeight - this.sectionHeight) * 0.9
          } else {
            return -(this.plotHeight - this.sectionHeight) * 0.9
          }
        } else if (p === 'bottom' || p === 'bl' || p === 'br' || p === 'bc') {
          if (this.plotHeight < 0) {
            return this.plotHeight * 0.01
          } else {
            return -this.plotHeight * 0.01
          }
        } else {
          if (this.plotHeight < 0) {
            return this.plotHeight * 0.5 - this.sectionHeight / 2
          } else {
            return -this.plotHeight * 0.45 + this.sectionHeight / 2
          }
        }
      } else {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `x` and `y` inputs')
        }
        return -this.y
      }
    },

    legendLabels () {
      let firstValue = this._domain[0]
      let newTickValues

      if (this.tickValues) {
        newTickValues = this.tickValues

        if (this.tickExtra && this.tickValues[0] !== firstValue) {
          newTickValues.unshift(firstValue)
        }

        return newTickValues.map(value => {
          return { value }
        })
      } else {
        let ticks
        let format = this.format && this.format.constructor === Function ? this.format : defaultFormat
        let domain = this._domain

        if (this.scale.domainMin) {
          domain = [this.scale.domainMin, this._domain[this._domain.length - 1]]
        }

        if (this.scale.domainMax) {
          domain = [this._domain[0], this.scale.domainMax]
        }

        if (this._domainType === 'quantitative') {
          newTickValues = arrayTicks(...domain, this.tickCount)
          if (this.tickExtra && newTickValues[0] !== firstValue) {
            newTickValues.unshift(firstValue)
          }

          ticks = newTickValues.map((value, i) => {
            if (i === 0 && this.tickExtra && !this.tickExtraLabel) {
              return { value, label: '' }
            } else {
              return { value, label: this.nice ? format(value, 1) : format(value) }
            }
          })
        }

        if (this._domainType === 'categorical') {
          ticks = domain.map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let scale = scaleTime().domain(domain)

          newTickValues = scale.ticks(this.tickCount)

          if (this.tickExtra && newTickValues[0] !== firstValue) {
            newTickValues.unshift(firstValue)
          }

          ticks = newTickValues.map((value, i) => {
            let date = new Date(value)

            if (i === 0 && this.tickExtra && !this.tickExtraLabel) {
              return { value: date, label: '' }
            } else {
              return { value: date, label: format(date) }
            }
          })
        }

        if (this._domainType === 'interval:quantitative') {
          let intervals
          if (this.scale.constructor === String) {
            intervals = this.$$dataInterface.getColumn(this.scale)
          } else if (this.scale.constructor === Object) {
            intervals = this.$$dataInterface.getColumn(this.scale.domain)
          }

          // ticks = intervals.map((value, i) => {
          //   let mean = (value[0] + value[1]) / 2
          //   return { value: mean, label: this.nice ? format(this.round(mean, 1)) : format(mean) }
          // })

          ticks = ticksFromIntervals(intervals).map(value => {
            return { value: value, label: this.nice ? format(value, 1) : format(value) }
          })
        }

        if (this._domainType === 'interval:temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let intervals = this.$$dataInterface.getColumn(this.scale)
          ticks = ticksFromIntervals(intervals).map(value => {
            let date = new Date(value)
            return { value: date, label: format(date) }
          })
        }

        return ticks
      }
    },

    sectionWidth () {
      if (!this.w) {
        if (this.orientation === 'vertical') {
          return this.plotWidth * 0.1 + this.rowPadding
        } else {
          let width = this.plotWidth * 0.35 + this.titleFontSize + this.colPadding
          return (width / this.tickCount * this.legendLabels.length >= width ? width / this.tickCount * this.legendLabels.length : width)
        }
      } else {
        return this.w
      }
    },

    sectionHeight () {
      if (!this.h) {
        if (this.orientation === 'vertical') {
          // return this.plotHeight * 0.3 + this.titleFontSize + this.colPadding
          let height = this.plotHeight * 0.35 + this.titleFontSize + this.colPadding
          return (height / this.tickCount * this.legendLabels.length >= height ? height / this.tickCount * this.legendLabels.length : height)
        } else {
          return this.plotHeight * 0.1 + this.rowPadding
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
            rectangle = { x1: 0, x2: 100, y1: 20, y2: 90 }
            label = 5 - this.labelPadding
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
    sectionScale (domain) {
      return scaleLinear().domain(domain).range([0, 100])
    },

    generateScale (prop, scaleBasis) {
      let scaleOptions = {}

      if (scaleBasis.constructor === Number) {
        return () => { return scaleBasis }
      // } else if (scaleBasis.constructor === Array) { // FIX THIS
      //   return (index) => { return scaleBasis[index] }
      } else {
        // Domain is dependent on scale inputs
        // Range is dependent on aesthetic inputs
        if (this.scale.domainMin) {
          scaleOptions.domainMin = this.scale.domainMin
        }

        if (this.scale.domainMax) {
          scaleOptions.domainMax = this.scale.domainMax
        }

        if (this.scale.domainMid) {
          scaleOptions.domainMid = this.scale.domainMid
        }

        if (this.scale.order && this._domainType.includes('categorical')) {
          scaleOptions.order = this.scale.order
        } else {
          console.warn('Data must be categorical in order to include `order` in `scale`')
        }

        if (this.scale.absolute) {
          scaleOptions.absolute = this.scale.absolute
        }

        if (this.scale.nice) {
          scaleOptions.nice = this.scale.nice
        }

        if (this.scale.reverse) {
          scaleOptions.reverse = this.scale.reverse
        }

        scaleOptions.domain = this.scale.domain ? this.scale.domain : this.scale

        if (scaleBasis.rangeMin) {
          scaleOptions.rangeMin = scaleBasis.rangeMin
        }

        if (scaleBasis.rangeMax) {
          scaleOptions.rangeMax = scaleBasis.rangeMax
        }

        if (prop === 'strokeOpacity' || prop === 'fillOpacity' || prop === 'opacity') {
          scaleOptions.range = scaleBasis.range ? scaleBasis.range : [0, 1]
        } else if (prop === 'stroke' || prop === 'fill' || prop === 'shape') {
          if (scaleBasis.type) {
            scaleOptions.type = scaleBasis.type
          }

          if (scaleBasis.range) {
            if (prop === 'stroke' || prop === 'fill') {
              scaleOptions.ranges = scaleBasis.range ? scaleBasis.range : (this._domainType === 'categorical' || this._domainType.includes('interval')) ? 'category10' : 'blues'
            } else {
              scaleOptions.ranges = scaleBasis.range ? scaleBasis.range : ['circle', 'square']
            }
          }
        } else if (prop === 'size' || prop === 'radius' || prop === 'strokeWidth') {
          scaleOptions.range = scaleBasis.range ? scaleBasis.range : [0, 10]
        }

        if (scaleOptions.domain.includes('#')) {
          scaleOptions.domain = this.$$scaleManager.getScale(scaleOptions.domain)[0]
        }

        if (scaleOptions.range) {
          if (scaleOptions.range.includes('#')) {
            scaleOptions.range = this.$$scaleManager.getScale(scaleOptions.range)[0]
          }
        }

        return createScale(prop, this.context, scaleOptions)
      }
    },

    // CSS color recognition for color reliant properties
    checkValidColor (color) {
      let e = document.getElementById('divValidColor')
      if (!e) {
        e = document.createElement('div')
        e.id = 'divValidColor'
      }
      e.style.borderColor = ''
      e.style.borderColor = color
      let tmpcolor = e.style.borderColor
      if (tmpcolor.length === 0) {
        return false
      }
      return true
    }
  }
}