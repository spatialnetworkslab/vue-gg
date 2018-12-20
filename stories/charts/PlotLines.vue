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
        :func="x => (x ** 3) + (x / 2)"
        :width="3"
        color="#00919c"
      />

    </vgg-section>

  </vgg-graphic>
</template>
