<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="test">

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: [-1, 1],
        y: [-1, 1]
      }"
    >

      <!-- Axes -->
      <vgg-line
        :x1="0"
        :x2="0"
        :y1="-1"
        :y2="1"
      />

      <vgg-line
        :x1="-1"
        :x2="1"
        :y1="0"
        :y2="0"
      />

      <!-- Mapping test -->
      <vgg-map>

        <vgg-line
          :x1="{ scale: 'a' }"
          :x2="{ scale: 'a' }"
          :y1="-1"
          :y2="1"
          :width="1"
        />

      </vgg-map>

      <!-- Graphs -->
      <vgg-line
        :func="x => x ** 2"
        :width="3"
        color="#8b0000"
      />

      <vgg-line
        :func="x => (-1) * x ** 2"
        :width="3"
        color="#ced02d"
      />

      <vgg-line
        :func="x => (x ** 3) + (x / 2)"
        :width="3"
        color="#00919c"
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      test: [{ a: -1 }, { a: -0.5 }, { a: 0.5 }, { a: 1 }]
    }
  }
}
</script>
