export default {
  data () {
    return {
      scales: {}
    }
  },

  methods: {
    getScale (name) {
      let strippedName = name.split('#')[1]
      if (this.scales.hasOwnProperty(strippedName)) {
        return this.scales[strippedName]
      } else {
        throw new Error(`Unknown scale '${strippedName}'`)
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
