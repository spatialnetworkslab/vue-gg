<template>

  <vgg-graphic
    :width="300"
    :height="250"
    >

    <vgg-section
      :x1="25"
      :x2="275"
      :y1="25"
      :y2="225"
      :scale-x="[0, 100]"
      :scale-y="[-50, 50]"
      >
      
      <vgg-multi-point
        :points="[
          [78, 44], [41, 43], [36, -37], [54, -17],
          [70, 29], [31, 0], [88, -50], [97, 15],
          [76, -34], [60, -47], [100, -24], [66, -2],
          [65, 4], [34, -10], [11, 50], [1, -11],
          [49, -49], [54, -40], [30, 49], [39, 39]
        ]"
      />

      <vgg-x-axis
        :scale="[0, 100]"
        :tickCount="5"
      />

      <vgg-y-axis
        :scale="[-50, 50]"
        :hjust="0"
        :tickCount="2"
      />

    </vgg-section>

  </vgg-graphic>

</template>

