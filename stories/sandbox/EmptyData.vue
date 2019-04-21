<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{ a: [5, 6], b: [7, 8] }"
    :transform="{ filter: a => a < 5 }"
  >

    <vgg-section
      :x1="25"
      :x2="475"
      :y1="25"
      :y2="475"
      :scale-x="[0, 10]"
      :scale-y="[0, 10]"
    >

      <vgg-point
        :x="5"
        :y="5"
      />

    </vgg-section>

  </vgg-graphic>
</template>
