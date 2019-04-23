<template>
  <vgg-graphic
    :width="600"
    :height="600"
  >

    <vgg-scales
      :scales="{ temp: [new Date('November 16, 2018'), new Date('November 18, 2018')] }"
    />

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="'#temp'"
      :scale-y="[0, 100]"
    >

      <vgg-polygon
        :points="[
          [new Date('November 16, 2018'), 25],
          [new Date('November 17, 2018'), 75],
          [new Date('November 18, 2018'), 50]
        ]"
      />

      <vgg-x-axis
        :tick-count="3"
        scale="#temp"
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      selectionBounds: []
    }
  },

  methods: {
    log: console.log
  }
}
</script>
