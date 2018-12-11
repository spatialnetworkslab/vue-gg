<template>

  <vgg-graphic
    :width="800"
    :height="800"
    :data="bars"
    class="graphic">

    <vgg-coordinate-transformation
      :x1="100"
      :x2="700"
      :y1="100"
      :y2="700"
      :domains="{
        x: [0, 100],
        y: [0, 100]
      }"
    >

      <vgg-map
        :scaling="{
          x: 'fruit',
          w: () => 7,
          y1: () => 0,
          y2: 'quantity'
        }"
      >

        <vgg-rectangle />

      </vgg-map>

    </vgg-coordinate-transformation>

  </vgg-graphic>
</template>

<script>
import { bars } from './dummyData.js'

export default {
  name: 'Bars',

  data () {
    return {
      bars: bars('fruit', 'quantity')
    }
  }
}
</script>
