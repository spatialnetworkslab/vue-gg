<template>
  <div>

    <div>
      <button style="margin-top: 10px;" @click="getData()">Generate new data</button>
    </div>

    <vgg-graphic
      v-if="data"
      :width="800"
      :height="800"
      :data="data"
    >

      <vgg-plot-title text="Scatterplot Matrix" :vMargin="25" />

      <vgg-section
        :x1="50"
        :x2="750"
        :y1="50"
        :y2="750"
      >

        <vgg-repeat
          v-slot="{ x, y }"
          :x="['x', 'y', 'z', 'a', 'b']"
          :y="['x', 'y', 'z', 'a', 'b']"
          :cell-padding="10"
          :sides="['right', 'bottom']"
        >

          <vgg-section
            :axes="{
              right: { scale: y, flip: true, 'label-font-size': 10 },
              bottom: { scale: x, labelRotate: true, 'label-font-size': 8 }
            }"
            :grid-lines="{
              x: { scale: x },
              y: { scale: y }
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

      </vgg-section>

    </vgg-graphic>

  </div>

 
</template>

<script>
export default {
  name: 'ScatterplotMatrix',

  data () {
    return {
      data: undefined,
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    getData () {
      let points = []
      for (let i = 0; i < 50; ++i) {
        let x = Math.random() * 1000 + 500
        let y = Math.random() * 1000
        let z = Math.random() * 10
        let a = Math.random() * 500
        let b = Math.random() * 500 + 250

        points.push({ x, y, z, a, b })
      }

      this.data = points
    },

    changeDisplay (n) {
      this.display = n
    }
  }
}
</script>
