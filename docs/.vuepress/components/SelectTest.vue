<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="data"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :axes="{
        left: { scale: 'b' },
        bottom: { scale: 'a' }
      }"
      :select="'rectangle'"
      :selection-bounds.sync="selectionBounds"
    >

      <vgg-map v-slot="{ row, i }">
        <vgg-point
          :x="{ val: row.a, scale: 'a' }"
          :y="{ val: row.b, scale: 'b' }"
          :fill="selectedPoints[i] ? 'blue' : 'black'"
          @select="handleSelect(i, true)"
          @deselect="handleSelect(i, false)"
        />
      </vgg-map>

    </vgg-section>

    <vgg-polygon
      v-if="selectionBounds.length > 1"
      :points="selectionBounds"
      :fill="'red'"
      :opacity="0.2"
    />

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      selectionBounds: [],
      selectedPoints: {},

      data: {
        a: new Array(50).fill(0).map((_, i) => Math.random() * i),
        b: new Array(50).fill(0).map((_, i) => Math.random() * i)
      }
    }
  },

  methods: {
    handleSelect (i, add) {
      if (add) {
        this.$set(this.selectedPoints, i, true)
      } else {
        this.$delete(this.selectedPoints, i)
      }
    }
  }
}
</script>
