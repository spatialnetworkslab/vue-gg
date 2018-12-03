<template>
  <div>

    <Graphic
      :width="700"
      :height="700"
      class="graphic">

      <CoordinateSystem
        :x="0"
        :x2="700"
        :y="0"
        :y2="700"
        :domains="{
          x: -5,
          x2: 5,
          y: -5,
          y2: 5
        }"
      >

        <Point
          :x="0"
          :y="0"
        />

        <VPolygon
          v-for="(rect, i) in rectsProjected"
          :key="i"
          :points="rect.corners"
          :fill="rect.color"
        />

      </CoordinateSystem>

    </Graphic>

    <div style="margin-top: 10px;">
      <div class="row">
        <div class="space">
          <span>{{ r0c0 }}</span>
          <span>{{ r0c1 }}</span>
          <span>{{ r0c2 }}</span>
        </div>
        <input type="range" v-model="r0c0" :min="min" :max="max" :step="step" />
        <input type="range" v-model="r0c1" :min="min" :max="max" :step="step" />
        <input type="range" v-model="r0c2" :min="min" :max="max" :step="step" />
      </div>

      <div class="row">
        <div class="space">
          <span>{{ r1c0 }}</span>
          <span>{{ r1c1 }}</span>
          <span>{{ r1c2 }}</span>
        </div>
        <input type="range" v-model="r1c0" :min="min" :max="max" :step="step" />
        <input type="range" v-model="r1c1" :min="min" :max="max" :step="step" />
        <input type="range" v-model="r1c2" :min="min" :max="max" :step="step" />
      </div>

      <div class="row">
        <div class="space">
          <span>{{ r2c0 }}</span>
          <span>{{ r2c1 }}</span>
          <span>{{ r2c2 }}</span>
        </div>
        <input type="range" v-model="r2c0" :min="min" :max="max" :step="step" />
        <input type="range" v-model="r2c1" :min="min" :max="max" :step="step" />
        <input type="range" v-model="r2c2" :min="min" :max="max" :step="step" />
      </div>
    </div>

  </div>
</template>

<script>
import { project } from '@/utils/matrix.js'

import Graphic from '@/components/Core/Graphic.vue'
import CoordinateSystem from '@/components/Core/CoordinateSystem.vue'
import Point from '@/components/Marks/Point.vue'
import VPolygon from '@/components/Marks/Polygon.vue'

export default {
  name: 'CartesianPolar',

  components: {
    Graphic,
    CoordinateSystem,
    Point,
    VPolygon
  },

  data () {
    return {
      r0c0: 1,
      r0c1: 0,
      r0c2: 0,
      r1c0: 0,
      r1c1: 1,
      r1c2: 0,
      r2c0: 0,
      r2c1: 0,
      r2c2: 1
    }
  },

  computed: {
    matrix () {
      return [
        [this.r0c0, this.r0c1, this.r0c2],
        [this.r1c0, this.r1c1, this.r1c2],
        [this.r2c0, this.r2c1, this.r2c2]
      ]
    },

    min () { return -2 },

    max () { return 2 },

    step () { return 0.1 },

    colors () {
      let colors = {}
      for (let i = 5; i >= 1; i--) {
        let r1 = Math.round(Math.random() * 255)
        let r2 = Math.round(Math.random() * 255)
        let r3 = Math.round(Math.random() * 255)

        colors[i] = { r1, r2, r3 }
      }

      return colors
    },

    rectsProjected () {
      let rects = []
      let center = [0, 0]
      for (let i = 5; i >= 1; i--) {
        let corners = [
          [-i, -i],
          [-i, i],
          [i, i],
          [i, -i]
        ].map(corner => project(corner, this.matrix))

        let { r1, r2, r3 } = this.colors[i]

        let rect = {
          corners,
          color: `rgb(${r1}, ${r2}, ${r3})`
        }

        rects.push(rect)
      }

      return rects
    }
  }
}
</script>

<style scoped>
div > input {
  width: 100px;
}

div.row {
  padding: 10px;
}

div.space > span {
  padding: 0px 55px;
}
</style>
