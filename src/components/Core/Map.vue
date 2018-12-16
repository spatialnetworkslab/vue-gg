<template>
  <g><slot /></g>
</template>

<script>
export default {
  provide () {
    return { $$map: true }
  }
}
</script>
