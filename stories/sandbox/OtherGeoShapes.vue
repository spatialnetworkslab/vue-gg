<template>

  <vgg-graphic
    v-if="dataLoaded(polygons)"
    :width="600"
    :height="600"
    :data="polygons"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-geo="{}"
    >

      <vgg-map v-slot="{ row }">
        <vgg-polygon
          :geometry="row.geometry"
          fill="white"
        />
      </vgg-map>

      <vgg-data 
        v-if="dataLoaded(linestrings)"
        :data="linestrings"
      >
        <vgg-map v-slot="{ row }">
          <vgg-multi-line
            :geometry="row.geometry"
          />
        </vgg-map>
      </vgg-data>

      <vgg-data 
        v-if="dataLoaded(points)"
        :data="points"
      >
        <vgg-map v-slot="{ row }">
          <vgg-point
            :geometry="row.geometry"
            :radius="5"
          />
        </vgg-map>
      </vgg-data>

      <vgg-data 
        v-if="dataLoaded(multipoints)"
        :data="multipoints"
      >
        <vgg-map v-slot="{ row }">
          <vgg-multi-point
            :geometry="row.geometry"
            :radius="5"
          />
        </vgg-map>
      </vgg-data>

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
    },
    dataLoaded (geom) {
      return geom && Object.keys(geom).length !== 0
    }
  }
}
</script>
