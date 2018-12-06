<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      class="graphic">

      <vgg-coordinate-transformation
        :x="100"
        :x2="700"
        :y="100"
        :y2="700"
        :system="system"
        :domains="domains"
      >

        <vgg-rectangle
          v-for="(r, i) in rectangles"
          :key="'r' + i"
          :x="r.x"
          :x2="r.x2"
          :y="r.y"
          :y2="r.y2"
          :color="r.color"
        />

        <vgg-point
          v-for="(p, i) in points"
          :key="'p' + i"
          :x="p.x"
          :y="p.y"
        />

        <!-- <vgg-line :func="x => 0.02 * (x ** 2)" /> -->

        <vgg-glyph
          :x="0"
          :y="100"
          :width="100"
          :height="100">

          <vgg-point
            :x="50"
            :y="50"
            :radius="10"
          />

        </vgg-glyph>

      </vgg-coordinate-transformation>

    </vgg-graphic>

    <div style="margin-top: 10px;">
      <select v-model="system">
        <option value="cartesian">Cartesian</option>
        <option value="polar">Polar</option>
      </select>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CartesianPolar',

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
        { x: 0, x2: 15, y: 30, y2: 70, color: 'green' },
        { x: 15, x2: 50, y: 30, y2: 70, color: 'red' },
        { x: 50, x2: 75, y: 30, y2: 70, color: 'yellow' },
        { x: 75, x2: 100, y: 30, y2: 70, color: 'blue' }
      ]

      return rectangles
    }
  }
}
</script>
