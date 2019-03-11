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

          return Object.freeze(new DataContainer(transformedData))
        } else {
          return Object.freeze(container)
        }
      }
    },

    dataScopeID () {
      let id
      if (this.$attrs.id) {
        // use id if given
        id = this.$attrs.id
      } else if (this.$vnode.data.staticClass) {
        // fall back on class if no id is given
        let elClass = this.$vnode.data.staticClass.replace(/\s+/g, '_')
        id = elClass + '_' + this.randomID
      } else {
        id = '_' + this.randomID
      }
      return id
    }
  },

  created () {
    this.register(this.dataScopeID, this.dataContainer)
  },

  watch: {
    dataScopeID (newVal, oldVal) {
      this.rename(newVal, oldVal)
    },

    data (newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.update(this.dataScopeID, this.dataContainer)
      }
    },

    transform (newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.update(this.dataScopeID, this.dataContainer)
      }
    }
  },

  methods: {
    register (id, dataContainer) {
      if (this.hasContainer(id)) {
        throw new Error('Duplicate data ID')
      }
      if (dataContainer) {
        this.$set(this.containers, id, dataContainer)
      }
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
