<template>

  <vgg-graphic
    :width="300"
    :height="250"
    :data="xy">

    <vgg-section
      :x1="25"
      :x2="275"
      :y1="25"
      :y2="225"
    >

      <vgg-map v-slot="{ row }">

        <vgg-symbol
          :x="{ val: row.explanatory, scale: 'explanatory' }"
          :y="{ val: row.dependent, scale: 'dependent' }"
          :size="6"
          shape="circle"
          fill="#c66366"
        />

      </vgg-map>

      <vgg-x-axis
        scale="explanatory"
        :tickCount="5"
      />

      <vgg-y-axis
        scale="dependent"
        :hjust="0"
        :tickCount="2"
      />

    </vgg-section>

  </vgg-graphic>

</template>

<script>
export default {
  data () {
    return {
      xy: this.generateNewData(),
      shape: 'circle',
      color: 'both',
    }
  },

  props: {
    simple: {
      type: Boolean,
      default: false
    }
  },

  computed : {
    stroke () {
      if (this.color === 'both' || this.color === 'stroke') {
        return 'black'
      } else {
        return 'none'
      }
    }
  },
  methods: {
    generateNewData () {
      let xValues = [78,41, 36, 54,70,31,88,97,76,  60, 100,66,65,34, 11,1,  49,  54,30,39]
      let yValues = [44,43,-37,-17,29,0,-50,15,-34,-47,-24, -2,4,  -10,50,-11,-49,-40,49,39]
      // xValues.sort()
      yValues.sort()
      let newData =[]
      for (let ix = 0; ix < 20; ix ++) {
        newData.push({explanatory: xValues[ix], dependent: yValues[ix]})
      }
      return newData

    },

    fill (value) {
      if (this.color === 'both' || this.color === 'fill') {
        return { val: value, scale: { type: 'viridis', domain: 'explanatory' } }
      } else {
        return 'none'
      }
    },
  }
}
</script>
