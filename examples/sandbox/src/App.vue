<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data">

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="'a'"
      :scale-y="'b'"
    >

      <vgg-map v-slot="{ row }">

        <vgg-point
          :x="row.a"
          :y="row.b"
          :radius="3"
          :fill="{ val: row.a, scale: { type: 'viridis', domain: 'a' } }"
          @hover="handleHover($event, row)"
        />

        <!-- <vgg-point
          :x="row.a"
          :y="row.b"
          :radius="3"
          :fill="{ val: row.a, scale: { type: 'viridis', domain: 'a' } }"
        /> -->

      </vgg-map>

      <vgg-point
        v-if="hoverRow"
        :x="hoverRow.a"
        :y="hoverRow.b"
        :radius="5"
        :fill="'pink'"
      />

      <vgg-x-axis
        :scale="'a'"
        :title-hjust="1.1"
        :vjust="-.05"
      />

      <vgg-y-axis
        :scale="'b'"
        :hjust="-.05"
        flip
      />

    </vgg-section>

    <vgg-x-grid
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale="'a'"
    />

    <vgg-y-grid
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale="'b'"
    />

  </vgg-graphic>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      data: this.generateData(),
      hoverRow: null
    }
  },

  created () {
    console.time('scatter')
  },

  mounted () {
    this.$nextTick(() => {
      console.timeEnd('scatter')
    })
  },

  methods: {
    generateData () {
      let data = []
      let beta0 = Math.random() * 100
      let beta1 = 0.25 + Math.random() * 2
      let range = Math.random() * 1000
      for (let i = 0; i < 10000; i++) {
        let a = Math.random() * range
        let error = Math.random() * range
        let b = beta0 + a * beta1 + error
        data.push({ a, b })
      }
      return data
    },

    handleHover (e, row) {
      if (e) {
        this.hoverRow = row
      } else {
        this.hoverRow = null
      }
    }
  }
}
</script>
