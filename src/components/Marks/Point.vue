<script>
import ContextReceiver from '@/mixins/Context/ContextReceiver.js'

export default {
  name: 'Point',

  mixins: [ContextReceiver],

  props: {
    x: {
      type: Number,
      default: 0
    },

    y: {
      type: Number,
      default: 0
    },

    radius: {
      type: Number,
      default: 3
    },

    color: {
      type: String,
      default: '#000000'
    },

    anchorPoint: {
      type: String,
      default: 'center'
    }
  },

  computed: {
    screenCoords () {
      if (this.anchorPoint === 'center') {
        return this.transformer([this.x, this.y])
      }
    }
  },

  render (h) {
    return h('circle', {
      attrs: {
        'cx': this.screenCoords[0],
        'cy': this.screenCoords[1],
        'r': this.radius,
        'fill': this.color,
        'stroke-width': 0
      }
    })
  }
}
</script>
