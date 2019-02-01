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
    let mappedElements = []

    this.$$dataInterface.forEachRow(props => {
      let slotContent = this.$scopedSlots.default(props)
      mappedElements.push(slotContent)
    })

    return createElement('g', { class: 'map' }, mappedElements)
  }
}
</script>
