<template>
  <div>
    <vgg-graphic
      :width="300"
      :height="250"
      :data="data">

      <vgg-section
        :x1="30"
        :x2="275"
        :y1="25"
        :y2="225"
        scale-x="x"
        scale-y="y"
      >

        <vgg-x-axis
          scale="x"
          :tickCount="5"
        />

        <vgg-y-axis
          scale="y"
          :hjust="0"
          :tickCount="5"
        />

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.x"
            :y="row.y"
            fill="#c66366"
          />

        </vgg-map>

      </vgg-section>

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
      for (let i = 0; i < 25; ++i) {
        let x = Math.random() * 1000 + 200
        let y = Math.random() * 200

        points.push({ x, y })
      }

      this.data = points
    },
  }
}
</script>
