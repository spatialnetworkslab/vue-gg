import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'

export default {
  mixins: [Rectangular],

  props: {
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

    hjust: {
      type: [Number, String],
      default: 'l',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
      }
    },

    vjust: {
      type: [Number, String],
      default: 'b',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 't', 'b'].includes(p))
      }
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

    tickColor: {
      type: String,
      default: 'black'
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickCount: {
      type: Number,
      default: 10
    },

    tickExtra: {
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

    tickWidth: {
      type: Number,
      default: 0.5
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

    titleHjust: {
      type: [Number, String],
      validator: function (p) {
        return (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
      }
    },

    titleVjust: {
      type: [Number, String],
      validator: function (p) {
        return (p.constructor === Number) || (['center', 't', 'b'].includes(p))
      }
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

    xRange () {
      return this.parentBranch.ranges.x
    },

    yRange () {
      return this.parentBranch.ranges.y
    },

    xDomain () {
      return this.parentBranch.domains.x
    },

    yDomain () {
      return this.parentBranch.domains.y
    },

    tickMin () {
      return 0.5 - (this.tickSize / 100)
    },

    tickMax () {
      return 0.5 + (this.tickSize / 100)
    },

    tickData () {
      let firstValue = this._domain[0]
      let newTickValues

      if (this.tickValues) {
        newTickValues = this.tickValues

        if (this.tickExtra && this.tickValues[0] != firstValue) {
          newTickValues.unshift(firstValue)
        }

        return newTickValues.map(value => {
          return { value }
        })
      } else {
        let ticks
        let format = this.format && this.format.constructor === Function ? this.format : x => x

        if (this._domainType === 'quantitative') {
          newTickValues = arrayTicks(...this._domain, this.tickCount)

          if (this.tickExtra && newTickValues[0] != firstValue) {
            newTickValues.unshift(firstValue)
          }

          ticks = newTickValues.map(value => {
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

          newTickValues = scale.ticks(this.tickCount)

          if (this.tickExtra && newTickValues[0] != firstValue) {
            newTickValues.unshift(firstValue)
          }

          ticks = newTickValues.map(value => {
            let date = new Date(value)
            return { value: date, label: format(date) }
          })
        }
        return ticks
      }
    }
  }
}
