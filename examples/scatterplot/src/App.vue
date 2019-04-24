<template>
    <div>
      <!-- train timetable -->
      <vgg-graphic v-if="train_timetable" :width="4500" :height="600" :data="train_timetable">

        <vgg-scales :scales="{
            timeScale: { domain: [new Date('April 22, 2039 00:03:00'), new Date('April 25, 2039 00:03:00')], domainMin: new Date('April 22, 2039 00:03:00')},
            stationScale: { domain: 'station', order: decide_domain('odpt.Railway:TokyoMetro.Chiyoda')}
          }"/>

        <!-- diagram -->
        <vgg-section
          :x1="150"
          :x2="4450"
          :y1="50"
          :y2="550"
          :transform="{ groupBy: 'train' }"
          :scale-x="[new Date('April 22, 2039 00:03:00'), new Date('April 25, 2039 00:03:00')]"
          :scale-y="'#stationScale'">

            <vgg-map v-slot="{row}">
              <vgg-multi-line
                :x="{val: row.grouped.time, scale: { domain: [new Date('April 22, 2039 00:03:00'), new Date('April 25, 2039 00:03:00')], domainMin: new Date('April 22, 2039 00:03:00')}}"
                :y="{val: row.grouped.station}"
                :stroke="'#009900'"
                :stroke-width="row.train === hoveredRow.train ? 2 : 0.5"
                @hover="onHover(row)">
              </vgg-multi-line>
            </vgg-map>

            <vgg-x-axis
              :scale="{ domain: [new Date('April 22, 2039 00:03:00'), new Date('April 25, 2039 00:03:00')], domainMin: new Date('April 22, 2039 00:03:00')}"
              :tick-count="24"
              :tick-extra="false"
              :format="(date) => date.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'})"/>

            <!-- <vgg-y-axis
              :scale="'#stationScale'"
              :format="(station) => station.split('.').pop()"/> -->

            <!-- <vgg-x-grid :scale="[new Date('April 22, 2039 00:03:00'), new Date('April 25, 2039 00:03:00')]" :grid-line-count="48" :grid-colour="'white'"/>
            <vgg-y-grid :scale="[0,19]" :grid-line-count="20"/> -->

        </vgg-section>
      </vgg-graphic>
      <div>
        <div class="line-selector">
          <label>Select Line</label>
          <multiselect v-model="selectedLine"
            :options="availableLines"
            :allow-empty="false"
            :custom-label="prettify_linename"/>
          <label>{{selectedLine}}</label>
        </div>
        <!-- planning areas -->
        <vgg-graphic :width="1200" :height="600" :data="train_timetable">
          <!-- map will be here -->
            <vgg-section
              :x1="50"
              :x2="1150"
              :y1="50"
              :y2="550"
            >
            </vgg-section>

        </vgg-graphic>
      </div>
    </div>
</template>
<script>
import planning_areas from './planning_areas.json'
import train_timetable from './odpt_TrainTimetable (1).json'
import stations from './odpt_Station'

import Multiselect from 'vue-multiselect'

export default {
  name: 'app',
  components: { Multiselect },
  data () {
    return {
      planning_areas: Object.freeze(planning_areas),
      trains: train_timetable,
      stations: Object.freeze(stations),
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
      console.log('Hover caught')
      this.hoveredRow = row
    },
    onSelect (row) {
      this.hoveredRow = {}
      this.selectedRow = row === this.selectedRow ? {} : row
    },
    unnest_stoplist (currTrain) {
      currTrain.Time = { 'time': currTrain.trainTimetableObject.map(i => new Date('2039-04-22 ' + i.Time)) }
      currTrain.Station = { 'station': currTrain.trainTimetableObject.map(i => i.Station) }
      delete currTrain.trainTimetableObject
    },
    decide_domain (railway) {
      let order = this.Stations
        .filter(stn => stn.railway)
        .sort((a, b) => parseInt(a.StationCode.replace(/\D/g, '')) - parseInt(b.StationCode.replace(/\D/g, '')))
        .map(stn => stn.sameAs)
      console.log(order)
      return order
    }
  },
  computed: {
    train_timetable () {
      // Thanks to Jo Hsi and Luuc for providing this
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
          timetable.Station.push(stop.Station)

          let date = new Date(`April 22, 2039 ${stop.Time}:00`)
          if (date.getHours() < 3) {
            date.setDate(date.getDate() + 1)
          }

          timetable.time.push(date)
        }
      }

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
