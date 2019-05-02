<template>
  <vgg-heatmap
    :x1="100"
    :x2="900"
    :y1="100"
    :y2="900"
    :width="1000"
    :height="1000"
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
