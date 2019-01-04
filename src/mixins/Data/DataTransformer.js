import DataContainer from '../../classes/DataContainer'
import applyTranformation from '../../transformations/applyTransformation.js'
import cloneDeep from 'lodash.clonedeep'

export default {
  inject: ['$$dataContainerContext'],

  props: {
    trans: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  computed: {
    $$dataContainer () {
      return this.$$dataContainerContext.dataContainer
    },

    dataContainer () {
      if (this.$$dataContainer) {
        if (this.trans) {
          let data = this.applyTransformations()
          return new DataContainer(data)
        } else {
          return this.$$dataContainer
        }
      }
    }
  },

  methods: {
    applyTransformations () {
      let data = cloneDeep(this.$$dataContainer.getDataset())

      if (this.trans.constructor === Array) {
        for (let i = 0; i < this.trans.length; i++) {
          let transformation = this.trans[i]
          if (transformation.hasOwnProperty('groupBy')) {
            let next = this.trans[i + 1]
            if (!nextIsSummarise(next)) {
              throw new Error('groupBy must always be followed by summarise')
            }
          }

          data = applyTranformation(data, transformation)
        }
      }

      if (this.trans.constructor === Object) {
        if (this.trans.hasOwnProperty('groupBy')) {
          throw new Error('groupBy must always be followed by summarise')
        }
        data = applyTranformation(data, this.trans)
      }

      console.log(data)

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

function nextIsSummarise (next) {
  return next && (next.hasOwnProperty('summarise') || next.hasOwnProperty('summarize'))
}
