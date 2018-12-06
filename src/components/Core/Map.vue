<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },

    mapping: {
      type: Object,
      required: true
    }
  },

  render (h) {
    let slotContent = this.$slots.default[0]
    let tag = slotContent.componentOptions.tag

    let components = []

    for (let i = 0; i < this.data.length; ++i) {
      let row = this.data[i]
      let props = {}

      for (let key in this.mapping) {
        props[key] = this.mapping[key](row, i)
      }

      components.push(h(tag, { props }))
    }

    return h('g', components)
  }
}
</script>
