import DataContainer from '../../classes/Data/DataContainer.js'
import DataReceiver from './DataReceiver.js'

import applyTransformations from '../../transformations/applyTransformations.js'

export default {
  mixins: [DataReceiver],

  inject: ['$$dataManager'],

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

      if (!this.data && this.transform) {
        let data = this.$$dataInterface.getDataset()
        let transformedData = applyTransformations(
          data,
          this.transform
        )

        return new DataContainer(transformedData)
      }
    },

    dataScopeID () {
      let id
      if (this.$attrs.id) {
        // use id if given
        id = this.$attrs.id
      } else if (this.$vnode.data.staticClass) {
        // fall back on class if no id is given
        let elClass = this.$vnode.data.staticClass.replace(/\s+/g, '_')
        id = elClass + '_' + this.uuid
      } else {
        id = '_' + this.uuid
      }
      return id
    }
  },

  beforeDestroy () {
    this.$$dataManager.remove(this.dataScopeID)
  },

  created () {
    this.$$dataManager.register(this.dataScopeID, this.dataContainer)
  },

  watch: {
    dataScopeID (newVal, oldVal) {
      this.$$dataManager.rename(newVal, oldVal)
    },

    dataContainer () {
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
