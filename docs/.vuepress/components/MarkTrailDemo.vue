<template>
  <div>
    <vgg-graphic
      :width="600"
      :height="500"
    >

      <vgg-data
        id="original"
        :data="xy"
      >

      <vgg-section
        :x1="50"
        :x2="550"
        :y1="50"
        :y2="450"
      >

        <vgg-data :transform="{ groupBy: 'brand' }">

        <vgg-map v-slot="{ row, i }">

          <vgg-trail
            :x="{ val: row.grouped.time, scale: 'original/time' }"
            :y="{ val: row.grouped.price, scale: 'original/price' }"
            :stroke-width="{ val: row.grouped.price, scale: { domain: 'original/price', range: [0, trailWidth] } }"
            :fill="{ val: row.grouped.color[i] }"
            :opacity="0.9"
          />

        </vgg-map>

        </vgg-data>

        <vgg-x-axis
          scale="time"
          :tickCount="5"
        />

        <vgg-y-axis
          scale="price"
          :hjust="0"
          :tickCount="5"
        />

      </vgg-section>

      </vgg-data>

    </vgg-graphic>

    <p>Max width:
      <span class="wrapper">
        <button v-on:click="decrease">-</button>
        {{ trailWidth + 'px' }}
        <button v-on:click="increase">+</button>
      </span>
    </p>
  </div>
</template>

<script>
import alibaba from './sampleData/alibaba.json'
import apple from './sampleData/apple.json'
import facebook from './sampleData/facebook.json'

export default {
  data () {
    return {
      xy: this.generateNewData(),
      trailWidth: 2,
    }
  },

  computed: {
    strokeScale () {
      return { domain: 'price', domainMax: this.trailWidth }
    }
  },

  methods: {
    generateNewData () {
      let newData =[]
      for (let ix = 0; ix < alibaba.length; ix ++) {
        newData.push({ brand: 'apple',
                       price: apple[ix]['High'],
                       time: ix,
                       color: '#c66366',
                     })
        newData.push({ brand: 'alibaba',
                       price: alibaba[ix]['High'],
                       time: ix,
                       color: '#ce9b3d',
                     })
        newData.push({ brand: 'facebook',
                       price: facebook[ix]['High'],
                       time: ix,
                       color: '#008080',
                     })
      }
      return newData
    },

    increase () {
      if (this.trailWidth < 20) {
        this.trailWidth++
      }
    },

    decrease () {
      if (this.trailWidth > 2) {
        this.trailWidth--
      }
    }

  }
}
</script>

<style scoped>

button {
  border-radius: 3px;
  border: solid;
  border-width: 1px;
  border-color: #e6e6e6;
  margin-left: 5px;
  margin-right: 5px;
}

</style>
