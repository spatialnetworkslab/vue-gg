import CoordinateTreeUser from '../CoordinateTreeUser.js'
import {
  parseAesthetic,
  parseCoordinate,
  parseCoordinateSet,
  parseGeometry,
  parseProperty
} from './utils'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform'],

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
      return this.renderSVG(createElement, this.aesthetics)
    }
  }
}
