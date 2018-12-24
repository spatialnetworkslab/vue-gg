<template>
  <div>

    <vgg-graphic
      :width="400"
      :height="400"
      class="graphic">

      <vgg-section
        :type="outerTransformation"
        :x1="0"
        :x2="400"
        :y1="0"
        :y2="400"
        :domains="domains">

        <vgg-section
          v-for="(cs, i) in nestedCoordinateSystems"
          :type="innerTransformation"
          :key="'cs' + i"
          :x1="cs.x"
          :x2="cs.x2"
          :y1="cs.y"
          :y2="cs.y2"
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
            :x1="0"
            :x2="50"
            :y1="0"
            :y2="50"
            :color="cs.color"
            style="opacity: 0.2;"
          />

        </vgg-section>

      </vgg-section>

    </vgg-graphic>

    <div style="margin-top: 10px;">
      <span class="pad-buttons">
        Outer:
        <select v-model="outerTransformation">
          <option value="scale">Linear</option>
          <option value="polar">Polar</option>
        </select>
      </span>

      <span class="pad-buttons">
        Inner:
        <select v-model="innerTransformation">
          <option value="scale">Linear</option>
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
      outerTransformation: 'scale',
      innerTransformation: 'scale'
    }
  },

  computed: {
    nestedCoordinateSystems () {
      return [
        { x: 0, x2: 25, y: 0, y2: 25, color: 'green' },
        { x: 25, x2: 50, y: 0, y2: 25, color: 'red' },
        { x: 0, x2: 25, y: 25, y2: 50, color: 'yellow' },
        { x: 25, x2: 50, y: 25, y2: 50, color: 'blue' }
      ]
    },

    domains () {
      return {
        x: [0, 50],
        y: [0, 50]
      }
    },

    points () {
      let points = []
      for (let i = 0; i < 50; ++i) {
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
