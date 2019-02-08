<script>
export default {
  props: {
    layout: {
      type: Object,
      required: true
    }
  },

  methods: {
    validateChildren (children) {
      // Filter out undefined components (whitespace, v-if="false")
      let definedChildren = children.filter(c => c.tag !== undefined)

      if (definedChildren.some(c => c.componentOptions.tag !== 'vgg-section')) {
        throw new Error('Only Sections allowed as direct children in layout')
      }

      return definedChildren
    }
  },

  render (createElement) {
    let slotContent = this.$slots.default
    let sections = this.validateChildren(slotContent)

    
  }
}
</script>
