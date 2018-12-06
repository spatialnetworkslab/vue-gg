<template>
  <vgg-glyph
    :x="x"
    :y="y"
    :width="wh"
    :height="wh">

    <vgg-coordinate-transformation
      :type="transformation"
      :x="0"
      :x2="wh"
      :y="0"
      :y2="wh"
      :domains="{
        x: [0, 100],
        y: [0, 100]
      }"
    >

      <vgg-rectangle
        v-for="(rect, i) in rectangles"
        :key="i"
        :x="rect.x"
        :x2="rect.x2"
        :y="rect.y"
        :y2="rect.y2"
        :color="rect.color"
      />

    </vgg-coordinate-transformation>

  </vgg-glyph>
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      required: true
    },

    y: {
      type: Number,
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
        { x: 0, x2: 15, y: 0, y2: 100, color: 'green' },
        { x: 15, x2: 50, y: 0, y2: 100, color: 'red' },
        { x: 50, x2: 75, y: 0, y2: 100, color: 'yellow' },
        { x: 75, x2: 100, y: 0, y2: 100, color: 'blue' }
      ]

      return rectangles
    }
  }
}
</script>
