<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      class="graphic">

      <vgg-coordinate-system
        :x="0"
        :x2="800"
        :y="0"
        :y2="800"
        system="conformal"
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

      </vgg-coordinate-system>

    </vgg-graphic>

  </div>
</template>

<script>
export default {
  name: 'ComplexMapping',

  computed: {
    rectangles () {
      let interpolated = []
      for (let i = 0; i < 21; i++) {
        interpolated.push(-100 + i * 10)
      }

      let rectangles = []
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          let rectangle = {
            x: interpolated[i],
            x2: interpolated[i + 1],
            y: interpolated[j],
            y2: interpolated[j + 1],
            color: this.getColor(i, j)
          }
          rectangles.push(rectangle)
        }
      }

      return rectangles
    }
  },

  methods: {
    getColor (i, j) {
      let white = '#ffffff'
      let black = '#000000'

      return (i + j) % 2 === 0 ? black : white
    }
  }
}
</script>
