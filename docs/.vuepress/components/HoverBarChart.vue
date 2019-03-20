<template>
  <div>
    <div v-if="hoverRow" style="float: right;">
      <h3>{{ hoverRow.fruit }}</h3>
      <h5>quantity: {{ hoverRow.quantity }}</h5>
      <p>
        {{ metadata.description[hoverRow.fruit] }}
      </p>
    </div>

    <vgg-graphic
      :width="300"
      :height="300"
      :data="{
        fruit: ['apple', 'banana', 'coconut', 'durian'],
        quantity: [5, 20, 10, 8]
      }"
    >

      <vgg-section
        :x1="0"
        :x2="300"
        :y1="0"
        :y2="275"
        :axes="{
          right: { scale: { domain: 'quantity', domainMin: 0 } },
          bottom: { scale: 'fruit' }
        }"
      >

        <vgg-map v-slot="{ row, i }">

          <vgg-rectangle
            :x="{ val: row.fruit, scale: 'fruit' }"
            :w="{ band: { domain: 'fruit', padding: 0.2 } }"
            :y1="0"
            :y2="{ val: row.quantity, scale: { domain: 'quantity', domainMin: 0 } }"
            :fill="hoverI === i ? 'green' : 'black'"
            @hover="handleHover($event, row, i)"
          />

        </vgg-map>

      </vgg-section>

    </vgg-graphic>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hoverI: null,
      hoverRow: null,

      metadata: {
        description: {
          apple: 'The natural enemy of the doctor',
          banana: 'Watch out: slippery after consumption',
          coconut: 'An indispensable ingredient in Indonesian cuisine',
          durian: 'The rich person\'s jackfruit'
        }
      }
    }
  },

  methods: {
    handleHover (e, row, i) {
      if (e) {
        this.hoverI = i
        this.hoverRow = row
      } else {
        this.hoverI = null
        this.hoverRow = null
      }
    }
  }
}
</script>
