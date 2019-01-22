import DataContainer from '../../classes/Data/DataContainer.js'
import DataInterface from '../../classes/Data/DataInterface.js'
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
      randomID: id(),

      containers: {}
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

  mounted () {
    this.register(this.dataScopeID, this.dataContainer)
  },

  watch: {
    dataScopeID (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.rename(newVal, oldVal)
      }
    },
    dataContainer (newVal, oldVal) {
      this.update(this.dataScopeID, this.dataContainer)
    }
  },

  methods: {
    register (id, dataContainer) {
      if (this.hasContainer(id)) {
        throw new Error('Duplicate data ID')
      }

      this.$set(this.containers, id, dataContainer)
    },

    hasContainer (id) {
      return this.containers.hasOwnProperty(id)
    },

    getContainer (id) {
      return this.containers[id]
    },

    rename (newID, oldID) {
      if (newID !== oldID) {
        this.$set(this.containers, newID, this.containers[oldID])
        this.$delete(this.containers, this.oldID)
      }
    },

    update (id, dataContainer) {
      this.$set(this.containers, id, dataContainer)
    },

    remove (id) {
      this.$delete(this.containers, id)
    },

    createInterface (id) {
      let dataInterface = new DataInterface(this)
      dataInterface.setScope(id)

      return dataInterface
    }
  },

  provide () {
    let $$dataManager = this
    let $$dataScope = this.dataScopeID

    return { $$dataManager, $$dataScope }
  }
}
