<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      class="graphic">

      <vgg-coordinate-transformation
        :type="outerTransformation"
        :x="100"
        :x2="700"
        :y="100"
        :y2="700"
        :domains="{
          x: [0, 100],
          y: [0, 100]
        }"
      >

        <vgg-rectangle
          :x="0"
          :x2="100"
          :y="0"
          :y2="100"
          color="#ffffff"
        />

        <vgg-piechart
          v-for="(point, i) in points"
          :key="i"
          :x="point.x"
          :y="point.y"
          :radius="20"
          :transformation="innerTransformation"
        />

      </vgg-coordinate-transformation>

    </vgg-graphic>

    <div style="margin-top: 10px;">
      <span class="pad-buttons">
        Outer:
        <select v-model="outerTransformation">
          <option value="linear">Linear</option>
          <option value="polar">Polar</option>
        </select>
      </span>

      <span class="pad-buttons">
        Inner:
        <select v-model="innerTransformation">
          <option value="linear">Linear</option>
          <option value="polar">Polar</option>
        </select>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Glyphs',

  data () {
    return {
      outerTransformation: 'linear',
      innerTransformation: 'polar'
    }
  },

  computed: {
    points () {
      let points = []
      for (let i = 0; i < 10; i++) {
        points.push({
          x: 5 + i * 10,
          y: 5 + i * 10
        })
      }

      return points
    }
  }
}
</script>
