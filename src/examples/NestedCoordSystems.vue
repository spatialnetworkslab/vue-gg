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
        :system="outerSystem"
        :domains="domains">

        <vgg-coordinate-system
          v-for="(cs, i) in nestedCoordinateSystems"
          :key="'cs' + i"
          :x="cs.x"
          :x2="cs.x2"
          :y="cs.y"
          :y2="cs.y2"
          :system="innerSystem"
          :domains="domains"
        >

          <vgg-point
            v-for="(p, j) in points"
            :key="'p' + j"
            :x="p.x"
            :y="p.y"
            :color="cs.color"
          />

          <vgg-rectangle
            :x="0"
            :x2="100"
            :y="0"
            :y2="100"
            :color="cs.color"
            style="opacity: 0.2;"
          />

        </vgg-coordinate-system>

      </vgg-coordinate-system>

    </vgg-graphic>

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
export default {
  name: 'NestedCoordSystems',

  data () {
    return {
      outerSystem: 'cartesian',
      innerSystem: 'cartesian'
    }
  },

  computed: {
    nestedCoordinateSystems () {
      return [
        { x: 0, x2: 50, y: 0, y2: 50, color: 'green' },
        { x: 50, x2: 100, y: 0, y2: 50, color: 'red' },
        { x: 0, x2: 50, y: 50, y2: 100, color: 'yellow' },
        { x: 50, x2: 100, y: 50, y2: 100, color: 'blue' }
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
