<template>
  <!-- <vgg-parallel-coordinates
    :x1="100"
    :x2="1500"
    :y1="100"
    :y2="700"
    :width="1600"
    :height="800"
    :csvURL="'../../static/motorbikes_40_clean.csv'"
    :extract-variables="{
      'Base MSRP': 'Price',
      'Wet Weight': 'WetWeight',
      '0–60 mph sec': 'ZeroTo60',
      'Rear-Wheel HP':'RearWheelHorsepower',
      'Top Speed': 'TopSpeed',
      'Average MPG': 'MilesPG',
      '0–60 mph sec': 'ZeroTo60',
      'Braking 60 to 0 mph (feet)': 'Stop60',
      'Rear-Wheel TQ Lb-Ft': 'RearWheelTQLbFt',
      'Quartermile Sec':'QuartermileSec'}"
    :color="'Color'"
    :dimensions="['Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio']"
    :options="'Name'"
  /> -->

  <vgg-parallel-coordinates-unscaled
    :x1="100"
    :x2="1500"
    :y1="100"
    :y2="700"
    :width="1600"
    :height="800"
    :csvURL="'../../static/motorbikes_40_clean.csv'"
    :options="'Name'"
  />
</template>
