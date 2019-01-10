import CoordinateTreeUser from '../CoordinateTreeUser.js'
import DataReceiver from '../Data/DataReceiver.js'

import mapAesthetics from './utils/mapAesthetics.js'

import {
  parseAesthetic,
  parseCoordinate,
  parseCoordinateSet,
  parseGeometry,
  parseProperty
} from './utils'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  inject: ['$$transform', '$$map'],

  props: {
    interpolate: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    __update () {
      return this.$$coordinateTree._update
    },

    _interpolate () {
      // TODO check if interpolation is necessary (i.e. if all parent
      // coordinate transformations are linear)
      return this.interpolate
    },

    context () {
      return {
        domains: this.$$dataContainer.getDomains(),
        ranges: this.parentBranch.domains,
        parentBranch: this.parentBranch,
        dataContainer: this.$$dataContainer
      }
    }
  },

  methods: {
    parseAesthetic,
    parseCoordinate,
    parseCoordinateSet,
    parseGeometry,
    parseProperty
  },

  mounted () {
    this.parseAesthetic.bind(this)
    this.parseCoordinate.bind(this)
    this.parseCoordinateSet.bind(this)
    this.parseGeometry.bind(this)
    this.parseProperty.bind(this)
  },

  render (createElement) {
    if (this.__update) {
      if (!this.$$map) {
        // Create svg element using aesthetics
        return this.renderSVG(createElement, this.aesthetics)
      }

      if (this.$$map) {
        // Create the aesthetics for each mark
        let aestheticsPerMark = mapAesthetics(this.aesthetics, this.context)

        // Create svg element for each mark from aesthetics
        let components = []
        for (let aesthetics of aestheticsPerMark) {
          components.push(
            this.renderSVG(createElement, aesthetics)
          )
        }

        return createElement('g', components)
      }
    }
  }
}
