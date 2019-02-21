<template>
  <div>
    <div>
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
          :axes="axes"
        >

          <vgg-map v-slot="{ row }">

            <vgg-point
              :x="row.varA"
              :y="row.varB"
            />

          </vgg-map>

        </vgg-section>

      </vgg-graphic>
    </div>

    <div>
      <input
        v-model="bottom"
        type="checkbox"
        name="bottom"
      >
      <label for="bottom">Bottom</label>

      <input
        v-model="top"
        type="checkbox"
        name="top"
      >
      <label for="top">Top</label>

      <input
        v-model="left"
        type="checkbox"
        name="left"
      >
      <label for="left">Left</label>

      <input
        v-model="right"
        type="checkbox"
        name="right"
      >
      <label for="right">Right</label>
    </div>
  </div>
</template>

<script>
import { xy } from './dummyData.js'

export default {
  data () {
    return {
      data: xy('varA', 'varB'),
      bottom: true,
      top: false,
      left: false,
      right: true
    }
  },

  computed: {
    axes () {
      return [
        this.bottom ? 'bottom' : null,
        this.top ? 'top' : null,
        this.left ? 'left' : null,
        this.right ? 'right' : null
      ].filter(axis => axis !== null)
    }
  }
}
</script>
