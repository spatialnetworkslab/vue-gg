<template>
  <div>
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
        :scale-x="[0, 1]"
        :scale-y="[0, 1]"
        :axes="{
          left: { scale: 'b' },
          bottom: { scale: 'a' }
        }"
        :select="{
          type: 'rectangle',
          scaleX: 'a',
          scaleY: 'b'
        }"
        :selection-bounds.sync="selectionBounds"
        @selectionDone="log($event)"
      >

        <vgg-rectangle
          :x1="0"
          :x2="1"
          :y1="0"
          :y2="1"
          :fill="'blue'"
          :opacity="0.4"
        />

        <vgg-map v-slot="{ row, i }">
          <vgg-point
            :x="{ val: row.a, scale: 'a' }"
            :y="{ val: row.b, scale: 'b' }"
            :fill="selectedPoints[i] ? 'yellow' : 'black'"
            @select="handleSelect(i, true)"
            @deselect="handleSelect(i, false)"
          />
        </vgg-map>

      </vgg-section>

      <vgg-polygon
        v-if="selectionBounds.length > 1"
        :points="selectionBounds"
        :fill="'red'"
        :opacity="0.6"
      />

    </vgg-graphic>
  </div>
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
    log: console.log,

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
