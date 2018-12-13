import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform', '$$map'],

  computed: {
    __update () {
      return this.$$coordinateTree._update
    }
  },

  methods: {
    default (prop, defaultVal) {
      if (!this.$$map) { return prop || defaultVal }
      if (this.$$map) {
        return prop.constructor === Object ? prop : { assign: prop || defaultVal }
      }
    }
  }
}
