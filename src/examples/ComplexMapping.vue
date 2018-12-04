<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      class="graphic">

      <vgg-coordinate-system
        :x="0"
        :x2="800"
        :y="0"
        :y2="800"
        :dimensions="{
          x: 0,
          x2: 100,
          y: 0,
          y2: 100
        }"
      >



      </vgg-coordinate-system>

    </vgg-graphic>

  </div>
</template>

<script>
import * as mathjs from 'mathjs'

export default {
  name: 'ComplexMapping',

  mounted () {
    console.log(mathjs)
  }
}
</script>
