<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="trains"
  >

    <vgg-scales :scales="{
        stationScale: 'station',
        timeScale: 'time',
        trainScale: 'train'
      }"
    />


    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :transform="{ groupBy: 'train' }"
    >

      <vgg-map v-slot="{ row }">

        <vgg-multi-line
          :x="{ val: row.grouped.time, scale: '#timeScale' }"
          :y="{ val: row.grouped.station, scale: '#stationScale' }"
          :stroke="{ val: row.train, scale: '#trainScale' }"
          @hover="log(row)"
        />

      </vgg-map>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
/* eslint-disable */
import trainTimetable from './odpt_TrainTimetable_edited.json'

export default {
  name: 'app',

  computed: {
    trains () {
      let allStops = {
        train: [],
        station: [],
        time: []
      }

      for (let trainData of trainTimetable) {
        let train = trainData.train
        let stopsForThisTrain = trainData.trainTimetableObject

        for (let stop of stopsForThisTrain) {
          allStops.train.push(train)
          allStops.station.push(stop.Station)

          let date = new Date(`April 22, 2019 ${stop.Time}:00`)
          allStops.time.push(date)
        }
      }

      return allStops
    }
  },

  methods: {
    log: console.log
  }
}
</script>
