<template>
  <g>
    <slot />
  </g>
</template>

<script>
import DataProvider from '../../mixins/Data/DataProvider.js'

export default {
  mixins: [DataProvider]
}
</script>
