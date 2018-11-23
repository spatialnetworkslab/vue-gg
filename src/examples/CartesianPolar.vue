<template>
  <div>

    <Graphic
      :width="800"
      :height="800"
      class="graphic">

      <CoordinateSystem
        :x="100"
        :x2="700"
        :y="100"
        :y2="700"
        :system="system"
        :domains="domains"
      >

        <Rectangle
          v-for="(r, i) in rectangles"
          :key="'r' + i"
          :x="r.x"
          :x2="r.x2"
          :y="r.y"
          :y2="r.y2"
          :color="r.color"
        />

        <Point
          v-for="(p, i) in points"
          :key="'p' + i"
          :x="p.x"
          :y="p.y"
        />

        <Edge :func="x => 0.02 * (x ** 2)" />

      </CoordinateSystem>

    </Graphic>

    <div style="margin-top: 10px;">
      <select v-model="system">
        <option value="cartesian">Cartesian</option>
        <option value="polar">Polar</option>
      </select>
    </div>

  </div>
</template>

<script>
import Graphic from '@/components/Graphic.vue'
import CoordinateSystem from '@/components/CoordinateSystem.vue'
import Point from '@/components/Marks/Point.vue'
import Rectangle from '@/components/Marks/Rectangle.vue'
import Edge from '@/components/Marks/Edge.vue'

export default {
  name: 'CartesianPolar',

  components: {
    Graphic,
    CoordinateSystem,
    Point,
    Rectangle,
    Edge
  },

  data () {
    return {
      system: 'cartesian'
    }
  },

  computed: {
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
        let x = 10.5 + i * 0.9
        let y = 0.5 + i * 1

        points.push({ x, y })
      }

      return points
    },

    rectangles () {
      let rectangles = [
        { x: 10, x2: 100, y: 0, y2: 20, color: 'green' },
        { x: 20, x2: 100, y: 20, y2: 50, color: 'red' },
        { x: 30, x2: 100, y: 50, y2: 60, color: 'yellow' },
        { x: 40, x2: 100, y: 60, y2: 100, color: 'blue' }
      ]

      return rectangles
    }
  }
}
</script>
