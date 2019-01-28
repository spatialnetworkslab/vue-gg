export default {
  inject: ['$$scaleManager'],

  props: {
    scales: {
      type: [Object, undefined],
      default: undefined
    }
  },

  watch: {
    scales: {
      handler (newScales, oldScales) {
        let newScaleKeys = this.difference(newScales, oldScales)
        for (let scaleName of newScaleKeys) {
          let scale = this.scales[scaleName]
          this.$$scaleManager.storeScale(name, scale)
        }

        let oldScaleKeys = this.difference(oldScales, newScales)
        for (let scaleName of oldScaleKeys) {
          this.$$scaleManager.deleteScale(scaleName)
        }
      },
      deep: true
    }
  },

  methods: {
    difference (keep, remove) {
      let removeKeys = Object.keys(remove)
      return Object.keys(keep).filter(keepKey => !removeKeys.includes(keepKey))
    }
  }
}
