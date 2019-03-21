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
          :radius="5"
        />

      </vgg-map>

    </vgg-section>

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :data="multipoints"
    >

      <vgg-map v-slot="{ row }">

        <vgg-multi-point
          :geometry="{ val: row.geometry, scaleGeo: {} }"
          :radius="5"
        />

      </vgg-map>

      <!-- <vgg-multi-point
        :points="[ [100.0, 100.0], [233.33, 300], [366.66, 400], [500, 500] ]"
        :radius="5"
      /> -->

    </vgg-section>

  </vgg-graphic>

</template>


<script>
import { polygons } from './Polygons.js'
import { linestrings } from './LineStrings.js'
import { points } from './Points.js'
import { multipoints } from './MultiPoints.js'

export default {
  name: 'OtherGeoShapes',

  data () {
    return {
      polygons: {},
      linestrings: {},
      points: {},
      multipoints: {}
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
      multipoints().then(data => {
        this.multipoints = Object.freeze(data)
      })
    }
  }
}
</script>
