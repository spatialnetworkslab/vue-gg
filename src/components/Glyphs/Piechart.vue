<template>
  <vgg-glyph
    :x="x"
    :y="y"
    :width="wh"
    :height="wh">

    <vgg-section
      :type="transformation"
      :x1="0"
      :x2="wh"
      :y1="0"
      :y2="wh"
      :domains="{
        x: [0, 100],
        y: [0, 100]
      }"
    >

      <vgg-rectangle
        v-for="(rect, i) in rectangles"
        :key="i"
        :x1="rect.x1"
        :x2="rect.x2"
        :y1="rect.y1"
        :y2="rect.y2"
        :color="rect.color"
      />

    </vgg-section>

  </vgg-glyph>
</template>

<script>
export default {
  props: {
    x: {
      type: [Number, Object, Function],
      required: true
    },

    y: {
      type: [Number, Object, Function],
      required: true
    },

    radius: {
      type: Number,
      required: true
    },

    transformation: {
      type: String,
      default: 'polar'
    }
  },

  computed: {
    wh () {
      return this.radius * 2
    },

    rectangles () {
      let rectangles = [
        { x1: 0, x2: 15, y1: 0, y2: 100, color: 'green' },
        { x1: 15, x2: 50, y1: 0, y2: 100, color: 'red' },
        { x1: 50, x2: 75, y1: 0, y2: 100, color: 'yellow' },
        { x1: 75, x2: 100, y1: 0, y2: 100, color: 'blue' }
      ]

      return rectangles
    }
  }
}
</script>
