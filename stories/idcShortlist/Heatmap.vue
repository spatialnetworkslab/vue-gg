<template>
  <vgg-heatmap
    :x1="100"
    :x2="1500"
    :y1="100"
    :y2="700"
    :width="1600"
    :height="800"
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
