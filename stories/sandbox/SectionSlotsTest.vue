<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="data"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :scale-x="'varA'"
      :scale-y="'varB'"
    >

      <vgg-map v-slot="{ row }">

        <vgg-point
          :x="row.varA"
          :y="row.varB"
        />

      </vgg-map>

      <template v-slot:bottom>
        <vgg-x-axis />
      </template>

      <template v-slot:right>
        <vgg-y-axis />
      </template>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
import { xy } from './dummyData.js'

export default {
  data () {
    return {
      data: xy('varA', 'varB')
    }
  }
}
</script>
