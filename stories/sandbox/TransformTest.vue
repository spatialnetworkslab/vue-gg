<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <vgg-transform
      :trans="[
        { select: ['a', 'b', 'd'] },
        { filter: ({ d }) => d > 25 },
        { arrange: [{ b: 'ascending' }, { a: 'descending' }] }
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
