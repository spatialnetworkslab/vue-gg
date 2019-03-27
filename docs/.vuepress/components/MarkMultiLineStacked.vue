<template>

  <vgg-graphic
    :width="200"
    :height="250"
    :data="{
      year: [2000, 2005, 2010, 2015,
      2000, 2005, 2010, 2015],
      population: [100, 110, 130, 180,
      200, 310, 430, 480],
      color: ['#c66366', '#c66366', '#c66366', '#c66366',
      '#7CAE00', '#7CAE00', '#7CAE00', '#7CAE00']
    }">

    <vgg-section
      :x1="25"
      :x2="175"
      :y1="25"
      :y2="225"
      scale-x="year"
      scale-y="population"
      :axes="{
        left: {'tick-count': 4, 'w': 30},
        bottom: {'tick-count': 4}
      }"
    >
      <vgg-data :transform="{ groupBy: 'color' }">
      
      <vgg-map v-slot="{ row }">

        <vgg-multi-line
          :x="row.grouped.year"
          :y="row.grouped.population"
          :stroke="row.color"
        />

      </vgg-map>

      </vgg-data>

    </vgg-section>

   

  </vgg-graphic>

</template>