import DataContainer from '../../classes/DataContainer'

export default {
  props: {
    data: {
      type: [Array, Object, undefined],
      default: undefined
    },

    format: {
      type: [String, undefined],
      default: undefined
    }
  },

  computed: {
    dataContainer () {
      if (this.data) {
        return new DataContainer(this.data, this.format)
      }
    }
  },

  provide () {
    let $$dataContainerContext = this

    return { $$dataContainerContext }
  }
}
