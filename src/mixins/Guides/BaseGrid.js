import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'

import Rectangular from '../../mixins/Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'

export default {
  mixins: [Rectangular, DataReceiver],

  props: {
    scale: {
      type: [Array, String, Object, undefined],
      default: undefined
    },

    gridLines: {
      type: [Array, Number],
      default: 10
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

    ranges () {
      return this.coordinateSpecification
    },

    cells () {
      if (this.gridLines.constructor === Array) {
        return this.gridLines.map(value => {
          return { value }
        })
      } else {
        let cells

        if (this._domainType === 'quantitative') {
          cells = arrayTicks(...this._domain, this.gridLines).map(value => {
            return { value }
          })
        }

        if (this._domainType === 'categorical') {
          cells = this._domain.map(value => {
            return { value }
          })
        }

        if (this._domainType === 'temporal') {
          let scale = scaleTime().domain(this._domain)

          cells = scale.ticks(this.tickCount).map(value => {
            let date = new Date(value)
            return { value: date }
          })
        }

        return cells
      }
    }
  }
}
