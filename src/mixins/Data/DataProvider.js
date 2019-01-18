import DataContainer from '../../classes/Data/DataContainer.js'
import applyTransformations from '../../transformations/applyTransformations.js'
import id from '../../utils/id.js'

export default {
  props: {
    data: {
      type: [Array, Object, undefined],
      default: undefined
    },

    format: {
      type: [String, undefined],
      default: undefined
    },

    transform: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  data () {
    return {
      randomID: undefined
    }
  },

  computed: {
    dataContainer () {
      if (this.data) {
        let container = new DataContainer(this.data, this.format)
        if (this.transform) {
          let transformedData = applyTransformations(
            container.getDataset(),
            this.transform
          )

          return new DataContainer(transformedData)
        } else {
          return container
        }
      }
    },

    dataScopeID () {
      return this.$attrs.id || this.randomID
    }
  },

  beforeDestroy () {
    this.$$dataManager.remove(this.dataScopeID)
  },

  mounted () {
    this.randomID = id()
    this.$$dataManager.register(this.dataScopeID, this.dataContainer)
  },

  watch: {
    dataScopeID (newVal, oldVal) {
      this.$$dataManager.rename(newVal, oldVal)
    },

    container () {
      this.$$dataManager.update(this.dataScopeID, this.dataContainer)
    }
  },

  provide () {
    if (this.dataContainer) {
      let $$dataScope = this.dataScopeID
      return { $$dataScope }
    }
  }
}
