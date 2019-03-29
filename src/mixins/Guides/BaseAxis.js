import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import defaultFormat from './utils/defaultFormat.js'
import ticksFromIntervals from './utils/ticksFromIntervals.js'

export default {
  mixins: [Rectangular, DataReceiver, ScaleReceiver],

  props: {
    scale: {
      type: [Array, String, Object],
      required: true
    },

    flip: {
      type: Boolean,
      default: false
    },

    // STYLING OPTIONS //

    // If true render axis main line
    domain: {
      type: Boolean,
      default: true
    },

    domainColor: {
      type: String,
      default: 'black'
    },

    domainOpacity: {
      type: Number,
      default: 1
    },

    domainWidth: {
      type: Number,
      default: 1
    },

    labels: {
      type: Boolean,
      default: true
    },

    // hide labels that exceed axis range
    // labelBound: {
    //   type: Boolean,
    //   default: false
    // },

    labelColor: {
      type: String,
      default: 'black'
    },

    labelFont: {
      type: String,
      default: 'Helvetica'
    },

    labelFontSize: {
      type: Number,
      default: 10
    },

    labelFontWeight: {
      type: [String, Number],
      default: 'normal'
    },

    labelOpacity: {
      type: Number,
      default: 1
    },

    // Distance between tick and label **
    // labelPadding: {
    //   type: Number,
    //   default: 0
    // },

    labelRotate: {
      type: Boolean,
      default: false
    },

    ticks: {
      type: Boolean,
      default: true
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickCount: {
      type: Number,
      default: undefined
    },

    tickColor: {
      type: String,
      default: 'black'
    },

    tickExtra: {
      type: Boolean,
      default: true
    },

    tickExtraLabel: {
      type: Boolean,
      default: true
    },

    tickOpacity: {
      type: Number,
      default: 1
    },

    tickSize: {
      type: Number,
      default: 7
    },

    tickLength: {
      type: [Number, undefined],
      default: undefined
    },

    tickWidth: {
      type: Number,
      default: 0.5
    },

    format: {
      type: [String, Function, undefined],
      default: undefined
    },

    title: {
      type: String,
      default: ''
    },

    titleAnchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p)
    },

    titleAngle: {
      type: Number,
      default: 0
    },

    titleColor: {
      type: String,
      default: 'black'
    },

    titleFont: {
      type: String,
      default: 'Helvetica'
    },

    titleFontSize: {
      type: Number,
      default: 12
    },

    titleFontWeight: {
      type: Number,
      default: 500
    },

    titleOpacity: {
      type: Number,
      default: 1
    },

    hide: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      justLookup: { l: 0, b: 0, r: 1, t: 1, center: 0.5 }
    }
  },

  computed: {
    parsedScalingOptions () {
      return parseScaleOptions(this.scale, this.$$dataInterface, this.$$scaleManager)
    },

    _domain () {
      return this.parsedScalingOptions[0]
    },

    domainType () {
      return this.parsedScalingOptions[1]
    },

    scalingOptions () {
      return this.parsedScalingOptions[2]
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

    widthX () {
      let { x1, x2 } = this.axisCoords
      return x2 - x1
    },

    widthY () {
      let { y1, y2 } = this.axisCoords
      return y2 - y1
    },

    ranges () {
      return {
        x: [this.axisCoords.x1, this.axisCoords.x2],
        y: [this.axisCoords.y1, this.axisCoords.y2]
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

    generatedTicks () {
      let firstValue = this._domain[0]
      let newTickValues

      if (this.tickValues) {
        newTickValues = this.tickValues

        let format = this.format && this.format.constructor === Function ? this.format : defaultFormat

        return newTickValues.map(value => {
          return { value: this.parsedScale(value), label: format(value) }
        })
      } else {
        let ticks
        let format = this.format && this.format.constructor === Function ? this.format : defaultFormat

        if (this.domainType === 'quantitative') {
          let numTicks = this.tickCount ? this.tickCount : 10
          newTickValues = arrayTicks(...this._domain, numTicks)
          if (this.tickExtra && newTickValues[0] !== firstValue) {
            newTickValues.unshift(firstValue)
          }

          ticks = newTickValues.map((value, i) => {
            if (i === 0 && this.tickExtra && !this.tickExtraLabel) {
              return { value, label: '' }
            } else {
              return { value, label: format(value) }
            }
          })
        }

        if (this.domainType === 'categorical') {
          ticks = this._domain.map(value => {
            return { value, label: format(value) }
          })

          if (this.tickCount) {
            let step = Math.floor(ticks.length / this.tickCount)
            ticks = ticks.filter((value, i) => (i % step) === 0)
          }
        }

        if (this.domainType === 'temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let scale = scaleTime().domain(this._domain)

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

        if (this.domainType === 'interval:quantitative') {
          let intervals = this.$$dataInterface.getColumn(this.scalingOptions.domain)
          ticks = ticksFromIntervals(intervals).map(value => {
            return { value, label: format(value) }
          })

          if (this.tickCount) {
            let step = Math.floor(ticks.length / this.tickCount)
            ticks = ticks.filter((value, i) => (i % step) === 0)
          }
        }

        if (this.domainType === 'interval:temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let intervals = this.$$dataInterface.getColumn(this.scalingOptions.domain)
          ticks = ticksFromIntervals(intervals).map(value => {
            let date = new Date(value)
            return { value: date, label: format(date) }
          })

          if (this.tickCount) {
            let step = Math.floor(ticks.length / this.tickCount)
            ticks = ticks.filter((value, i) => (i % step) === 0)
          }
        }

        return ticks.map(tick => {
          let newTick = { label: tick.label, value: this.parsedScale(tick.value) }
          return newTick
        })
      }
    }
  },

  methods: {
    getJust (lowerBound, width, just) {
      return lowerBound + (width * just)
    }
  }
}
