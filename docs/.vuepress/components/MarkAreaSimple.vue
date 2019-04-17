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
      scale-x="year"
      :scale-y="{domain: 'population', domainMin: 0}"
    >

      <vgg-map v-slot="{ dataframe }"
      unit="dataframe">

        <vgg-area
          :x="dataframe.year"
          :y="dataframe.population"
          :y2="[0]"
          fill="#c66366"
        />

      </vgg-map>

      <vgg-x-axis
        scale="year"
        :tickCount="4"
      />

      <vgg-y-axis
        :scale="{domain: 'population', domainMin: 0}"
        :hjust="0"
        :tickCount="3"
      />

    </vgg-section>

   

  </vgg-graphic>

</template>