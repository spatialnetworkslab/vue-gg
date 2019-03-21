<template>
  <div>
    <vgg-graphic
      :width="600"
      :height="600"
      :data="data">

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale-x="'xValues'"
        :scale-y="'yValues'"
      >

        <vgg-data :transform="{ groupBy: 'colors' }">

          <vgg-map v-slot="{ row }">

            <vgg-multi-line
              :curve="selected"
              :x="row.grouped.xValues"
              :y="row.grouped.yValues"
              :stroke="row.colors"
              :stroke-width="1"
              :opacity="0.6"
            />

          </vgg-map>

        </vgg-data>

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :x="row.xValues"
            :y="row.yValues"
            stroke="grey"
            :strokeWidth="1"
            :strokeOpacity="0.6"
            fill="none"
            :size="5"
          />

        </vgg-map>

      </vgg-section>

    </vgg-graphic>

    <select v-model="selected">
      <option value="curveBasis">curveBasis</option>
      <option value="curveBasisClosed">curveBasisClosed</option>
      <option value="curveBundle">curveBundle</option>
      <option value="curveCardinal">curveCardinal</option>
      <option value="curveCatmullRom">curveCatmullRom</option>
      <option value="curveMonotoneX">curveMonotoneX</option>
      <option value="curveMonotoneY">curveMonotoneY</option>
      <option value="curveNatural">curveNatural</option>
      <option value="curveStep">curveStep</option>
      <option value="curveStepAfter">curveStepAfter</option>
      <option value="curveStepBefore">curveStepBefore</option>
    </select>

    <div style="margin-top: 10px;">
      <button @click="generateNewData()">Generate new data</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'curveBasis',
      data: undefined
    }
  },

  mounted () {
    this.generateNewData()
  },

  methods: {
    generateNewData () {
      let data = { colors: [], xValues: [], yValues: [] }
      let last = 0
      for (let i = 0; i < 10; i++) {
        data.colors.push('grey')
        data.xValues.push(last + Math.random() * 2 + 10)
        data.yValues.push(Math.random() * 50)
      }
      console.log(data)
      this.data = data
    }
  },
}
</script>
