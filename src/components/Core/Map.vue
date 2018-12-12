<script>
import DataReceiver from '@/mixins/DataReceiver.js'
import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'

import createScale from '@/scales/createScale.js'
import createPositioner from '@/positioners/createPositioner.js'

import { is } from '@/utils/equals.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser],

  props: {
    assign: {
      type: [Object, undefined],
      default: undefined
    },

    scale: {
      type: Object,
      required: true
    },

    position: {
      type: [Object, undefined],
      default: undefined
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

      let parsedMapping = {}

      // First, assigning. This just gives a constant value to all marks.
      for (let propKey in this.assign) {
        parsedMapping[propKey] = this.assign[propKey]
      }

      // Second, scaling. Might overwrite assignments
      for (let propKey in this.scale) {
        let variableScaling = this.scale[propKey]

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
          parsedMapping[propKey] = createScale(propKey, context, {
            variable: variableScaling
          })
        }

        if (variableScaling.constructor === Object) {
          // 2. Scaling the variable by a shorthand scale with custom settings.
          // In this case we need an object with settings with at least a 'variable' key.
          if (!variableScaling.construct) {
            parsedMapping[propKey] = createScale(propKey, context, variableScaling)
          }

          // 3. Scaling the variable by constructing your own scale.
          // In this case we need a 'construct' function. 'variable' key is optional.
          if (variableScaling.construct) {
            parsedMapping[propKey] = variableScaling.construct(context)
          }
        }

        // 4. Scaling the variable by using a getter function that takes (row, i)
        if (variableScaling.constructor === Function) {
          parsedMapping[propKey] = variableScaling
        }
      }

      // Third, applying the mapping and constructing the props for every  mark
      let propsPerMark = []

      this.$$dataContainer.forEachRow((row, i) => {
        let props = {}

        for (let key in parsedMapping) {
          // Now we will use the assigned values and scaling to calculate prop values.

          // If a scale has been specified:
          if (is(this.scale[key])) {
            // If the scale is a string, it is assumed to be the identifier of
            // a variable.
            if (this.scale[key].constructor === String) {
              let variable = this.scale[key]
              props[key] = parsedMapping[key](row[variable])
            }

            // If the scale is an object:
            if (this.scale[key].constructor === Object) {
              // If this.scaling[key].variable is specified, it will be used
              // as the identifier of a variable.
              if (this.scale[key].hasOwnProperty('variable')) {
                let variable = this.scale[key].variable
                props[key] = parsedMapping[key](row[variable])
              } else {
                // If this.scaling[key].variable is not specified, we will pass the
                // entire row to the mapping function instead of just the value for
                // that variable in that row.
                props[key] = parsedMapping[key](row)
              }
            }

            // If a function was passed, we will pass the entire row to that function
            if (this.scale[key].constructor === Function) {
              props[key] = parsedMapping[key](row, i)
            }
          } else if (is(this.assign[key])) {
            // Finally, if no scaling is happening,
            // we will check if there is anything that should be assigned.
            props[key] = this.assign[key]
          }
        }

        propsPerMark.push(props)
      })

      // Fourth, we will apply positioning if necessary
      if (this.position) {
        for (let propKey in this.position) {
          let position = createPositioner(propKey, context, this.position[propKey])
          position(propsPerMark) // Positioners work in-place
        }
      }

      let components = propsPerMark.map(props => h(tag, { props }))
      return h('g', components)
    }

    if (!this.$$dataContainer) {
      return h('g')
    }
  }
}
</script>
