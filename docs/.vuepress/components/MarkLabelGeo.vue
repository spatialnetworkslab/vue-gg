<template>

  <vgg-graphic
    v-if="dataLoaded"
    :width="600"
    :height="600"
    :data="polygons"
    :transform="{ reproject: {
      from: '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
      to: 'WGS84'
    } }"
  >

    <vgg-section
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :scale-geo="{}"
    >

      <vgg-map v-slot="{ row }">

        <vgg-polygon
          :geometry="row.geometry"
          :fill="'#7f2704'"
          :opacity="0.9"
          stroke="#d3d3d3"
          :stroke-width="0.05"
        />

      </vgg-map>

      <vgg-data
        v-if="points"
        :data="points"
      >

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :geometry="row.geometry"
            :shape="'star'"
            :size="15"
            :fill="'#e09f3e'"
          />

          <vgg-label
            :geometry="row.geometry"
            :text="row.name"
            :anchor-point="row.anchor"
            :fill="row.fill"
            :font-size="12"
            font-family="Verdana"
          />

        </vgg-map>

      </vgg-data>

    </vgg-section>

  </vgg-graphic>

</template>

<script>
import { africa } from './africa.js'
import { points } from './populousCities.js'

export default {
  name: 'GeoShape',

  data () {
    return {
      polygons: {},
      points: null
    }
  },

  computed: {
    dataLoaded () {
      return this.polygons && Object.keys(this.polygons).length !== 0
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      africa().then(data => {
        this.polygons = Object.freeze(data)
      })
      points().then(data =>{
        this.points = Object.freeze(data)
      })
    }
  }
}
</script>
