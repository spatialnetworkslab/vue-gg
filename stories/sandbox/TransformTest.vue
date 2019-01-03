<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <vgg-transform
      :trans="[
        { rename: { a: 'apple', b: 'banana', d: 'durian' } },
        { select: ['apple', 'banana', 'durian'] },
        { filter: ({ durian }) => durian > 25 },
        { arrange: [{ banana: 'ascending' }, { apple: 'descending' }] },
        { mutate: { ratioAppleDurian: ({ apple, durian }) => apple / durian } }
      ]"
    >

    </vgg-transform>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      data: {
        a: this.generate(100),
        b: this.generate(10),
        c: this.generate(100),
        d: this.generate(100)
      }
    }
  },

  methods: {
    generate (spread) {
      const N = 100
      let col = new Array(N)
      for (let i = 0; i < N; i++) {
        col[i] = Math.floor(Math.random() * spread)
      }
      return col
    }
  }
}
</script>
