<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{ fruit: ['apple', 'banana', 'coconut', 'durian', 'eggplant'] }"
  >

    <vgg-grid :cols="3">

      <vgg-map v-slot="{ row }">

        <vgg-section
          :scale-x="[0, 1]"
          :scale-y="[0, 1]"
        >

          <vgg-rectangle
            :x1="0"
            :x2="1"
            :y1="0"
            :y2="1"
            :fill="{ val: row.fruit, scale: {
              domain: 'fruit',
              range: ['#2A5B84', '#AAC4D1', '#EBC137', '#FEFAE1', '#BD8025']
            } }"
          />

        </vgg-section>

      </vgg-map>

    </vgg-grid>

  </vgg-graphic>
</template>
