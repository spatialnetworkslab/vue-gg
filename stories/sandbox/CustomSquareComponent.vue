<template>
  <vgg-section
    :x1="x1"
    :x2="x2"
    :y1="y1"
    :y2="y2"
    :scale-x="[0, 1]"
    :scale-y="[0, 1]"
  >

    <vgg-point
      :x="0.5"
      :y="0.5"
    />

    <vgg-rectangle
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :fill="fill"
    />

  </vgg-section>

</template>

<script>
export default {
  props: {
    x1: {
      type: Number,
      required: true
    },
    x2: {
      type: Number,
      required: true
    },
    y1: {
      type: Number,
      required: true
    },
    y2: {
      type: Number,
      required: true
    },
    fill: {
      type: String,
      default: 'black'
    }
  }
}
</script>
