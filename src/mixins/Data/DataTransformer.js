import DataContainer from '../../classes/DataContainer'
import applyTransformations from '../../transformations/applyTransformations.js'

export default {
  inject: ['$$dataContainerContext'],

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
    $$dataContainer () {
      return this.$$dataContainerContext.dataContainer
    },

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

      if (this.$$dataContainer) {
        if (this.transform) {
          let transformedData = applyTransformations(
            this.$$dataContainer.getDataset(),
            this.transform
          )

          return new DataContainer(transformedData)
        } else {
          return this.$$dataContainer
        }
      }
    }
  },

  provide () {
    if (this.dataContainer) {
      let $$dataContainerContext = this

      return { $$dataContainerContext }
    }
  }
}
