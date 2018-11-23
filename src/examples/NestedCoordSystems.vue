<template>
  <div>

    <Graphic
      :width="800"
      :height="800"
      class="graphic">

      <CoordinateSystem
        :x="0"
        :x2="800"
        :y="0"
        :y2="800"
        :system="outerSystem">

        <CoordinateSystem
          v-for="(cs, i) in nestedCoordinateSystems"
          :key="'cs' + i"
          :x="cs.x"
          :x2="cs.x2"
          :y="cs.y"
          :y2="cs.y2"
          :system="innerSystem"
          :domains="domains"
        >

          <Point
            v-for="(p, j) in points"
            :key="'p' + j"
            :x="p.x"
            :y="p.y"
            :color="cs.color"
          />

          <Rectangle
            :x="0"
            :x2="100"
            :y="0"
            :y2="100"
            :color="cs.color"
            style="opacity: 0.2;"
          />

        </CoordinateSystem>

      </CoordinateSystem>

    </Graphic>

    <div style="margin-top: 10px;">
      <span class="pad-buttons">
        Outer:
        <select v-model="outerSystem">
          <option value="cartesian">Cartesian</option>
          <option value="polar">Polar</option>
        </select>
      </span>

      <span class="pad-buttons">
        Inner:
        <select v-model="innerSystem">
          <option value="cartesian">Cartesian</option>
          <option value="polar">Polar</option>
        </select>
      </span>
    </div>

  </div>
</template>

<script>
import Graphic from '@/components/Graphic.vue'
import CoordinateSystem from '@/components/CoordinateSystem.vue'
import Point from '@/components/Marks/Point.vue'
import Rectangle from '@/components/Marks/Rectangle.vue'

export default {
  name: 'NestedCoordSystems',

  components: {
    Graphic,
    CoordinateSystem,
    Point,
    Rectangle
  },

  data () {
    return {
      outerSystem: 'cartesian',
      innerSystem: 'cartesian'
    }
  },

  computed: {
    nestedCoordinateSystems () {
      return [
        { x: 0, x2: 400, y: 0, y2: 400, color: 'green' },
        { x: 400, x2: 800, y: 0, y2: 400, color: 'red' },
        { x: 0, x2: 400, y: 400, y2: 800, color: 'yellow' },
        { x: 400, x2: 800, y: 400, y2: 800, color: 'blue' }
      ]
    },

    domains () {
      return {
        x: 0,
        x2: 100,
        y: 0,
        y2: 100
      }
    },

    points () {
      let points = []
      for (let i = 0; i < 100; ++i) {
        let x = 0.5 + i
        let y = 0.5 + i

        points.push({ x, y })
      }

      return points
    }
  }
}
</script>

<style>
.pad-buttons {
  padding: 0px 5px;
}
</style>
