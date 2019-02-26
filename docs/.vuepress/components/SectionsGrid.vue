<template>
  <vgg-graphic :width="500" :height="500">

    <vgg-grid
      :rows="3"
      :cell-padding="{
        t: 10,
        l: 15,
        r: 5
      }"
    >

      <vgg-section
        v-for="color in ['#2A5B84', '#AAC4D1', '#EBC137', '#FEFAE1', '#BD8025']"
        :key="color"
        :scale-x="[0, 1]"
        :scale-y="[0, 1]"
      >

        <vgg-rectangle :x1="0" :x2="1" :y1="0" :y2="1" :fill="color" />

      </vgg-section>

    </vgg-grid>

  </vgg-graphic>
</template>
