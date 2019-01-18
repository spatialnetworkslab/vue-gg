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
      randomID: undefined,

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
    this.randomID = id()
    if (this.container) {
      this.register(this.dataScopeID, this.container)
    }
  },

  watch: {
    dataScopeID: 'rename',
    container () {
      this.update(this.dataScopeID, this.container)
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

    hasColumn (id, colName) {
      return this.containers[id].hasColumn(colName)
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
