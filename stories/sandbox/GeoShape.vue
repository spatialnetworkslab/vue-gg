<template>

    <vgg-graphic
      v-if="dataLoaded"
      :width="600"
      :height="600"
      :data="data"
      format="geojson">

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
      >
        <!-- :scales="{
          x: { variable: 'geometry', get: g => g.x },
          y: { variable: 'geometry', get: g => g.y }
        }" -->

        <vgg-polygon
          v-for="(feat, i) in data.features"
          :key="i"
          :points="flattenCoordArr(feat.geometry)"
        />      

      </vgg-section>

    </vgg-graphic>

</template>

<script>
import { geo } from './geoData.js'
import { equijoin } from '../../src/utils/join.js'

export default {
  name: 'GeoShape',

  data () {
    return {
      data: {},
    }
  },
  mounted () {
    this.loadData()
  },
  
  computed: {
    dataLoaded () {
      return this.data && Object.keys(this.data).length !== 0
    }
  },

  methods: {
    loadData () {
      geo().then(data => {
        let joinedData = equijoin(data.attr, data.geom, 'hex', 'hex',
          (attr, feat) => { 
            let featCopy = JSON.parse(JSON.stringify(feat))

            // select attributes to retain in output
            featCopy.properties.value = attr.value
            return featCopy
          }
        )
        this.data = Object.freeze(joinedData)
      })
    },
    flattenCoordArr (geometry) {
      return geometry.type === 'Polygon' ? geometry.coordinates.flat()
      : geometry.type === 'MultiPolygon' ? geometry.coordinates.flat(2)
      : 'geometry type is not known'
    }
  }
}
</script>
