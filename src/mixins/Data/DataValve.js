import DataContainer from '@/classes/DataContainer'

export default {
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
    dataContainer () {
      if (this.data) {
        return new DataContainer(this.data, this.metadata)
      }
    }
  },

  provide () {
    if (this.data) {
      let $$dataContainerContext = this

      return { $$dataContainerContext }
    }
  }
}
