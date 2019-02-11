<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import { initMappings, extractMappings, mapRow } from './utils/mappings.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser, ScaleReceiver],

  inject: ['$$grid'],

  props: {
    unit: {
      type: String,
      default: 'row',
      validator: u => ['row', 'dataframe'].includes(u)
    }
  },

  computed: {
    context () {
      return {
        ranges: this.parentBranch.domains,
        parentBranch: this.parentBranch,
        dataInterface: this.$$dataInterface,
        scaleManager: this.$$scaleManager
      }
    }
  },

  methods: {
    mapRows () {
      let mappings = null
      let context = this.context

      let mappedElements = []

      this.$$dataInterface.forEachRow(scope => {
        let slotContent = this.$scopedSlots.default(scope)

        if (mappings === null) { mappings = initMappings(slotContent) }
        mappings = extractMappings(mappings, slotContent, context)

        let mappedContent = mapRow(slotContent, mappings, scope.i)
        mappedElements.push(...mappedContent)
      })

      return mappedElements
    },

    mapDataframe () {
      let context = this.context

      let dataframe = this.$$dataInterface.getDataset()
      let scope = { dataframe }

      let slotContent = this.$scopedSlots.default(scope)

      let mappings = initMappings(slotContent)
      mappings = extractMappings(mappings, slotContent, context)

      let mappedElements = mapRow(slotContent, mappings, 0)
      return mappedElements
    },

    validateSections (elements) {
      console.log(elements)
      // return elements.every(el => )
    }
  },

  provide () {
    return { $$grid: false }
  },

  render (createElement) {
    let elements

    if (this.unit === 'row') {
      elements = this.mapRows()
    }

    if (this.unit === 'dataframe') {
      elements = this.mapDataframe()
    }

    if (this.$$grid !== false) {

    }

    return createElement('g', { class: 'map' }, elements)
  }
}
</script>
