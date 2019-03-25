<template>

  <vgg-graphic
    :width="300"
    :height="250"
    >

    <vgg-section
      :x1="25"
      :x2="275"
      :y1="25"
      :y2="225"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      
      <vgg-polygon
        :points="points"
        fill="008080"
        stroke="none"
      />

      <vgg-x-axis
        :scale="[0, 100]"
        :tickCount="4"
      />

      <vgg-y-axis
        :scale="[0, 100]"
        :hjust="0"
        :tickCount="4"
      />

    </vgg-section>

  </vgg-graphic>

</template>

<script>
export default {
  data () {
    return {
      points: [[25, 25], [50, 75], [75, 25]]
    }
  }
}
</script>
