<template>

  <vgg-graphic
    :width="300"
    :height="250"
    :data="{
      year: [2000, 2005, 2010, 2015,
      2000, 2005, 2010, 2015],
      population: [100, 110, 130, 180,
      200, 310, 430, 480],
      color: ['#c66366', '#c66366', '#c66366', '#c66366',
      '#008080', '#008080', '#008080', '#008080']
    }">

    <vgg-section
      :x1="30"
      :x2="275"
      :y1="25"
      :y2="225"
      scale-x="year"
      :scale-y="{domain: 'population', domainMin: 0}"
    >

      <vgg-x-axis
        scale="year"
        :tickCount="4"
      />

      <vgg-y-axis
        :scale="{domain: 'population', domainMin: 0}"
        :hjust="0"
        :tickCount="4"
      />

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