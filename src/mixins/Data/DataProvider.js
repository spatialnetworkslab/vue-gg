import DataContainer from '../../classes/Data/DataContainer.js'
import applyTransformations from '../../transformations/applyTransformations.js'
import { createPropCache, createWatchers } from '../../components/Core/utils/propCache.js'

export default {
  inject: ['$$dataManager', '$$dataScope'],

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
    },

    dataID: {
      type: [String, undefined],
      default: undefined
    }
  },

  data () {
    return {
      dataProviderCache: createPropCache(this, ['transform'])
    }
  },

  computed: {
    dataContainer () {
      if (this.data) {
        let container = new DataContainer(this.data, this.format)
        if (this.dataProviderCache.transform) {
          let transformedData = applyTransformations(
            container.getDataset(),
            this.dataProviderCache.transform
          )

          return new DataContainer(transformedData)
        } else {
          return container
        }
      }

      if (!this.data && this.dataProviderCache.transform) {
        let data = this.parentDataInterface.getDataset()
        let transformedData = applyTransformations(
          data,
          this.dataProviderCache.transform
        )

        return new DataContainer(transformedData)
      }
    },

    dataScopeID () {
      if (this.dataID) { return this.dataID }
      return '_' + this.uuid
    },

    parentDataInterface () {
      return this.$$dataManager.createInterface(this.$$dataScope)
    },

    $$dataInterface () {
      console.log('retrigger $$dataInterface')
      if (this.data || this.dataProviderCache.transform) {
        // use own scope
        return this.$$dataManager.createInterface(this.dataScopeID)
      } else {
        // use parent scope
        return this.parentDataInterface
      }
    }
  },

  beforeDestroy () {
    this.$$dataManager.remove(this.dataScopeID)
  },

  created () {
    createWatchers(this, this.dataProviderCache)
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
