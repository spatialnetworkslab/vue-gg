<template>

  <vgg-graphic
    :width="600"
    :height="600"
    :data="bars">

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :domains="{
        x: [0, 100],
        y: [0, 100]
      }"
    >

      <vgg-map>

        <vgg-rectangle
          :x="{ scale: 'fruit' }"
          :w="{ position: { positioner: 'bulge', padding: 0.2 } }"
          :y1="0"
          :y2="{ scale: 'quantity', domain: [0, null] }"
        />

        <vgg-line
          :x1="{ scale: 'fruit' }"
          :x2="{ scale: 'fruit' }"
          :y1="0"
          :y2="{ scale: 'quantity', domain: [0, null] }"
          color="#ced02d"
        />

        <vgg-section
          :x="{ scale: 'fruit' }"
          :w="{ position: { positioner: 'bulge', padding: 0.2 } }"
          :y1="0"
          :y2="{ scale: 'quantity', domain: [0, null] }"
          :domains="{
            x: [-1, 1],
            y: [-1, 1]
          }"
        >

          <vgg-point
            :x="0"
            :y="0"
            :radius="10"
            color="#8b0000"
          />

        </vgg-section>

      </vgg-map>

    </vgg-section>

    <vgg-x-axis
      :x1="100"
      :x2="500"
      :y1="50"
      :y2="100"
      :domain="'fruit'"
      rotate-label
    />

    <vgg-y-axis
      :x1="500"
      :x2="550"
      :y1="100"
      :y2="500"
      :domain="'quantity'"
    />

  </vgg-graphic>
</template>

<script>
import { bars } from './dummyData.js'

export default {
  name: 'Bars',

  data () {
    return {
      bars: bars('fruit', 'quantity')
    }
  }
}
</script>
