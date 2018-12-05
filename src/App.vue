<template>
  <div id="app">
    <CartesianPolar v-if="example === 'CartesianPolar'" />

    <NestedCoordSystems v-if="example === 'NestedCoordSystems'" />

    <div class="bottom">
      <button
        :disabled="example === 'CartesianPolar'"
        @click="example = 'CartesianPolar'">
        Cartesian/polar test
      </button>

      <button
        :disabled="example === 'NestedCoordSystems'"
        @click="example = 'NestedCoordSystems'">
        Nested coordinate systems
      </button>
    </div>

  </div>
</template>

<script>
import CartesianPolar from './examples/CartesianPolar.vue'
import NestedCoordSystems from './examples/NestedCoordSystems.vue'

export default {
  name: 'App',

  components: {
    CartesianPolar,
    NestedCoordSystems
  },

  data () {
    return {
      example: 'CartesianPolar'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.graphic {
  background-color: #e3e3e3;
}

.bottom {
  position: fixed;
  bottom: 10px;
}
</style>
