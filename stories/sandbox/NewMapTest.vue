<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{
      a: [1, 2, 3, 4],
      b: [5, 6, 7, 8]
    }"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :scale-x="'a'"
      :scale-y="'b'"
    >

      <vgg-map>

        <vgg-point
          slot-scope="{ row }"
          :x="row.a"
          :y="row.b"
        />

      </vgg-map>

    </vgg-section>

  </vgg-graphic>
</template>
