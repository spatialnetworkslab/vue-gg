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
      :scale-x="'date'"
      :scale-y="[0, 100]"
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
      scale="date"
    />

  </vgg-graphic>
</template>
