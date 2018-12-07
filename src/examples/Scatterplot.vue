<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      :data="xy"
      class="graphic">

      <vgg-map>
        <vgg-point />
      </vgg-map>

    </vgg-graphic>

    <!-- <div>

    </div> -->

  </div>
</template>

<script>
import { xy } from './dummyData.js'

export default {
  name: 'Scatterplot',

  data () {
    return {
      xy: xy('explanatory', 'dependent')
    }
  }
}
</script>
