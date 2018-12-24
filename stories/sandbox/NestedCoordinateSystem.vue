<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      class="graphic">

      <vgg-section
        :type="outerTransformation"
        :x1="0"
        :x2="800"
        :y1="0"
        :y2="800"
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
            :x2="100"
            :y1="0"
            :y2="100"
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
        { x: 0, x2: 50, y: 0, y2: 50, color: 'green' },
        { x: 50, x2: 100, y: 0, y2: 50, color: 'red' },
        { x: 0, x2: 50, y: 50, y2: 100, color: 'yellow' },
        { x: 50, x2: 100, y: 50, y2: 100, color: 'blue' }
      ]
    },

    domains () {
      return {
        x: [0, 100],
        y: [0, 100]
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
