<template>
  <vgg-graphic
    :width="600"
    :height="300"
    :data="data">

    <vgg-section
      v-if="showX"
      :x1="50"
      :x2="550"
      :y1="25"
      :y2="275"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-x-axis
        :scale="'xValues'"
        :tickExtra="false"
        :x1="50"
        :x2="550"
        :vjust="0.2"
      />

      <vgg-x-axis
        :scale="'xValues'"
        :tickExtra="false"
        :x1="50"
        :x2="450"
        :vjust="0.5"
      />

      <vgg-x-axis
        :scale="'xValues'"
        :tickExtra="false"
        :x1="50"
        :x2="250"
        :vjust="0.8"
        :tickCount="5"
      />

    </vgg-section>

    <vgg-section
      v-if="showY"
      :x1="50"
      :x2="550"
      :y1="25"
      :y2="275"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :y1="25"
        :y2="250"
        :hjust="0.2"
        :tickCount="5"
      />

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :y1="50"
        :y2="225"
        :hjust="0.5"
        :tickCount="5"
      />

      <vgg-y-axis
        :scale="'yValues'"
        :tickExtra="false"
        :y1="100"
        :y2="175"
        :hjust="0.8"
        :tickCount="5"
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
