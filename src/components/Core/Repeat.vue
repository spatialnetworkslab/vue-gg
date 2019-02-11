<script>
export default {
  props: {
    x: {
      type: [Array, undefined],
      default: undefined
    },

    y: {
      type: [Array, undefined],
      default: undefined
    }
  },

  methods: {
    validateSlotContent (slotContent) {
      let definedElements = slotContent.filter(c => c.tag !== undefined)
      if (definedElements.some(c => c.componentOptions.tag !== 'vgg-section')) {
        throw new Error(`vgg-repeat can only contain sections`)
      }
    },

    validateProps () {
      if (this.x === undefined && this.y === undefined) {
        return false
      }

      if (this.x) {

      }

      if (this.y) {
        
      }

      return true
    }
  },

  render (createElement) {
    let slotContent = this.$slots.default
    this.validateSlotContent(slotContent)

    let allowed = this.validateProps()

    if (allowed) {
      return createElement()
    }
  }
}
</script>
