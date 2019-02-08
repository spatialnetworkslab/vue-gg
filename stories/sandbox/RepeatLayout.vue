<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{
      a: [1, 2, 3, 4],
      b: [5, 6, 7, 8],
      c: [8, 7, 6, 5]
    }"
  >

    <vgg-layout
      :type="'repeat'"
      :options="{
        x: ['a', 'b', 'c'],
        y: ['a', 'b', 'c'],
        cellPadding: 10,
        layoutPadding: 30
      }"
    >

      <vgg-section
        slot-scope="{ x, y }"
        :scale-x="[0, 1]"
        :scale-y="[0, 1]"
      >

        <vgg-rectangle
          :x1="0"
          :x2="1"
          :y1="0"
          :y2="1"
          :opacity="0.4"
          :fill=" x === 'b' ? 'red' : 'green' "
        />

        <vgg-map>

          <vgg-point
            :x="{ get: x, scale: x }"
            :y="{ get: y, scale: y }"
          />

        </vgg-map>

      </vgg-section>

    </vgg-layout>

  </vgg-graphic>
</template>
