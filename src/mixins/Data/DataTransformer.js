import DataContainer from '../../classes/DataContainer'

export default {
  inject: ['$$dataContainerContext'],

  props: {
    _: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  computed: {
    $$dataContainer () {
      return this.$$dataContainerContext.dataContainer
    },

    dataContainer () {
      if (this._) {
        let data = this.applyTransformations()
        return new DataContainer(data)
      }
    }
  },

  methods: {
    applyTransformations () {
      let data = this.$$dataContainer.getDataset()

      if (this._.constructor === Array) {
        for (let transformation of this._) {
          data = this.applyTranformation(data, transformation)
        }
      }

      if (this._.constructor === Object) {
        data = this.applyTranformation(data, this._)
      }

      return data
    },

    applyTranformation (data, transformation) {
      if (transformation.constructor !== Object) {
        throw new Error('Transformation(s) must be specified as objects')
      }

      checkKey(transformation)

      // TODO
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

// https://dplyr.tidyverse.org/articles/dplyr.html#single-table-verbs
const allowedKeys = [
  'filter', 'arrange', 'select',
  'rename', 'mutate', 'transmute',
  'summarise', 'sampleN', 'sampleFrac'
]

function checkKey (obj) {
  let keys = Object.keys(obj)
  if (keys.length !== 1) {
    throw new Error('Invalid transformation syntax')
  }

  if (!allowedKeys.includes(keys[0])) {
    throw new Error(`Unknown transformation ${keys[0]}`)
  }
}
