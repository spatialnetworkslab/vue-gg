<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

import { extractMappings, mapRow, applyPositioners } from './utils/mappings.js'

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

  render (createElement) {
    let mappings = null
    let mappedProps = [] // this will contain one array for each component
    // in the slot. Each of those arrays will be as long as the data length

    let context = this.context

    let components = []

    this.$$dataInterface.forEachRow(scope => {
      let slotContent = this.$scopedSlots.default(scope)
      slotContent = slotContent.constructor === Array ? slotContent : [slotContent]
      slotContent = slotContent.filter(component => component.tag !== undefined)

      components.push(slotContent)

      // If this is the first row, we will extract the mappings
      if (mappings === null) {
        mappings = []
        // We will do this for each entry in the slot
        slotContent.forEach(element => {
          mappings.push(extractMappings(element.componentOptions.propsData, context))
          mappedProps.push([])
        })
      }

      // With the mappings parsed, we will apply them to each
      // component in the slot
      slotContent.forEach((element, i) => {
        mappedProps[i].push(mapRow(
          element.componentOptions.propsData, mappings[i]
        ))
      })
    })

    // Apply positioners for all components in the slot
    mappings.forEach((mapping, i) => {
      mappedProps[i] = applyPositioners(mappedProps[i], mapping.positioners, context)
    })

    let mappedComponents = []
    this.$$dataInterface.forEachRow(({ i }) => {
      let slotComponents = components[i]
      slotComponents.forEach((c, j) => {
        slotComponents[j].componentOptions.propsData = mappedProps[j][i]
      })

      mappedComponents.push(...slotComponents)
    })

    return createElement('g', { class: 'map' }, mappedComponents)
  }
}
</script>
