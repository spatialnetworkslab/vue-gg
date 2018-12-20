import * as d3 from 'd3'
import Rectangular from '@/mixins/Marks/Rectangular.js'
import { inferVariableType } from '@/classes/DataContainer/parseMetadata.js'

export default {
  mixins: [Rectangular],

  props: {
    domain: {
      type: [Array, String, undefined],
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
    _domain () {
      if (this.domain.constructor === Array) {
        return this.domain
      }
      if (this.domain.constructor === String) {
        return this.$$dataContainer.getDomain(this.domain)
      }
    },

    _domainType () {
      if (this.domain.constructor === Array) {
        return inferVariableType(this.domain[0])
      }
      if (this.domain.constructor === String) {
        return this.$$dataContainer.getVariableMetadata(this.domain).type
      }
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

        if (this._domainType === 'ratio') {
          ticks = d3.ticks(...this._domain, this.tickCount).map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'count') {
          ticks = d3.ticks(0, this._domain[1], this.tickCount).map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'categorical') {
          let domain
          if (this._domain.constructor === Set) {
            domain = Array.from(this._domain)
          } else {
            domain = this._domain
          }
          ticks = domain.map(value => {
            return { value, label: format(value) }
          })
        }

        if (this._domainType === 'temporal') {
          if (this.format) {
            if (this.format.constructor === String) { format = d3.timeFormat(this.format) }
          } else {
            format = d3.timeFormat('%d/%m/%Y')
          }

          let scale = d3.scaleTime().domain(this._domain)

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
