import DataContainer from '@/classes/DataContainer'

export default {
  inject: ['$$dataContainerContext'],

  props: {
    data: {
      type: [Array, Object, undefined],
      default: undefined
    },

    metadata: {
      type: [Object, undefined],
      default: undefined
    }
  },

  computed: {
    $$dataContainer () {
      return this.$$dataContainerContext.dataContainer
    },

    dataContainer () {
      if (this.data) {
        return new DataContainer(this.data, this.metadata)
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
