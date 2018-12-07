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
    let $$dataContainer = this.DataContainer

    return { $$dataContainer }
  }
}
