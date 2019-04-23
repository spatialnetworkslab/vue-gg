<template>
  <div>
    <vgg-graphic
      :width="1500"
      :height="600"
      :data="train_timetable"
    >

      <!-- <vgg-scales :scales="{
        timeScale: { domain: [new Date('April 22, 2019 00:04:00'), new Date('April 23, 2019 00:04:00')] },
        stationScale: { domain: 'station' }
      }"
      /> -->
      <vgg-scales :scales="{
        timeScale: { domain: [new Date('April 22, 2019 04:00:00'), new Date('April 23, 2019 04:00:00')] },
        stationScale: { domain: 'station' }
      }"
      />

      <vgg-section
        :x1="150"
        :x2="1450"
        :y1="50"
        :y2="550"
        :transform="{ groupBy: 'train' }"
      >

        <vgg-map v-slot="{ row }">

          <vgg-multi-line
            :x="{val: row.grouped.time, scale: '#timeScale'}"
            :y="{val: row.grouped.station, scale: '#stationScale'}"
            :stroke="'#009900'"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'#timeScale'"
          :tick-count="24"
          :tick-extra="false"
          :format="(date) => date.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'})"
        />

        <vgg-y-axis
          :scale="'#stationScale'"
          :format="(station) => station.split('.').pop()"
        />

        <vgg-x-grid
          :scale="[new Date('April 22, 2019 00:04:00'), new Date('April 23, 2019 00:04:00')]"
          :grid-line-count="48" :grid-colour="'white'"
        />

        <vgg-y-grid
          :scale="[0,19]"
          :grid-line-count="20"
        />

      </vgg-section>

    </vgg-graphic>

    <!-- <div class="line-selector">
      <label>Select Line</label>
      <multiselect v-model="selectedLine"
        :options="availableLines"
        :allow-empty="false"
        :custom-label="prettify_linename"/>
      <label>{{selectedLine}}</label>
    </div> -->

  </div>

</template>

<script>
import train_timetable from './odpt_TrainTimetable.json'
// import stations from './odpt_Station'

import Multiselect from 'vue-multiselect'

export default {
  name: 'app',
  components: { Multiselect },
  data () {
    return {
      trains: train_timetable,
      // stations: Object.freeze(stations),
      availableLines: ['odpt.Railway:TokyoMetro.Chiyoda'],
      selectedLine: 'odpt.Railway:TokyoMetro.Chiyoda',
      hoveredRow: {},
      selectedRow: {}
    }
  },
  methods: {
    prettify_linename (railway) {
      return `${railway.split('.').pop()} Line`
    },
    onHover (row) {
      this.hoveredRow = row
    },
    onSelect (row) {
      this.hoveredRow = {}
      this.selectedRow = row === this.selectedRow ? {} : row
    }
  },
  computed: {
    train_timetable () {
      // Thanks to Luuc for providing this
      let timetable = {
        train: [],
        station: [],
        time: []
      }

      for (let trainData of this.trains) {
        let train = trainData.train
        let stops = trainData.trainTimetableObject

        for (let stop of stops) {
          timetable.train.push(train)
          timetable.station.push(stop.Station)

          let date = new Date(`April 22, 2019 ${stop.Time}:00`)

          timetable.time.push(date)
        }
      }
      // console.log(timetable)
      return timetable
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.line-selector {
  width: 300px;
  float: left;
}
.line-diagram {
  float: left;
}
</style>
