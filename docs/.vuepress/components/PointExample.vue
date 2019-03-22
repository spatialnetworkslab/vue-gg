<template>
  <div>
    <vgg-graphic
      v-if="data"
      :width="300"
      :height="300"
      :data="data">

      <vgg-plot-title text="Scatterplot" :vMargin="10" />

      <vgg-section
        :x1="40"
        :x2="280"
        :y1="40"
        :y2="280"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :transition="1"
            :x="{ val: row.x, scale: 'x' }"
            :y="{ val: row.y, scale: 'y' }"
          />

        </vgg-map>

        <vgg-y-axis
          :x1="0"
          :x2="80"
          :y1="40"
          :y2="280"
          :scale="'y'"
        />

        <vgg-x-axis
          :x1="40"
          :x2="280"
          :y="35"
          :h="10"
          :scale="'x'"
        />

      </vgg-section>

      <vgg-x-grid
        :x1="40"
        :x2="280"
        :y1="40"
        :y2="280"
        :scale="'x'"
      />

      <vgg-y-grid
        :x1="40"
        :x2="280"
        :y1="40"
        :y2="280"
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
