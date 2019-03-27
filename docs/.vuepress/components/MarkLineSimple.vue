<template>
  <vgg-graphic
    :width="300"
    :height="300"
  >

    <vgg-section
      :x1="25"
      :x2="275"
      :y1="25"
      :y2="275"
      :scale-x="[-1, 1]"
      :scale-y="[-1, 1]"
    >

      <vgg-line
        :x1="-1"
        :x2="1"
        :y1="-1"
        :y2="1"
        stroke="green"
      />

      <vgg-line :func="x => x ** 2" stroke="blue" />

      <vgg-x-axis :scale="[-1, 1]" :vjust="0.5" />
      <vgg-y-axis :scale="[-1, 1]" :hjust="0.5" />

    </vgg-section>

  </vgg-graphic>
</template>
