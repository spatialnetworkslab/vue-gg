<template>
  <vgg-graphic
    :width="600"
    :height="600">

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: ['a', 'b', 'c', 'd'],
        y: [0, 100]
      }"
    >

      <vgg-point
        :x="'b'"
        :y="50"
        :radius="30"
      />

    </vgg-section>

  </vgg-graphic>
</template>
