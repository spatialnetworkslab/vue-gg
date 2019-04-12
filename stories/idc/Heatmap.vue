<template>
  <vgg-heatmap
    :x1="200"
    :x2="800"
    :y1="100"
    :y2="900"
    :width="1000"
    :height="1000"
    :csvURL="'../../static/motorbikes_40_clean.csv'"
    :extract-variables="{
      'Base MSRP': 'Price',
      'Wet Weight': 'WetWeight',
      '0–60 mph sec': 'ZeroTo60',
      'Rear-Wheel HP':'RearWheelHorsepower',
      'Top Speed': 'TopSpeed',
      'Average MPG': 'MilesPG',
      '0–60 mph sec': 'ZeroTo60',
      'Braking 60 to 0 mph (feet)': 'Stop60',
      'Rear-Wheel TQ Lb-Ft': 'RearWheelTQLbFt',
      'Quartermile Sec':'QuartermileSec'}"
    :color="'Color'"
    :dimensions="['Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio']"
    :options="'Name'"
  />
</template>

<script>
import { csv } from 'd3-fetch'

export default {
  name: 'IdcHeatmap',

  data () {
    return {
    }
  },
  computed: {
  },

  mounted () {
  },

  methods: {
    log: console.log
  }
}
</script>
