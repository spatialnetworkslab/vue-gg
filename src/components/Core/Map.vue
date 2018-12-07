<script>
import DataReceiver from '@/mixins/DataReceiver.js'
import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser],

  props: {
    mapping: {
      type: Object,
      required: true
    }
  },

  render (h) {
    if (this.$$dataContainer) {
      let slotContent = this.$slots.default[0]
      let tag = slotContent.componentOptions.tag

      let parsedMapping = {}

      let context = {
        domains: this.$$dataContainer.getDomains(),
        metadata: this.$$dataContainer.getMetadata(),
        ranges: this.$$coordinateTree.getBranch(this.$$coordinateTreeParent).domains
      }

      for (let key in this.mapping) {
        let variableMapping = this.mapping[key]

        // The variable mapping can be specified in three ways:
        // - Mapping the variable directly without transformation (identity)
        // - Mapping the variable by a shorthand mapping function
        // - Mapping the variable by a custom function
        //
        // These three ways are specified through the constructor of the
        // variableMapping variable. Respectively:

        // Direct mapping (identity)
        if (variableMapping.constructor === String) {
          parsedMapping[key] = (row, index) => row[variableMapping]
        }

        // Shorthand mapping (linear, log etc)
        if (variableMapping.constructor === Object) {
          if (variableMapping.type === 'scale') {
            // TODO
          }

          if (variableMapping.type === 'positioner') {
            // TODO
          }
        }

        // Custom mapping function
        if (variableMapping.constructor === Function) {
          // The variableMapping function here will return another function
          // that takes the row and i as an argument
          parsedMapping[key] = variableMapping(context)
        }
      }

      let components = []

      this.$$dataContainer.forEachRow((row, i) => {
        let props = {}

        for (let key in parsedMapping) {
          props[key] = parsedMapping[key](row, i)
        }

        components.push(h(tag, { props }))
      })

      return h('g', components)
    }

    if (!this.$$dataContainer) {
      return h('g')
    }
  }
}
</script>
