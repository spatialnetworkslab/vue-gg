<template>
  <vgg-graphic
    :width="800"
    :height="180"
    :data="shapes">

    <vgg-map v-slot="{ row }">
      <vgg-symbol
        :y="110"
        :x="{ val: row.name, scale: 'name' }"
        :size="20"
        :shape="row.name"
        :fill="{ val: row.name, scale: { range: ['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange'], domain: 'name' } }"
      />
    </vgg-map>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    shapes () {
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
    }
  }

}
</script>
