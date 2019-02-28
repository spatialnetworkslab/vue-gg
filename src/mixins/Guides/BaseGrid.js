import { ticks as arrayTicks } from 'd3-array'
import { scaleTime } from 'd3-scale'

import Rectangular from '../../mixins/Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import { isnt } from '../../utils/equals.js'

export default {
  mixins: [Rectangular, DataReceiver],

  props: {
    scale: {
      type: [Array, String, Object],
      required: true
    },

    gridLines: {
      type: [Array, Number],
      default: 10
    }
  },

  computed: {
    parsedScalingOptions () {
      return parseScaleOptions(this.scale, this.$$dataInterface, this.$$scaleManager)
    },

    domain () {
      return this.parsedScalingOptions[0]
    },

    domainType () {
      return this.parsedScalingOptions[1]
    },

    noX () {
      return isnt(this.x1) && isnt(this.x2) && isnt(this.x) && isnt(this.w)
    },

    noY () {
      return isnt(this.y1) && isnt(this.y2) && isnt(this.y) && isnt(this.h)
    },

    gridCoords () {
      if (!this.invalidX && !this.invalidY) {
        return this.coordinateSpecification
      }

      let coords = {}
      let parentDomains = this.parentBranch.domains

      // X coords

      if (this.invalidX) {
        if (this.noX) {
          coords.x1 = parentDomains.x[0]
          coords.x2 = parentDomains.x[1]
        } else {
          throw new Error('Invalid combination of x-positioning props')
        }
      }

      if (!this.invalidX) {
        let [x1, x2] = this.convertSpecification(
          this.x1, this.x2, this.x, this.w, this.parentBranch, 'x'
        )
        coords.x1 = x1
        coords.x2 = x2
      }

      // Y coords

      if (this.invalidY) {
        if (this.noY) {
          coords.y1 = parentDomains.y[0]
          coords.y2 = parentDomains.y[1]
        } else {
          throw new Error('Invalid combination of y-positioning props')
        }
      }

      if (!this.invalidY) {
        let [y1, y2] = this.convertSpecification(
          this.y1, this.y2, this.y, this.h, this.parentBranch, 'y'
        )
        coords.y1 = y1
        coords.y2 = y2
      }

      return coords
    },

    cells () {
      if (this.gridLines.constructor === Array) {
        return this.gridLines.map(value => {
          return { value }
        })
      } else {
        let cells

        if (this.domainType === 'quantitative') {
          cells = arrayTicks(...this.domain, this.gridLines).map(value => {
            return { value }
          })
        }

        if (this.domainType === 'categorical') {
          cells = this.domain.map(value => {
            return { value }
          })
        }

        if (this.domainType === 'temporal') {
          let scale = scaleTime().domain(this.domain)

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
