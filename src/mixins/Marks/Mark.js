import CoordinateTreeUser from '../CoordinateTreeUser.js'
import DataReceiver from '../Data/DataReceiver.js'

import {
  parseAesthetic,
  parseCoordinate,
  parseCoordinateSet,
  parseGeometry,
  parsePixelValue,
  parseProperty
} from './utils'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  inject: ['$$transform', '$$map'],

  computed: {
    __update () {
      return this.$$coordinateTree._update
    },

    context () {
      return {
        domains: this.$$dataContainer.getDomains(),
        ranges: this.parentBranch.domains,
        parentBranch: this.parentBranch
      }
    }
  },

  methods: {
    parseAesthetic,
    parseCoordinate,
    parseCoordinateSet,
    parseGeometry,
    parsePixelValue,
    parseProperty
  },

  mounted () {
    this.parseAesthetic.bind(this)
    this.parseCoordinate.bind(this)
    this.parseCoordinateSet.bind(this)
    this.parseGeometry.bind(this)
    this.parsePixelValue.bind(this)
    this.parseProperty.bind(this)
  }
}
