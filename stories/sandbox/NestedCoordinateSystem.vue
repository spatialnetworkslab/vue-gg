<template>
  <div>

    <vgg-graphic
      :width="600"
      :height="600"
      class="graphic">

      <vgg-section
        :type="outerTransformation"
        :x1="0"
        :x2="600"
        :y1="0"
        :y2="600"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
      >

        <vgg-grid :cols="2">

          <vgg-section
            v-for="(cs, i) in nestedCoordinateSystems"
            :type="innerTransformation"
            :key="'cs' + i"
            :scale-x="[0, 100]"
            :scale-y="[0, 100]"
            :data="points"
          >

            <vgg-map v-slot="{ row }">

              <vgg-point
                :x="row.x"
                :y="row.y"
                :fill="cs.color"
                :radius="4"
                @hover="log('test')"
              />

            </vgg-map>

            <vgg-rectangle
              :x1="0"
              :x2="100"
              :y1="0"
              :y2="100"
              :fill="cs.color"
              :opacity="0.2"
            />

          </vgg-section>

        </vgg-grid>

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

    points () {
      let points = []
      for (let i = 0; i < 100; ++i) {
        let x = 0.5 + i
        let y = 0.5 + i

        points.push({ x, y })
      }

      return points
    }
  },

  methods: {
    log: console.log
  }
}
</script>

<style>
.pad-buttons {
  padding: 0px 5px;
}
</style>
