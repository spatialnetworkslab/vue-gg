<template>
  <vgg-graphic
    :width="500"
    :height="500"
  >

    <vgg-data :data="left">
      <vgg-section
        :x1="30"
        :x2="240"
        :y1="50"
        :y2="450"
        :scale-x="'a'"
        :scale-y="'b'"
        :brush="'rectangle'"
        @updateBrushPoints="leftBrushPoints = $event"
      >

        <vgg-map v-slot="{ row, i }">

          <vgg-point
            :x="row.a"
            :y="row.b"
            :fill="'red'"
            @select="log('left: ', i)"
          />

        </vgg-map>

      </vgg-section>
    </vgg-data>

    <vgg-data :data="right">
      <vgg-section
        :x1="260"
        :x2="470"
        :y1="50"
        :y2="450"
        :scale-x="'c'"
        :scale-y="'d'"
        :brush="'rectangle'"
        @updateBrushPoints="rightBrushPoints = $event"
      >

        <vgg-map v-slot="{ row, i }">

          <vgg-point
            :x="row.c"
            :y="row.d"
            :fill="'blue'"
            @select="log('right: ', i)"
          />

        </vgg-map>

      </vgg-section>
    </vgg-data>

    <!-- Brushes -->
    <vgg-polygon
      v-if="leftBrushPoints.length > 1"
      :points="leftBrushPoints"
      :fill="'red'"
      :opacity="0.3"
    />

    <vgg-polygon
      v-if="rightBrushPoints.length > 1"
      :points="rightBrushPoints"
      :fill="'blue'"
      :opacity="0.3"
    />

  </vgg-graphic>
</template>

<script>
import { xy } from './dummyData.js'
export default {
  data () {
    return {
      left: xy('a', 'b'),
      right: xy('c', 'd'),

      leftBrushPoints: [],
      rightBrushPoints: []
    }
  },

  methods: {
    log: console.log
  }
}
</script>
