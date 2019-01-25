import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../../mixins/Marks/Rectangular.js'
import parseScaleSpecification from '../../utils/parseScaleSpecification.js'

export default {
  mixins: [Rectangular],

  props: {
    scale: {
      type: [Array, String, Object, undefined],
      default: undefined
    },

    format: {
      type: [String, Function, undefined],
      default: undefined
    },

    flip: {
      type: Boolean,
      default: false
    },

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

    // text-anchor **
    labelAlign: {
      type: String,
      default: 'middle'
    },

    // alignment-baseline **
    labelBaseline: {
      type: String,
      default: 'middle'
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

    // labelFlush (not sure what this is)
    
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

    // labelLimit (also not sure what this is)
    
    labelOpacity: {
      type: Number,
      default: 1
    },

    // labelOverlap
    
    // Distance between tick and label **
    labelPadding: {
      type: Number,
      default: 0
    },

    // minExtent, maxExtent, offset
    
    // POSITION???

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

    // tickExtra
    
    // What is this?
    tickOffset: {
      type: Number,
      default: 0
    },

    tickOpacity: {
      type: Number,
      default: 1
    },

    // tickRound
    
    // TODO **
    tickSize: {
      type: Number,
      default: 5
    },

    tickWidth: {
      type: Number,
      default: 0.5
    },
    
    // New
    tickPosition: {
      type: Number,
      default: 0.5
    },

    title: {
      type: String,
      default: ''
    },

    // text-anchor
    titleAlign: {
      type: String,
      default: 'middle'
    },

    // titleAngle
    
    titleBaseline: {
      type: String,
      default: 'middle'
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

    // titleLimit (what is this?)
    
    titleOpacity: {
      type: Number,
      default: 1
    },

    titlePadding: {
      type: Number,
      default: 0
    },

    // titleX, titleY

    // zindex

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

    tickData () {
      if (this.tickValues) {
        return this.tickValues.map(value => {
          return { value }
        })
      } else {
        let ticks
        let format = this.format && this.format.constructor === Function ? this.format : x => x

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

        return ticks
      }
    }
  }
}
