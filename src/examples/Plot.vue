<template>
  <vgg-graphic
    :width="800"
    :height="800"
    class="graphic">

    <vgg-coordinate-transformation
      :x="100"
      :x2="700"
      :y="100"
      :y2="700"
      :domains="{
        x: [-1, 1],
        y: [-1, 1]
      }"
    >

      <!-- Axes -->
      <vgg-line
        :x="0"
        :x2="0"
        :y="-1"
        :y2="1"
      />

      <vgg-line
        :x="-1"
        :x2="1"
        :y="0"
        :y2="0"
      />

      <!-- Lines -->
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

    </vgg-coordinate-transformation>

  </vgg-graphic>
</template>
