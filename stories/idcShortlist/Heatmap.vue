<template>
  <vgg-heatmap
    :x1="200"
    :x2="800"
    :y1="100"
    :y2="1000"
    :width="1000"
    :height="1100"
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
