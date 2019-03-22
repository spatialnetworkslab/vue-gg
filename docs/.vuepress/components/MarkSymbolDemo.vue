<template>
  <div>

    <vgg-graphic
      :width="600"
      :height="500"
      :data="xy">

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="450"
      >

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :x="{ val: row.explanatory, scale: 'explanatory' }"
            :y="{ val: row.dependent, scale: 'dependent' }"
            :size="16"
            :shape="shape"
            :stroke="stroke"
            :fill="fill(row.explanatory)"
            :stroke-width="1"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="[0, 150]"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'dependent'"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <vgg-x-grid
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="450"
        :scale="'explanatory'"
      />

      <vgg-y-grid
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="450"
        :scale="'dependent'"
      />

    </vgg-graphic>

    <br />

    <p>Shape:
      <select v-model="shape">
        <option value="circle">circle</option>
        <option value="square">square</option>
        <option value="cross">cross</option>
        <option value="diamond">diamond</option>
        <option value="triangle-up">triangle-up</option>
        <option value="triangle-down">triangle-down</option>
        <option value="triangle-right">triangle-right</option>
        <option value="triangle-left">triangle-left</option>
        <option value="star">star</option>
        <option value="M-1,-1H1V1H-1Z">M-1,-1H1V1H-1Z</option>
      </select>
    </p>

    <p>Color:
      <input type="radio" id="stroke" value="stroke" v-model="color"><label for="stroke">Stroke</label>
      <input type="radio" id="fill" value="fill" v-model="color"><label for="fill">Fill</label>
      <input type="radio" id="both" value="both" v-model="color"><label for="both">Both</label>
    </p>

  </div>
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
