<template>
  <vgg-graphic
    :width="800"
    :height="800"
    :data="data"
  >

    <vgg-repeat
      v-slot="{ x, y, sides }"
      :x="['a', 'b', 'c']"
      :y="['a', 'b', 'c']"
      :cell-padding="12"
      :sides="['bottom', 'right']"
    >

      <vgg-section
        :grid-lines="{
          x: { scale: x },
          y: { scale: y }
        }"
        :axes="{
          bottom: { scale: x, labelRotate: true },
          right: { scale: y }
        }"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="{ val: row[x], scale: x }"
            :y="{ val: row[y], scale: y }"
            :fill="{ val: row[x], scale: x }"
          />

        </vgg-map>

      </vgg-section>

    </vgg-repeat>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let a = new Array(100).fill(0).map((v, i) => i + Math.random() * 5)
      let b = new Array(100).fill(0).map((v, i) => i + Math.random() * 15)
      let c = new Array(100).fill(0).map((v, i) => i + Math.random() * 25)
      return { a, b, c }
    }
  }
}
</script>
