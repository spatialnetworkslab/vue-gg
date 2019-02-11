<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{ a: [1, 2, 3], b: [4, 5, 6] }"
  >

    <vgg-grid :cols="2">

      <vgg-map v-slot="{ row }">

        <vgg-section
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

        </vgg-section>

      </vgg-map>

    </vgg-grid>

  </vgg-graphic>
</template>

<script>
export default {
  methods: {
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
