<template>
  <vgg-graphic
    :width="350"
    :height="250"
    :data="{
      year: [2000, 2005, 2010, 2015, 2018, 1942, 1967, 2020, 1900, 1950, 1945],
      population: [100, 110, 130, 180, 200, 250, 100, 120, 156, 189, 120]
    }">


    <vgg-section
      :x1="50"
      :x2="250"
      :y1="50"
      :y2="200"
      :scale-x="'year'"
      :scale-y="'population'"
      :axes="{
        bottom: {'tick-count': 4}
      }"
    >

      <vgg-map v-slot="{ row }">

        <vgg-symbol
          :x="{ val: row.year, scale: 'year' }"
          :y="{ val: row.population, scale: 'population' }"
          :size="{ val: row.population, scale: { domain: 'population', domainMin: 150, range: [2, 12] } }"
          fill="#c66366"
        />

      </vgg-map>

    </vgg-section>

    <vgg-symbol-legend
      :scale="{ domain: 'population', domainMin: 200 }"
      :size="{ range: [2, 12] }"
      :tick-count="5"
      stroke="#c66366"
      fill="#c66366"
      position="tr"
    />
  </vgg-graphic>
</template>
