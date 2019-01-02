import DataContainer from '../../classes/DataContainer'
import applyTranformation from '../../transformations/applyTransformation.js'

export default {
  inject: ['$$dataContainerContext'],

  props: {
    trans: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  computed: {
    $$dataContainer () {
      return this.$$dataContainerContext.dataContainer
    },

    dataContainer () {
      if (this.$$dataContainer) {
        if (this.trans) {
          let data = this.applyTransformations()
          return new DataContainer(data)
        } else {
          return this.$$dataContainer
        }
      }
    }
  },

  methods: {
    applyTransformations () {
      let data = this.$$dataContainer.getDataset()

      if (this.trans.constructor === Array) {
        for (let transformation of this.trans) {
          data = applyTranformation(data, transformation)
        }
      }

      if (this.trans.constructor === Object) {
        data = applyTranformation(data, this.trans)
      }

      return data
    }
  },

  provide () {
    if (this.dataContainer) {
      let $$dataContainerContext = this

      return { $$dataContainerContext }
    }
  }
}
