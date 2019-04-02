<template>
  <vgg-graphic
    :width="500"
    :height="500"
  >

    <vgg-grid
      :cols="2"
      :layout-padding="20"
      :cell-padding="{ l: 7, r: 20, b: 4 }"
    >

      <!-- <vgg-section
        v-for="s in range(5)"
        :key="s"
        :scale-x="[0, 1]"
        :scale-y="[0, 1]"
      >

        <vgg-rectangle
          :x1="0"
          :x2="1"
          :y1="0"
          :y2="1"
          :fill="randomColor()"
        />

      </vgg-section> -->
      <custom-square-component
        v-for="s in range(5)"
        :key="s"
        :fill="randomColor()"
      />

    </vgg-grid>

  </vgg-graphic>
</template>

<script>
import CustomSquareComponent from './CustomSquareComponent.vue'

export default {
  components: { CustomSquareComponent },

  methods: {
    range (n) {
      return new Array(n).fill(0).map((v, i) => i)
    },

    randomColor () {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let a = Math.floor(Math.random() * 50 + 50) / 100

      return `rgba(${r}, ${g}, ${b}, ${a})`
    }
  }
}
</script>
