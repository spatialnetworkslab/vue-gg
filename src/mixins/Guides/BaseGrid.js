import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'

import Rectangular from '../../mixins/Marks/Rectangular.js'
import getDataType from '../../utils/getDataType.js'

import parseDomain from '../../classes/CoordinateTree/parseDomain.js'

export default {
  mixins: [Rectangular],

  props: {
    domain: {
      type: [Array, String, undefined],
      default: undefined
    },

    scale: {
      type: [String, Object],
      default: () => { return {} }
    },

    gridLines: {
      type: [Array, Number],
      default: 10
    }
  },

  computed: {
    _domain () {
      if (this.domain.constructor === Array) {
        return this.domain
      }

      if (this.domain.constructor === String) {
        let domain = this.$$dataContainer.getDomain(this.domain)
        if (!domain) {
          throw new Error(`Invalid domain specification: variable does not exist`)
        }
        return domain
      }

      if (this.domain.constructor === Object) {
        if (!this.domain.variable || this.domain.variable.constructor !== String) {
          throw new Error('Domain specification object must have variable key of type String')
        }

        let domain = this.$$dataContainer.getDomain(this.domain.variable)
        if (!domain) {
          throw new Error(`Invalid domain specification: variable does not exist`)
        }
        return domain
      }
    },

    _domainType () {
      if (this.domain) {
        return getDataType(this._domain[0])
      }
    },

    ranges () {
      return this.convertCoordinateSpecification(this.aesthetics)
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
