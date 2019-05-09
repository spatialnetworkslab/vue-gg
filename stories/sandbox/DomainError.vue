<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{ a: [100, 200, 300] }"
  >

    <!-- <vgg-map v-slot="{ row }">

      <vgg-point
        :x="row.a"
        :y="row.b"
      />

    </vgg-map> -->

    <vgg-scales :scales="{ someScale: 'b' }" />

  </vgg-graphic>
</template>
