<template>
  <vgg-graphic
    :width="800"
    :height="180"
    :data="test">

    <vgg-map v-slot="{ row }">

      <vgg-label
        :y="60"
        :x="{ val: row.name, scale: 'name' }"
        :text="{ val: row.name }"
      />

      <vgg-symbol
        :y="110"
        :x="{ val: row.name, scale: 'name' }"
        :size="20"
        :shape="row.name"
      />

    </vgg-map>

  </vgg-graphic>
</template>

<script>
export default {
  props: {
    scheme: {
      type: String,
      default: 'shape8'
    }
  },

  computed: {
    test () {
      if (this.scheme === 'shape8') {
        return [
          { name: 'circle' },
          { name: 'square' },
          { name: 'triangle-up' },
          { name: 'diamond' },
          { name: 'cross' },
          { name: 'star' },
          { name: 'hexagon' },
          { name: 'cross-sharp' },
        ]
      } else if (this.scheme === 'triangles') {
        return [
          { name: 'triangle-up' },
          { name: 'triangle-down' },
          { name: 'triangle-left' },
          { name: 'triangle-right' },
        ]
      } else if (this.scheme === 'stars') {
        return [
          { name: 'star4' },
          { name: 'star5' },
          { name: 'star6' },
          { name: 'star8' },
        ]
      } else if (this.scheme === 'polygons') {
        return [
          { name: 'triangle-up' },
          { name: 'square' },
          { name: 'pentagon' },
          { name: 'hexagon' },
          { name: 'octagon' },
          { name: 'decagon' },
        ]
      } else if (this.scheme === 'custom') {
        return [
          { name: 'circle' },
          { name: 'star' },
          { name: 'M-1,-1H1V1H-1Z' },
          { name: 'diamond' },
        ]
      }
    }
  }

}
</script>
