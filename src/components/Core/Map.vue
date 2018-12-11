<script>
import DataReceiver from '@/mixins/DataReceiver.js'
import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'

import createScale from '@/scales/createScale.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser],

  props: {
    scaling: {
      type: Object,
      required: true
    }
  },

  render (h) {
    if (this.$$dataContainer) {
      let slotContent = this.$slots.default[0]
      let tag = slotContent.componentOptions.tag

      let context = {
        domains: this.$$dataContainer.getDomains(),
        metadata: this.$$dataContainer.getMetadata(),
        ranges: this.$$coordinateTree.getBranch(this.$$coordinateTreeParent).domains
      }

      // First, scaling
      let parsedScaling = {}

      for (let propKey in this.scaling) {
        let variableScaling = this.scaling[propKey]

        // The variable scaling can be specified in four ways:
        // 1. Scaling the variable by a shorthand scale with the default settings
        // 2. Scaling the variable by a shorthand scale with custom settings
        // 3. Scaling the variable by constructing your own scale
        // 4. Scaling a variable by using a getter function
        //
        // These four ways are specified through the constructor of the
        // variableScaling variable. Respectively:

        // 1. Scaling the variable by a shorthand scale with the default settings.
        // Here we just need to a string id of the variable
        if (variableScaling.constructor === String) {
          parsedScaling[propKey] = createScale(propKey, context, {
            variable: variableScaling
          })
        }

        if (variableScaling.constructor === Object) {
          // 2. Scaling the variable by a shorthand scale with custom settings.
          // In this case we need an object with settings with at least a 'variable' key.
          if (!variableScaling.construct) {
            parsedScaling[propKey] = createScale(propKey, context, variableScaling)
          }

          // 3. Scaling the variable by constructing your own scale.
          // In this case we need a 'construct' function. 'variable' key is optional.
          if (variableScaling.construct) {
            parsedScaling[propKey] = variableScaling.construct(context)
          }
        }

        // 4. Scaling the variable by using a getter function that takes (row, i)
        if (variableScaling.constructor === Function) {
          parsedScaling[propKey] = variableScaling
        }
      }

      // Second, positioning.
      // TODO

      let parsedMapping = parsedScaling // for now

      // Third, applying the mapping
      let components = []

      this.$$dataContainer.forEachRow((row, i) => {
        let props = {}

        for (let key in parsedMapping) {
          //
          if (this.scaling[key].constructor === String) {
            let variable = this.scaling[key]
            props[key] = parsedMapping[key](row[variable])
          }

          // If this.scaling[key].variable is not specified, we will pass the
          // entire row to the mapping function instead of just the value for
          // that variable in that row.
          if (this.scaling[key].constructor === Object) {
            if (this.scaling[key].hasOwnProperty('variable')) {
              let variable = this.scaling[key].variable
              props[key] = parsedMapping[key](row[variable])
            } else {
              props[key] = parsedMapping[key](row)
            }
          }

          if (this.scaling[key].constructor === Function) {
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
