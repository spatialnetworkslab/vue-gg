<template>

  <vgg-graphic
    :width="300"
    :height="250"
    :data="{
      year: [2000, 2005, 2010, 2015],
      population: [100, 110, 130, 180]
    }">

    <vgg-section
      :x1="30"
      :x2="275"
      :y1="25"
      :y2="225"
      :scale-x="{domain: 'year', domainMin: 1997.5, domainMax: 2017.5}"
      :scale-y="{domain: 'population', domainMin: 0}"
    >

      <vgg-x-axis
        :scale="{domain: 'year', domainMin: 1997.5, domainMax: 2017.5}"
        :tickCount="4"
        :tickExtra="false"
      />

      <vgg-y-axis
        :scale="{domain: 'population', domainMin: 0}"
        :hjust="0"
        :tickCount="4"
      />

      <vgg-map v-slot="{ row }">

        <vgg-rectangle
          :x="row.year"
          :y1="row.population"
          :y2="0"
          :w="2.5"
          fill="#c66366"
        />

      </vgg-map>

    </vgg-section>

   

  </vgg-graphic>

</template>