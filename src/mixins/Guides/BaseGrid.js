import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'

import Rectangular from '../../mixins/Marks/Rectangular.js'

import parseDomain from '../../classes/CoordinateTree/parseDomain.js'

export default {
  mixins: [Rectangular],

  props: {
    domain: {
      type: [Array, String, undefined],
      default: undefined
    },

    gridLines: {
      type: [Array, Number],
      default: 10
    }
  },

  computed: {
    _parsedDomain () {
      let variableDomains
      if (this.$$dataContainer) {
        variableDomains = this.$$dataContainer.getDomains()
      }
      return parseDomain(this.domain, variableDomains)
    },

    _domain () {
      return this._parsedDomain[0]
    },

    _domainType () {
      return this._parsedDomain[1]
    },

    _scalingOptions () {
      return this._parsedDomain[2]
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
