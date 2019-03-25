<template>
  <div>
    <vgg-graphic
      :width="300"
      :height="300"
      :data="data">

      <vgg-section
        :x1="40"
        :x2="280"
        :y1="40"
        :y2="280"
        scale-x="x"
        scale-y="y"
        :axes="{
          left: {'tick-count': 5},
          bottom: {'tick-count': 5}
        }"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.x"
            :y="row.y"
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
      for (let i = 0; i < 50; ++i) {
        let x = Math.random() * 1000 + 200
        let y = Math.random() * 200

        points.push({ x, y })
      }

      this.data = points
    },
  }
}
</script>
