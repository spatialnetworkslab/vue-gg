<template>
  <vgg-graphic
    :width="600"
    :height="200"
    :data="data"
    :transform="{ groupBy: 'item' }"
  >

    <vgg-map v-slot="{ row }">

      <vgg-section
        :x="{ scale: 'item' }"
        :w="200"
        :y="100"
        :h="200"
        :data="{ val: row.grouped }"
      >

        <!-- <vgg-map>

          <vgg-point
            :x=""
          />

        </vgg-map> -->

      </vgg-section>

    </vgg-map>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let items = ['apple', 'banana', 'coconut']

      let item = []
      let price = []
      let amount = []

      for (let i = 0; i < 30; i++) {
        let randomItem = items[Math.floor(Math.random() * items.length)]
        item.push(randomItem)
        price.push(Math.floor(Math.random() * 500) / 100)
        amount.push(Math.floor(Math.random() * 10))
      }

      return { item, price, amount }
    }
  }
}
</script>
