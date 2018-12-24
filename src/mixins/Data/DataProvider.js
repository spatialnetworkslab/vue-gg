import DataContainer from '@/classes/DataContainer'

export default {
  props: {
    data: {
      type: [Array, Object, undefined],
      default: undefined
    },

    dataType: {
      type: [String, undefined],
      default: undefined
    }
  },

  computed: {
    dataContainer () {
      if (this.data) {
        return new DataContainer(this.data, this.dataType)
      }
    }
  },

  provide () {
    let $$dataContainerContext = this

    return { $$dataContainerContext }
  }
}
