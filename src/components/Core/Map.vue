<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

export default {
  mixins: [DataReceiver, CoordinateTreeUser],

  props: {
    unit: {
      type: String,
      default: 'row',
      validator: u => ['row', 'dataframe'].includes(u)
    }
  },

  render (createElement) {
    // let parsedScales = []

    let mappedElements = []

    this.$$dataInterface.forEachRow(props => {
      let slotContent = this.$scopedSlots.default(props)
      slotContent = slotContent.constructor === Array ? slotContent : [slotContent]

      // For every element in our slot, check what kind of element it is
      for (let element of slotContent) {
        console.log(element.componentOptions.propsData)
      }

      mappedElements.push(slotContent)
    })

    return createElement('g', { class: 'map' }, mappedElements)
  }
}
</script>
