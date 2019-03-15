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
      :scale-x="[0, 10]"
      :scale-y="[50, 80]"
      :axes="{
        bottom: { h: 50 },
        left: { 'tick-color': 'blue' }
      }"
      :grid-lines="['x', 'y']"
    >


    </vgg-section>

  </vgg-graphic>
</template>
