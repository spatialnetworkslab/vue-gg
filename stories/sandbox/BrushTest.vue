<template>
  <vgg-graphic
    :width="500"
    :height="500"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :scale-x="[0, 1]"
      :scale-y="[0, 1]"
      :brush="'rectangle'"
      :brush-points.sync="brushPoints"
      @brush="log($event)"
    >

      <vgg-rectangle
        :x1="0"
        :x2="1"
        :y1="0"
        :y2="1"
        :fill="'blue'"
        :opacity="0.4"
      />

      <vgg-polygon
        v-if="brushPoints.length > 1"
        :points="brushPoints"
        :fill="'red'"
        :opacity="0.6"
      />

      <vgg-point
        :x="0.5"
        :y="0.5"
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      brushPoints: []
    }
  },

  methods: {
    log: console.log
  }
}
</script>
