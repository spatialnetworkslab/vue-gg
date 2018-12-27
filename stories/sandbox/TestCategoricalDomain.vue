<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="[
      { date: new Date('November 16, 2018') },
      { date: new Date('November 17, 2018') },
      { date: new Date('November 18, 2018') }
    ]"
  >

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: 'date',
        y: [0, 100]
      }"
    >

      <vgg-map>

        <vgg-point
          :x="row => row.date"
          :y="50"
          :radius="7"
        />

      </vgg-map>

      <vgg-polygon
        :points="[
          [new Date('November 16, 2018'), 25],
          [new Date('November 17, 2018'), 75],
          [new Date('November 18, 2018'), 50]
        ]"
      />

    </vgg-section>

    <vgg-x-axis
      :x1="100"
      :x2="500"
      :y1="50"
      :y2="100"
      :tick-count="3"
      domain="date"
    />

    <!-- <vgg-section
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

      <vgg-map
        :data="[
          { x: 'a', color: '#8b0000' },
          { x: 'b', color: '#ced02d' },
          { x: 'c', color: '#00919c' },
          { x: 'd', color: '#d3d3d3' }
        ]"
      >

        <vgg-rectangle
          :x="row => row.x"
          :w="{ position: 'bulge' }"
          :y1="25"
          :y2="75"
          :color="row => row.color"
        />

      </vgg-map>

    </vgg-section> -->

  </vgg-graphic>
</template>
