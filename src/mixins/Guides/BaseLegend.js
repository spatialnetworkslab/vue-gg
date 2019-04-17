import { ticks as arrayTicks } from 'd3-array'
import { scaleTime, scaleLinear } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import { createPropCache, createWatchers } from '../../components/Core/utils/propCache.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import createScale from '../../scales/createScale.js'
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

    fill: {
      type: [String, Object, Array],
      default: function () { return { type: 'blues' } }
    },

    fillOpacity: {
      type: [Number, Object, Array],
      default: 1
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
      default: false
    },

    rowPadding: {
      type: Number,
      default: 0
    },

    colPadding: {
      type: Number,
      default: 0
    },

    showLast: {
      type: Boolean,
      default: true
    },

    showFirst: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      legendCache: createPropCache(this, ['scale', 'fill', 'fillOpacity', 'tickValues'])
    }
  },

  computed: {
    _parsedScalingOptions () {
      return parseScaleOptions(this.legendCache.scale, this.$$dataInterface, this.$$scaleManager)
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
      if (this.position !== 'left' && (!isNaN(this.x) || !isNaN(this.x1) || !isNaN(this.x2))) {
        throw new Error('Invalid combination of props. Use only either `x1`, `x2`, `y1`, `y2` or `w`, `h`, `x`, `y` or `position`')
      } else if (isNaN(this.x) && isNaN(this.x1) && isNaN(this.x2)) {
        let p = this.position
        if (p === 'right' || p === 'tr' || p === 'br') {
          return (this.plotWidth - this.sectionWidth) * 0.95
        } else if (p === 'center' || p === 'tc' || p === 'bc') {
          return this.plotWidth * 0.5 - this.sectionWidth / 2
        } else {
          return this.plotWidth * 0.02
        }
      } else if (!isNaN(this.x) && isNaN(this.x1) && isNaN(this.x2)) {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `x` input ' + this.x)
        }
        return (this.x - this.sectionWidth / 2)
      } else if (!isNaN(this.x1) && !isNaN(this.x2) && isNaN(this.x)) {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `x1` input ' + this.x1 + ' and `x2` input ' + this.x2)
        }
        return this.x1
      } else if ((!isNaN(this.x1) || !isNaN(this.x2)) && isNaN(this.x)) {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `x1`, `x2`, `x` inputs')
        }
        if (!isNaN(this.x1)) {
          return this.x1
        }

        if (!isNaN(this.x2)) {
          return this.x2 - this.sectionWidth
        }
      } else if (!isNaN(this.x) && !isNaN(this.x1) && !isNaN(this.x2)) {
        throw new Error('Invalid combination of props. Use only either `x1`, `x2`, `y1`, `y2` or `w`, `h`, `x`, `y`')
      }
    },

    legendTop () {
      if (this.position !== 'left' && (!isNaN(this.y) || !isNaN(this.y1) || !isNaN(this.y2))) {
        throw new Error('Invalid combination of props. Use only either `x1`, `x2`, `y1`, `y2` or `w`, `h`, `x`, `y` or `position`')
      } else if (isNaN(this.y) && isNaN(this.y1) && isNaN(this.y2)) {
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
      } else if (!isNaN(this.y) && isNaN(this.y1) && isNaN(this.y2)) {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `x` input ' + this.y)
        }
        return (-this.y + this.sectionHeight / 2)
      } else if (!isNaN(this.y1) && !isNaN(this.y2) && isNaN(this.y)) {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `y1` input ' + this.y1 + ' and `y2` input ' + this.y2)
        }
        return -this.y1
      } else if ((!isNaN(this.y1) || !isNaN(this.y2)) && isNaN(this.y)) {
        if (this.position && this.position !== 'left') {
          console.warn('Ignoring position value `' + this.position + '` because of `y1`, `y2`, `y` inputs')
        }
        if (!isNaN(this.y1)) {
          return -this.y1
        }

        if (!isNaN(this.y2)) {
          return this.sectionHeight - this.y2
        }
      } else if (!isNaN(this.y) && !isNaN(this.y1) && !isNaN(this.y2)) {
        throw new Error('Invalid combination of props. Use only either `x1`, `x2`, `y1`, `y2` or `w`, `h`, `x`, `y`')
      }
    },

    legendTicks () {
      let firstValue = this._domain[0]
      let newTickValues

      if (this.legendCache.tickValues) {
        newTickValues = this.legendCache.tickValues

        if (this.tickExtra && this.legendCache.tickValues[0] !== firstValue) {
          newTickValues.unshift(firstValue)
        }

        if (this._domainType.includes('interval')) {
          let processedTicks = []; let i = 0
          while (i < newTickValues.length) {
            processedTicks.push({ value: newTickValues[i][0], label: newTickValues[i][0] })
            i++
          }
          processedTicks.push({ value: newTickValues[i - 1][1], label: newTickValues[i - 1][1] })
          return processedTicks
        } else {
          return newTickValues.map(value => {
            return { value }
          })
        }
      } else {
        let ticks
        let format = this.format ? this.format : defaultFormat
        let domain = this._domain

        if (this.legendCache.scale.domainMin) {
          domain = [this.legendCache.scale.domainMin, this._domain[this._domain.length - 1]]
        }

        if (this.legendCache.scale.domainMax) {
          domain = [this._domain[0], this.legendCache.scale.domainMax]
        }

        if (this._domainType === 'quantitative') {
          let numTicks = this.tickCount ? this.tickCount : 10
          newTickValues = arrayTicks(...domain, numTicks)
          if (this.tickExtra && newTickValues[0] !== firstValue) {
            newTickValues.unshift(firstValue)
          }

          ticks = newTickValues.map((value, i) => {
            if (i === 0 && this.tickExtra && !this.tickExtraLabel) {
              return { value, label: '' }
            } else {
              return { value, label: this.nice ? Math.ceil(value, 0.1) : format(value) }
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

          if (this.legendCache.scale.constructor === String) {
            intervals = this.$$dataInterface.getColumn(this.legendCache.scale)
          } else if (this.legendCache.scale.constructor === Object) {
            intervals = this.$$dataInterface.getColumn(this.legendCache.scale.domain)
          } else if (this.legendCache.scale.constructor === Array) {
            intervals = this.legendCache.scale
          }

          ticks = ticksFromIntervals(intervals).map(value => {
            return { value: value, label: this.nice ? Math.ceil(value, 0.1) : format(value) }
          })
        }

        if (this._domainType === 'interval:temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let intervals = this.$$dataInterface.getColumn(this.legendCache.scale)
          ticks = ticksFromIntervals(intervals).map(value => {
            let date = new Date(value)
            return { value: date, label: format(date) }
          })

          if (this.tickCount) {
            let step = Math.floor(ticks.length / this.tickCount)
            ticks = ticks.filter((value, i) => (i % step) === 0)
          }
        }

        return ticks
      }
    },

    // w
    // x1, x2
    sectionWidth () {
      if (!this.w && !this.x1 && !this.x2) {
        if (this.orientation === 'vertical') {
          return this.plotWidth * 0.1 + this.rowPadding
        } else {
          return this.plotWidth * 0.35 + this.titleFontSize + this.colPadding
        }
      } else if (this.x1 && this.x2 && this.w) {
        throw new Error('Invalid combination of props. Use only either `x1`, `x2`, `y1`, `y2` or `w`, `h`, `x`, `y`')
      } else if (this.x1 && this.x2 && !this.w) {
        return (this.x2 - this.x1)
      } else if (this.w && !this.x1 && !this.x2) {
        return this.w
      }
    },

    // h
    // y1, y2
    sectionHeight () {
      if (!this.h && !this.y1 && !this.y2) {
        if (this.orientation === 'vertical') {
          // return this.plotHeight * 0.3 + this.titleFontSize + this.colPadding
          return this.plotHeight * 0.35 + this.titleFontSize + this.colPadding
        } else {
          return this.plotHeight * 0.1 + this.rowPadding
        }
      } else if (this.y1 && this.y2 && this.h) {
        throw new Error('Invalid combination of props. Use only either `x1`, `x2`, `y1`, `y2` or `w`, `h`, `x`, `y`')
      } else if (this.y1 && this.y2 && !this.h) {
        return (this.y2 - this.y1)
      } else if (this.h && !this.y1 && !this.y2) {
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

  created () {
    createWatchers(this, this.legendCache)
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
        if (this.legendCache.scale.domain) {
          scaleOptions.domain = this.legendCache.scale.domain
        } else {
          scaleOptions.domain = this.legendCache.scale
        }

        if (this.legendCache.scale.domainMin) {
          scaleOptions.domainMin = this.legendCache.scale.domainMin
        }

        if (this.legendCache.scale.domainMax) {
          scaleOptions.domainMax = this.legendCache.scale.domainMax
        }

        if (this.legendCache.scale.domainMid) {
          scaleOptions.domainMid = this.legendCache.scale.domainMid
        }

        if (this.legendCache.scale.order && this._domainType.includes('categorical')) {
          scaleOptions.order = this.legendCache.scale.order
        } else if (this.legendCache.scale.order && !this._domainType.includes('categorical')) {
          console.warn('Data must be categorical to include `order` in `scale`')
        }

        if (this.legendCache.scale.absolute) {
          scaleOptions.absolute = this.legendCache.scale.absolute
        }

        if (this.legendCache.scale.nice) {
          scaleOptions.nice = this.legendCache.scale.nice
        }

        if (this.legendCache.scale.reverse) {
          scaleOptions.reverse = this.legendCache.scale.reverse
        }

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

        // custom scales with # signs only apply to domains
        if (scaleOptions.domain.includes('#')) {
          scaleOptions.domain = this.$$scaleManager.getScale(scaleOptions.domain)[0]
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
