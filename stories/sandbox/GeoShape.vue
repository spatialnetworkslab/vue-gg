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
      :scale-geo="{}"
      :brush="'rectangle'"
      :brush-points.sync="brushPoints"
    >

      <vgg-map v-slot="{ row, i }">

        <vgg-polygon
          :geometry="row.geometry"
          :fill="selected[i] ? 'yellow' : { val: row.value, scale: { type: 'redYellowGreen', domain: 'value' } }"
          @select="handleSelect(i, true)"
          @deselect="handleSelect(i, false)"
        />

      </vgg-map>

    </vgg-section>

    <vgg-polygon
      v-if="brushPoints.length > 1"
      :points="brushPoints"
      :fill="'red'"
      :opacity="0.6"
    />

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
      brushPoints: [],
      selected: {}
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
    },

    log (row) { console.log(row) },

    handleSelect (i, add) {
      if (add) {
        this.$set(this.selected, i, true)
      } else {
        this.$delete(this.selected, i)
      }
    }
  }
}
</script>
