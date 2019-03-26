<template>
  <div>
    <vgg-graphic
      :width="600"
      :height="500"
      :data="xy">

      <vgg-data :transform="{ groupBy: 'brand' }">

        <vgg-section
          :x1="50"
          :x2="550"
          :y1="50"
          :y2="450"
        >

          <vgg-map v-slot="{ row }">

            <vgg-trail
              :x="{ val: row.time, scale: 'time' }"
              :y="{ val: row.price, scale: 'price' }"
              :stroke-width="{ val: row.price, scale: 'price' }"
              fill="#008080"
            />

          </vgg-map>

        </vgg-section>

        <!-- <vgg-x-axis
          scale="time"
          :tickCount="5"
        />

        <vgg-y-axis
          scale="price"
          :hjust="0"
          :tickCount="5"
        /> -->

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
export default {
  data () {
    return {
      xy: this.generateNewData(),
      trailWidth: 20
    }
  },

  methods: {
    generateNewData () {
      let apple = [178.940002, 190.369995, 194.199997, 195.960007,
                   228.869995, 229.669998, 233.470001, 222.360001,
                   184.940002, 169, 175.869995, 197.690002]
      let tesla = [256.26001, 293.51001, 285.859985, 360.070007,
                   297.98999, 296.940002, 305.769989, 338.26001,
                   360, 306.100006, 305.420013, 306.940002]
      let snap = [15.67, 14.34, 11.71, 13.05, 12.55, 10.92, 8.5,
                  6.6, 6.61, 5.38, 6.78, 9.86]
      let newData =[]
      for (let ix = 0; ix < 12; ix ++) {
        newData.push({ brand: 'apple', price: apple[ix], time: ix })
        newData.push({ brand: 'tesla', price: tesla[ix], time: ix })
        newData.push({ brand: 'snap', price: snap[ix], time: ix })
      }
      return newData

    },

    increase () {
      if (this.trailWidth < 50) {
        this.trailWidth = this.trailWidth + 5
      }
    },

    decrease () {
      if (this.trailWidth > 5) {
        this.trailWidth = this.trailWidth - 5
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
