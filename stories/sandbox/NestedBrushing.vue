<template>
  <vgg-graphic
    :width="500"
    :height="500"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :scale-x="['a', 'b', 'c', 'd', 'e']"
      :scale-y="[0, 100]"
      :brush="{
        type: 'rectangle',
        scaleX: [0, 5]
      }"
      @brushup="log($event)"
    >

      <vgg-section
        :x1="'b'"
        :x2="'d'"
        :y1="0"
        :y2="100"
        :scale-x="[0, 1]"
        :scale-y="[0, 1]"
      >

        <vgg-rectangle
          :x1="0"
          :x2="1"
          :y1="0"
          :y2="1"
          :fill="'green'"
          :opacity="0.4"
        />

      </vgg-section>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  methods: {
    log: console.log
  }
}
</script>
