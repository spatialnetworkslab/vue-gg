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
    >

      <vgg-x-grid :scale="[0, 5]" />
      <vgg-y-grid :scale="[0, 5]" />

    </vgg-section>

  </vgg-graphic>
</template>
