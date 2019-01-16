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
        :x1="now.hour"
        :x2="now.hour"
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
        :x1="now.minute"
        :x2="now.minute"
        :y1="0"
        :y2="0.75"
        :stroke-width="4"
        stroke="blue"
      />

    </vgg-section>

  </vgg-graphic>

</template>

<script>
export default {
  computed: {
    now () {
      let time = new Date()
      let minute = time.getMinutes()
      let hour = time.getHours()

      return { minute, hour }
    }
  },

  methods: {
    range (n) {
      return new Array(n).fill(0).map((v, i) => i)
    }
  }
}
</script>
