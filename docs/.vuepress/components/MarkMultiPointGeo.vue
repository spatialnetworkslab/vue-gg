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
      :x2="550"
      :y1="0"
      :y2="550"
      :scale-geo="{}"
    >

      <vgg-map v-slot="{ row, i }">
        <vgg-polygon
          :geometry="row.geometry"
          fill="#6ba292"
          stroke="#d3d3d3"
          :strokeWidth="0.05"
        />
      </vgg-map>

      <vgg-data :data="multipoints">

        <vgg-map v-slot="{ row, i }">
          <vgg-multi-point
            :geometry="row.geometry"
            :radius="{ val: row.wealth, scale: { range: [6, 30], domain: 'wealth' } }"
            fill="#bcd8b7"
            :opacity="0.5"
          />
        </vgg-map>

      </vgg-data>

    </vgg-section>

  </vgg-graphic>

</template>


<script>
import { africa } from './africa.js'
import { cities } from './citypoints.js'

export default {
  name: 'MarkMultiPointGeo',

  data () {
    return {
      polygons: {},
      multipoints: {},
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
      cities().then(data => {
        console.log('data', data)
        this.multipoints = Object.freeze(data)
      })
    }
  }
}
</script>