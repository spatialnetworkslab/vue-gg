import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'

import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'

export default {
  mixins: [Rectangular, DataReceiver],

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

  methods: {
    // Get parents
    getParents (b, result) {
      if (b.parentID != null) {
        let parentBranch = this.$$coordinateTree.getBranch(b.parentID)
        result.unshift(parentBranch)
        return this.getParents(parentBranch, result)
      } else {
        return result
      }
    },

    getLocalX (n) {
      let p = this._parentNodes
      let result = n
      for (let i = 0; i < p.length; i++) {
        let b = p[i]
        let bRange = b.ranges.x
        let bDomain = b.domains.x

        let rangeMin = Math.min(bRange[0], bRange[1])
        let rangeMax = Math.max(bRange[0], bRange[1])

        let domainMin = Math.min(bDomain[0], bDomain[1])
        let domainMax = Math.max(bDomain[0], bDomain[1])

        result = (result/ (rangeMax - rangeMin)) * (domainMax - domainMin)
      }

      return result
    },

    getLocalY (n) {
      let p = this._parentNodes
      let result = n
      for (let i = 0; i < p.length; i++) {
        let b = p[i]
        let bRange = b.ranges.y
        let bDomain = b.domains.y

        let rangeMin = Math.min(bRange[0], bRange[1])
        let rangeMax = Math.max(bRange[0], bRange[1])

        let domainMin = Math.min(bDomain[0], bDomain[1])
        let domainMax = Math.max(bDomain[0], bDomain[1])

        result = (result / (rangeMax - rangeMin)) * (domainMax - domainMin)
      }

      return result
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

    xDomain () {
      return this.parentBranch.domains.x
    },

    yDomain () {
      return this.parentBranch.domains.y
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
