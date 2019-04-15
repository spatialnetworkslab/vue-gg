<script>
import Mark from '../../mixins/Marks/Mark.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date],
      required: true
    },

    y: {
      type: [Number, String, Date],
      required: true
    },

    fill: {
      type: String,
      default: '#000000'
    },

    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 0
    },

    radius: {
      type: Number,
      default: 3
    },

    opacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    transition: {
      type: Number,
      default: 0
    }
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events.length > 0) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    renderSVG (createElement) {
      return renderSVG(
        createElement, this.$$transform, this._props, this.events, this.addToSpatialIndex
      )
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'point', coordinates, this, events, this.sectionParentChain)
    }
  }
}

export function renderSVG (createElement, $$transform, props, events, addToSpatialIndex) {
  let [cx, cy] = $$transform([props.x, props.y])

  if (events.length > 0) {
    addToSpatialIndex([cx, cy], events)
  }

  return createElement('circle', {
    attrs: {
      'cx': cx,
      'cy': cy,
      'r': props.radius
    },
    style: createSVGStyle(props)
  })
}
</script>
