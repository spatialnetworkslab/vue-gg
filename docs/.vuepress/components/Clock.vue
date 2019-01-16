<template>

  <vgg-graphic
    :width="500"
    :height="500"
  >

    <!-- Hours -->
    <vgg-section
      :type="'polar'"
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :scales="{
        x: [0, 12],
        y: [0, 1]
      }"
    >

      <!-- Ticks -->
      <vgg-line
        v-for="i in range(12)"
        :key="'h' + i"
        :x1="i"
        :x2="i"
        :y1="0.7"
        :y2="0.9"
      />

      <vgg-label
        v-for="i in range(12)"
        :key="'l' + i"
        :x="i"
        :y="0.95"
        :text="i.toString()"
      />

      <!-- Hand -->
      <vgg-line
        :x1="hours"
        :x2="hours"
        :y1="0"
        :y2="0.5"
        :stroke-width="7"
        stroke="red"
      />

    </vgg-section>

    <!-- Minutes -->
    <vgg-section
      :type="'polar'"
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :scales="{
        x: [0, 60],
        y: [0, 1]
      }"
    >

      <!-- Ticks -->
      <vgg-line
        v-for="i in range(60)"
        :key="'m' + i"
        :x1="i"
        :x2="i"
        :y1="0.85"
        :y2="0.9"
      />

      <!-- Hand -->
      <vgg-line
        :x1="minutes"
        :x2="minutes"
        :y1="0"
        :y2="0.75"
        :stroke-width="4"
        stroke="blue"
      />

    </vgg-section>

    <!-- Seconds -->
    <vgg-section
      :type="'polar'"
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :scales="{
        x: [0, 60],
        y: [0, 1]
      }"
    >

      <!-- Hand -->
      <vgg-line
        :x1="seconds"
        :x2="seconds"
        :y1="0"
        :y2="0.85"
        :stroke-width="2"
        stroke="green"
      />

    </vgg-section>

  </vgg-graphic>

</template>

<script>
export default {
  data () {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },

  mounted () {
    this.updateSeconds()
  },

  methods: {
    range (n) {
      return new Array(n).fill(0).map((v, i) => i)
    },

    updateSeconds () {
      let date = new Date()

      this.hours  = date.getHours()
      this.minutes = date.getMinutes()
      this.seconds = date.getSeconds()

      setTimeout(this.updateSeconds, 1000)
    }
  }
}
</script>
