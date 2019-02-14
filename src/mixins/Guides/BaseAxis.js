import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'

import defaultFormat from './defaultFormat.js'

export default {
  mixins: [Rectangular, DataReceiver],

  props: {
    scale: {
      type: [Array, String, Object, undefined],
      default: undefined
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickCount: {
      type: Number,
      default: 10
    },

    rotateLabel: {
      type: Boolean,
      default: false
    },

    format: {
      type: [String, Function, undefined],
      default: undefined
    },

    flip: {
      type: Boolean,
      default: false
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

    ranges () {
      return this.coordinateSpecification
    },

    tickData () {
      if (this.tickValues) {
        return this.tickValues.map(value => {
          return { value }
        })
      } else {
        let ticks
        let format = this.format && this.format.constructor === Function ? this.format : defaultFormat

        if (this._domainType === 'quantitative') {
          ticks = arrayTicks(...this._domain, this.tickCount).map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'categorical') {
          ticks = this._domain.map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let scale = scaleTime().domain(this._domain)

          ticks = scale.ticks(this.tickCount).map(value => {
            let date = new Date(value)
            return { value: date, label: format(date) }
          })
        }

        if (this._domainType === 'interval:quantitative') {
          let intervals = this.$$dataInterface.getColumn(this.scale)
          ticks = this.ticksFromIntervals(intervals).map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'interval:temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = timeFormat(this.format) }
          } else {
            format = timeFormat('%d/%m/%Y')
          }

          let intervals = this.$$dataInterface.getColumn(this.scale)
          ticks = this.ticksFromIntervals(intervals).map(value => {
            let date = new Date(value)
            return { value: date, label: format(date) }
          })
        }

        return ticks
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
    }
  }
}
