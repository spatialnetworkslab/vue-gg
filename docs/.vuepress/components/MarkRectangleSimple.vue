<template>

  <vgg-graphic
    :width="200"
    :height="250"
    :data="{
      year: [2000, 2005, 2010, 2015],
      population: [100, 110, 130, 180]
    }">

    <vgg-section
      :x1="25"
      :x2="175"
      :y1="25"
      :y2="225"
      scale-x="year"
      :scale-y="{domain: 'population', domainMin: 0}"
      :axes="{
        left: {'tick-count': 4, 'w': 30},
        bottom: {'tick-count': 4}
      }"
    >

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