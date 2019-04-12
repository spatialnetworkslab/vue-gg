export default {
  data () {
    return {
      scales: {},
      takenNames: {}
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

    storeScale (name, scale, componentID) {
      if (!this.takenNames[name]) {
        this.takenNames[name] = componentID
      }

      if (this.takenNames[name] !== componentID) {
        throw new Error(`Duplicate global scale name: '${name}'`)
      }

      this.$set(this.scales, name, scale)
      this.takenNames[name] = componentID
    },

    deleteScale (name) {
      this.$delete(this.scales, name)
      delete this.takenNames[name]
    }
  },

  provide () {
    let $$scaleManager = this
    return { $$scaleManager }
  }
}
