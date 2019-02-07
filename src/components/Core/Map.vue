<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

import { initMappings, extractMappings, mapRow } from './utils/mappings.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser],

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
        slotContent = mapRow(slotContent, mappings)

        mappedElements.push(...slotContent)
      })

      return mappedElements
    }

    // mapDataframe (createElement) {
    //   let context = this.context
    //   let dataframe = this.$$dataInterface.getDataset()
    //   let scope = { dataframe }
    //
    //   let slotContent = this.$scopedSlots.default(scope)
    //   slotContent = slotContent.filter(component => component.tag !== undefined)
    //
    //   let mappings = []
    //   let mappedProps = []
    //
    //   slotContent.forEach(element => {
    //     mappings.push(extractMappings(element.componentOptions.propsData, context))
    //     mappedProps.push([])
    //   })
    // },
  },

  render (createElement) {
    let elements
    if (this.unit === 'row') {
      elements = this.mapRows()
    }

    // if (this.unit === 'dataframe') {
    //   return this.mapDataframe(createElement)
    // }

    return createElement('g', { class: 'map' }, elements)
  }
}
</script>
