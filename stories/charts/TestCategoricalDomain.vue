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
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: ['a', 'b', 'c', 'd'],
        y: [0, 100]
      }"
    >

      <vgg-point
        :x="'b'"
        :y="50"
        :radius="3"
      />

      <vgg-point
        :x="'c'"
        :y="50"
        :radius="3"
      />

      <vgg-section
        :x1="'b'"
        :x2="'c'"
        :y1="25"
        :y2="75"
        :domains="{
          x: [0, 10],
          y: [0, 10]
        }"
      >

        <vgg-point
          :x="5"
          :y="5"
          :radius="5"
        />

      </vgg-section>

    </vgg-section>

  </vgg-graphic>
</template>
