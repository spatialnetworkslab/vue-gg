<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="balance">

    <vgg-map v-slot="{ row }">

      <vgg-label
        :x="150"
        :y="{ val: row.name, scale: 'name' }"
        :text="{ val: row.name }"
      />

      <vgg-point
        :x="450"
        :y="{ val: row.name, scale: 'name' }"
        :radius="{ val: row.balance, scale: {
          domain: 'balance',
          absolute: true,
          domainMin: 0
        } }"
        :fill="{ val: row.balance, scale: { domain: 'balance', type: 'redBlue' } }"
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
