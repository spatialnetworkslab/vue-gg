<template>

  <vgg-graphic
    :width="600"
    :height="600"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :data="polygons"
    >

      <vgg-map v-slot="{ row }">

        <vgg-polygon
          :geometry="{ val: row.geometry, scaleGeo: {} }"
          fill="white"
        />

      </vgg-map>

    </vgg-section>

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :data="linestrings"
    > 

      <vgg-map v-slot="{ row }">

        <vgg-multi-line
          :geometry="{ val: row.geometry, scaleGeo: {} }"
        />

      </vgg-map>
    
    </vgg-section>

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :data="points"
    >

      <vgg-map v-slot="{ row }">

        <vgg-point
          :geometry="{ val: row.geometry, scaleGeo: {} }"
        />

      </vgg-map>

    </vgg-section>

  </vgg-graphic>

</template>


<script>
import { polygons } from './Polygons.js'
import { linestrings } from './LineStrings.js'
import { points } from './Points.js'

export default {
  name: 'OtherGeoShapes',

  data () {
    return {
      polygons: {},
      linestrings: {},
      points: {}
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      polygons().then(data => {
        this.polygons = Object.freeze(data)
      })
      linestrings().then(data => {
        this.linestrings = Object.freeze(data)
      })
      points().then(data => {
        this.points = Object.freeze(data)
      })
    }
  }
}
</script>
