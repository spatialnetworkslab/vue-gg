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
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :scale-geo="{}"
      :select="'polygon'"
      :selection-bounds.sync="selectionBounds"
    >

      <vgg-map v-slot="{ row, i }">

        <vgg-polygon
          :geometry="row.geometry"
          :fill="selected[i] ? '#7f6504' : { val: row.value, scale: { type: 'oranges', domain: 'value', reverse: true } }"
          :opacity="0.9"
          @select="handleSelect(i, true)"
          @deselect="handleSelect(i, false)"
          stroke="#d3d3d3"
          :stroke-width="0.05"
        />

      </vgg-map>

      <vgg-data :data="points">

        <vgg-map v-slot="{ row }">

          <!-- <vgg-point
            :geometry="row.geometry"
            :radius="5"
            fill="#008000"
            :opacity="0.5"
          /> -->

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

    <vgg-polygon
      v-if="selectionBounds.length > 1"
      :points="selectionBounds"
      :fill="'#d3d3d3'"
      :stroke-width="0.2"
      :opacity="0.6"
    />

  </vgg-graphic>

</template>

<script>
import { geo } from './geoData.js'
import { points } from './populousCities.js'
import { equijoin } from '../../src/utils/join.js'

export default {
  name: 'GeoShape',

  data () {
    return {
      data: {},
      points: {},
      selectionBounds: [],
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
      points().then(data =>{
        this.points = Object.freeze(data)
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
