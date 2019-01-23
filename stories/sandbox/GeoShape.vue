<template>

  <vgg-graphic
    v-if="dataLoaded"
    :width="600"
    :height="600"
    :data="data"
    :transform="{ reproject: {
      from: '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
      to: 'WGS84'
    } }"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="'geometry.x'"
      :scale-y="'geometry.y'"
    >

      <vgg-map>

        <vgg-polygon
          :geometry="row => row.geometry"
          :fill="{ scale: { scale: 'redYellowGreen', variable: 'value' } }"
        />

      </vgg-map>

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
      data: {}
    }
  },

  computed: {
    dataLoaded () {
      return this.data && Object.keys(this.data).length !== 0
    }
  },

  mounted () {
    this.loadData()
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
    }
  }
}
</script>
