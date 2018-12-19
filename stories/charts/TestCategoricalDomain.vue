<template>
  <vgg-graphic
    :width="600"
    :height="600"
  >

    <!-- <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: [new Date('November 16, 2018'), new Date('November 18, 2018')],
        y: [0, 100]
      }"
    >

      <vgg-map :data="[
        { d: new Date('November 16, 2018') },
        { d: new Date('November 17, 2018') },
        { d: new Date('November 18, 2018') }
      ]">

        <vgg-point
          :x="row => row.d"
          :y="50"
          :radius="7"
        />

      </vgg-map>

    </vgg-section> -->

    <vgg-section
      :type="'polar'"
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: ['a', 'b', 'c', 'd'],
        y: [0, 100]
      }"
    >

      <vgg-rectangle
        :x1="'a'"
        :x2="'b'"
        :y1="25"
        :y2="75"
        color="#8b0000"
      />
      <vgg-rectangle
        :x1="'b'"
        :x2="'c'"
        :y1="25"
        :y2="75"
        color="#ced02d"
      />
      <vgg-rectangle
        :x1="'c'"
        :x2="'d'"
        :y1="25"
        :y2="75"
        color="#00919c"
      />

    </vgg-section>

  </vgg-graphic>
</template>
