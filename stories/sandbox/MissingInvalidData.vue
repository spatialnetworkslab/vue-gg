<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <vgg-point
      :x="300"
      :y="300"
    />

    <vgg-map>

      <vgg-point
        :x="{ scale: 'a' }"
        :y="{ scale: 'b' }"
      />

    </vgg-map>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      data: { a: ['banana'], b: [5] }
    }
  }
}
</script>
