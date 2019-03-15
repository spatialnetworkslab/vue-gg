<template>
  <div>

    <div>
      <button style="margin-top: 10px;" @click="getData()">Generate new data</button>
    </div>

    <vgg-graphic
      v-if="data"
      :width="800"
      :height="800"
      :data="data">

      <vgg-plot-title text="Scatterplot" :vMargin="150" />

      <vgg-section
        :x1="200"
        :x2="600"
        :y1="200"
        :y2="600"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="{ val: row.x, scale: 'x' }"
            :y="{ val: row.y, scale: 'y' }"
          />

        </vgg-map>

        <vgg-y-axis
          :x1="600"
          :x2="650"
          :y1="200"
          :y2="600"
          :scale="'y'"
        />

        <vgg-x-axis
          :x1="200"
          :x2="600"
          :y="175"
          :h="50"
          :scale="'x'"
        />

      </vgg-section>

      <vgg-x-grid
        :x1="200"
        :x2="600"
        :y1="200"
        :y2="600"
        :scale="'x'"
      />

      <vgg-y-grid
        :x1="200"
        :x2="600"
        :y1="200"
        :y2="600"
        :scale="'y'"
      />

    </vgg-graphic>

  </div>

 
</template>


<script>
export default {
  name: 'Scatterplot',

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

        points.push({ x, y })
      }

      this.data = points
    },
  }
}
</script>
