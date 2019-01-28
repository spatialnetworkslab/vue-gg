export default {
  data () {
    return {
      scales: {}
    }
  },

  methods: {
    getScale (name) {
      if (this.scales.hasOwnProperty(name)) {
        return this.scales[name]
      } else {
        throw new Error(`Unknown scale '${name}'`)
      }
    },

    storeScale (name, scale) {
      this.$set(this.scales, name, scale)
    },

    deleteScale (name) {
      this.$delete(this.scales, name)
    }
  },

  provide () {
    let $$scaleManager = this
    return { $$scaleManager }
  }
}
