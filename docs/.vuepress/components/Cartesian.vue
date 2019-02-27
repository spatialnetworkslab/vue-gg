<template>
  <vgg-graphic
    :width="600"
    :height="300"
    :data="data">

    <vgg-plot-title v-if="showX" text="x axis positioning" />

    <vgg-plot-title v-if="showY" text="y axis positioning" />

    <vgg-section
      v-if="showX"
      :x1="100"
      :x2="550"
      :y1="25"
      :y2="200"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-x-axis
        :scale="'xValues'"
        :vjust="0"
        :tickCount="5"
        :tickExtra="false"
        title="vjust = 0"
      />

      <vgg-x-axis
        :scale="'xValues'"
        :vjust="0.5"
        :tickCount="5"
        :tickExtra="false"
        title="vjust = 0.5"
      />

      <vgg-x-axis
        :scale="'xValues'"
        :vjust="1"
        :tickCount="5"
        :tickExtra="false"
        title="vjust = 1"
      />

    </vgg-section>

    <vgg-section
      v-if="showY"
      :x1="50"
      :x2="550"
      :y1="25"
      :y2="200"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :hjust="0"
        :tickCount="5"
        title="hjust = 0"
      />

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :hjust="0.5"
        :tickCount="5"
        title="hjust = 0.5"
      />

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :hjust="1"
        :tickCount="5"
        title="hjust = 1"
      />

    </vgg-section>

    <vgg-section
      v-if="showAll"
      :x1="50"
      :x2="550"
      :y1="25"
      :y2="250"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-x-axis
        :scale="'xValues'"
        title="x axis"
        :tickExtra="false"
        :titleHjust="1.05"
      />

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :tickCount="5"
        title="y axis"
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  props: {
    showX : {
      default: false
    },

    showY : {
      default: false
    },

    showAll : {
      default: false
    }
  },

  computed: {
    data () {
      let colors = ['red', 'blue', 'green']
      let data = { colors: [], xValues: [], yValues: [] }
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * 3)
        let color = colors[colorIndex]

        data.colors.push(color)
        data.xValues.push(Math.random() * 10)
        data.yValues.push(Math.random() * 100)
      }

      return data
    }
  }
}
</script>
