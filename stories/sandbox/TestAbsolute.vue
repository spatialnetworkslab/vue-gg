<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="balance">

    <vgg-map>

      <vgg-label
        :x="150"
        :y="{ scale: 'name' }"
        :text="row => row.name"
      />

      <vgg-point
        :x="450"
        :y="{ scale: 'name' }"
        :radius="{ scale: { variable: 'balance', absolute: true } }"
        :fill="{ scale: { variable: 'balance', scale: 'redBlue' } }"
      />

    </vgg-map>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      balance: [
        { name: 'Jim', balance: -1000 },
        { name: 'Jerry', balance: 750 },
        { name: 'Jamal', balance: 1000 },
        { name: 'Jolisa', balance: -400 }
      ]
    }
  }
}
</script>
