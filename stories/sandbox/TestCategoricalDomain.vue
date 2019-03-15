<template>
  <!-- <vgg-graphic
    :width="600"
    :height="600"
    :data="[
      { date: new Date('November 16, 2018') },
      { date: new Date('November 17, 2018') },
      { date: new Date('November 18, 2018') }
    ]"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="'date'"
      :scale-y="[0, 100]"
      :brush="'rectangle'"
      @brushup="log($event)"
      @updateBrushPoints="brushPoints = $event"
    >

      <vgg-map v-slot="{ row, i }">

        <vgg-point
          :x="{ val: row.date }"
          :y="50"
          :size="14"
        />

      </vgg-map>

      <vgg-polygon
        :points="[
          [new Date('November 16, 2018'), 25],
          [new Date('November 17, 2018'), 75],
          [new Date('November 18, 2018'), 50]
        ]"
      />

      <vgg-x-axis
        :tick-count="3"
        scale="date"
      />

    </vgg-section>

    <vgg-polygon
      v-if="brushPoints.length > 1"
      :points="brushPoints"
      :fill="'green'"
      :opacity="0.3"
    />

  </vgg-graphic> -->
  <vgg-graphic
    :width="600"
    :height="600"
    :data="{
      a: ['apple', 'banana', 'coconut', 'banana', 'coconut', 'apple', 'durian'],
      b: [0, 32, 67, 34, 23, 12, 9]
    }"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="'a'"
      :scale-y="'b'"
      :brush="'rectangle'"
      @brushup="log($event)"
      @updateBrushPoints="brushPoints = $event"
    >

      <vgg-map v-slot="{ row, i }">

        <vgg-point
          :x="row.a"
          :y="row.b"
          :size="14"
        />

      </vgg-map>

      <vgg-polygon
        :points="[
          ['apple', 25],
          ['coconut', 55],
          ['durian', 20]
        ]"
      />

      <vgg-x-axis
        :tick-count="3"
        scale="a"
      />

    </vgg-section>

    <vgg-polygon
      v-if="brushPoints.length > 1"
      :points="brushPoints"
      :fill="'green'"
      :opacity="0.3"
    />

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
