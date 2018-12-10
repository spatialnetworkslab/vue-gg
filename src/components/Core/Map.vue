<script>
import DataReceiver from '@/mixins/DataReceiver.js'
import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'

import createScale from '@/scales/createScale.js'

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

      for (let propKey in this.mapping) {
        let variableMapping = this.mapping[propKey]

        // The variable mapping can be specified in four ways:
        // 1. Mapping the variable directly without transformation (identity)
        // 2. Mapping the variable by a shorthand to a mapping function
        // 3. Mapping the variable by constructing a function
        // 4. Mapping a variable by giving a getter function
        //
        // These four ways are specified through the constructor of the
        // variableMapping variable. Respectively:

        // 1. Direct mapping (identity)
        if (variableMapping.constructor === String) {
          parsedMapping[propKey] = (row, index) => row[variableMapping]
        }

        if (variableMapping.constructor === Object) {
          // 2. Shorthand mapping (linear, log etc)
          if (variableMapping.type === 'scale') {
            parsedMapping[propKey] = createScale(propKey, context, variableMapping)
          }

          if (variableMapping.type === 'positioner') {
            // TODO
          }

          // 3. Mapping by constructing a function
          if (variableMapping.type === 'custom') {
            // The variableMapping.construct function here will return another
            // function constructed with the context object. The returned
            // function will take the row and i as an argument
            parsedMapping[propKey] = variableMapping.construct(context)
          }
        }

        // 4. Getter mapping function that takes (row, i)
        if (variableMapping.constructor === Function) {
          parsedMapping[propKey] = variableMapping
        }
      }

      let components = []

      this.$$dataContainer.forEachRow((row, i) => {
        let props = {}

        for (let key in parsedMapping) {
          // If this.mapping[key].variable is not specified, we will pass the
          // entire row to the mapping function instead of just the value for
          // that variable in that row.
          if (this.mapping[key].constructor === Object &&
              this.mapping[key].hasOwnProperty('variable')) {
            let variable = this.mapping[key].variable
            props[key] = parsedMapping[key](row[variable], i)
          } else {
            props[key] = parsedMapping[key](row, i)
          }
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
