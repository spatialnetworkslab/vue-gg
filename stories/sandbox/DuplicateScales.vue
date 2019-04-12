<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="{ a: [1, 2, 3], b: [4, 5, 6] }"
  >

    <vgg-scales :scales="{ henk: 'a' }" />
    <vgg-scales :scales="{ henk: 'b' }" />

  </vgg-graphic>
</template>
