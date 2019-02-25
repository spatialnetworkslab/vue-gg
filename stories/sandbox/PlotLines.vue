<template>
  <vgg-graphic
    :width="600"
    :height="600"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="[-1, 1]"
      :scale-y="[-1, 1]"
    >

      <!-- Graphs -->
      <vgg-line
        :func="x => x ** 2"
        :stroke-width="3"
        stroke="#8b0000"
      />

      <vgg-line
        :func="x => (-1) * x ** 2"
        :stroke-width="3"
        stroke="#ced02d"
      />

      <vgg-line
        :x1="-1"
        :x2="1"
        :y1="-1"
        :y2="1"
        :stroke-width="5"
        stroke="#535347"
      />

      <vgg-multi-line
        :points="[
          [-1, -1], [-1, -0.5], [-0.5, -0.5], [0, -0.5], [NaN, 0],
          [0.5, 0], [0.5, 0.5], [1, 0.5], [1, 1]
        ]"
        :stroke-width="5"
        stroke="#1336c9"
      />

      <vgg-line
        :func="x => (x ** 3) + (x / 2)"
        :width="3"
        stroke="#00919c"
      />

      <!-- Axes -->
      <vgg-x-axis
        :scale="[-1, 1]"
        :titleHjust="1.1"
        :vjust="-.05"
      />

      <vgg-y-axis
        :scale="[-1, 1]"
        :hjust="-.05"
        flip
      />

    </vgg-section>

  </vgg-graphic>
</template>
