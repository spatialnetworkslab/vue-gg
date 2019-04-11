<<<<<<< HEAD
=======
<template>
  <div>
    <div class="field-selector">
      <label>Select Town</label>
      <multiselect
      v-model="selectedTown"
      :options="uniqueTowns"
      placeholder="Choose a town" />
    </div>
    <vgg-graphic :width="850" :height="450" :data="resaleData">
      <vgg-data
        :transform="{ filter: row => {
          if (selectedTown === null) return true // if no towns selected, include all data
          else {
            return row.town === selectedTown
          }
        }
        }"
      >
      <!-- bar chart per flat type -->
        <vgg-section
          :x1="100"
          :x2="400"
          :y1="100"
          :y2="400"
          :transform="[
            { groupBy: 'flat_type'},
            { summarise: { total_sales: { resale_price: 'count' } } }
          ]"
        >
          <vgg-scales
            :scales="{ typeScale: {domain: 'flat_type', order: ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'MULTI-GENERATION', 'EXECUTIVE'] }}"
          />

          <vgg-map v-slot="{ row, i }">
            <vgg-rectangle
              :y="{ val: row.flat_type, scale: '#typeScale' }"
              :x1="{ val: 0, scale: { domain: 'total_sales', domainMin: 0 } }"
              :x2="{ val: row.total_sales, scale: { domain: 'total_sales', domainMin: 0 } }"
              :h="20"
              :fill="{ val: row.total_sales, scale: { domain: 'total_sales', type: 'blues' } }"
              :stroke="row.flat_type === selectedFlatType ? 'yellow' : 'none'"
              @click="handleClick(row)"
            />
          </vgg-map>

          <vgg-x-axis :scale="{ domain: 'total_sales', domainMin: 0 }" :tick-count="4" rotate-label />
          <vgg-y-axis :scale="'#typeScale'" :hjust="0"/>
        </vgg-section>

        <!-- price histogram -->
        <vgg-section
          :x1="500"
          :x2="800"
          :y1="100"
          :y2="400"
          :transform="[
          { filter: row => {
            if (selectedFlatType === null) return true // if no towns selected, include all data
            else {
              return row.flat_type === selectedFlatType
            }
          }
          },
          { binning: { groupBy: 'resale_price', method: 'EqualInterval', numClasses: 10 } },
          { summarise: { count: { resale_price: 'count' } } }
          ]"
          :select="'swipeX'"
          :selection-bounds.sync="histoSelection"
        >
          <vgg-scales :scales="{ bins: { domain: [0, 1000000] } }"/>

          <vgg-map v-slot="{ row, i }">
            <vgg-rectangle
              :x1="{ val: row.bins[0], scale: '#bins' }"
              :x2="{ val: row.bins[1], scale: '#bins' }"
              :y1="{ val: 0, scale: { domain: 'count', domainMin: 0 } }"
              :y2="{ val: row.count, scale: { domain: 'count', domainMin: 0 } }"
              :fill="selectedPoints[i] ? 'blue' : 'black'"
              @select="handleSelect(i, true)"
              @deselect="handleSelect(i, false)"
            />
          </vgg-map>

          <vgg-y-axis :scale="{ domain: 'count', domainMin: 0 }" :hjust="0" :tick-count="8"/>
          <vgg-x-axis :scale="'#bins'"/>
          <!-- <vgg-polygon
            v-if="histoSelection.length > 1"
            :points="histoSelection"
            :fill="'red'"
            :opacity="0.2"
          /> -->
        </vgg-section>

      </vgg-data>
    </vgg-graphic>
  </div>
</template>

<script>
import resaleData from './resale_sample.json'
import Multiselect from 'vue-multiselect'

export default {
  name: 'app',
  components: { Multiselect },
  data () {
    return {
      resaleData: resaleData,
      selectedTown: null,
      towns: ['BEDOK', 'TAMPINES', 'PUNGGOL'],
      selectedFlatType: null,
      histoSelection: [],
      selectedPoints: {}
    }
  },
  computed: {
    uniqueTowns () {
      let towns = resaleData.map(row => row.town)
      return [...new Set(towns)].sort()
    }
  },
  methods: {
    handleClick (row) {
      if (this.selectedFlatType === row.flat_type) {
        this.selectedFlatType = null
      } else {
        this.selectedFlatType = row.flat_type
      }
    },
    handleSelect (i, add) {
      // console.log(this.histoSelection)
      if (add) {
        this.$set(this.selectedPoints, i, true)
      } else {
        this.$delete(this.selectedPoints, i)
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.field-selector {
  width: 300px;
}
</style>
>>>>>>> 9967feef7e009c4a6e0c29531e703fc3e4a45b69
