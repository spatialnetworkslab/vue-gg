<template>
  <vgg-graphic
    :width="600"
    :height="600"
  >

    <!-- Axes -->
    <vgg-x-axis
      :x1="100"
      :x2="500"
      :y1="275"
      :y2="325"
      :domain="[-1, 1]"
    />

    <vgg-y-axis
      :x1="275"
      :x2="325"
      :y1="100"
      :y2="500"
      :domain="[-1, 1]"
    />

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
        :x1="-1"
        :x2="1"
        :y1="-1"
        :y2="1"
        :width="5"
        color="#535347"
      />

      <vgg-multi-line
        :points="[[-1, -1], [-1, -0.5], [-0.5, -0.5], [0, -0.5], [0, 0],
        [0.5, 0], [0.5, 0.5], [1, 0.5], [1, 1]]"
        :width="5"
        color="#1336c9"
      />

      <vgg-line
        :func="x => (x ** 3) + (x / 2)"
        :width="3"
        color="#00919c"
      />

    </vgg-section>

  </vgg-graphic>
</template>
