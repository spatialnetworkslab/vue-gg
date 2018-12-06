<template>
  <div id="app">
    <Glyphs v-if="example === 'Glyphs'" />

    <NestedCoordSystems v-if="example === 'NestedCoordSystems'" />

    <PlotLines v-if="example === 'PlotLines'" />

    <div class="bottom">
      <button
        :disabled="example === 'Glyphs'"
        @click="example = 'Glyphs'">
        Glyphs
      </button>

      <button
        :disabled="example === 'NestedCoordSystems'"
        @click="example = 'NestedCoordSystems'">
        Nested coordinate systems
      </button>

      <button
        :disabled="example === 'PlotLines'"
        @click="example = 'PlotLines'">
        Plot lines
      </button>
    </div>

  </div>
</template>

<script>
import Glyphs from './examples/Glyphs.vue'
import NestedCoordSystems from './examples/NestedCoordSystems.vue'
import PlotLines from './examples/PlotLines.vue'

export default {
  name: 'App',

  components: {
    Glyphs,
    NestedCoordSystems,
    PlotLines
  },

  data () {
    return {
      example: 'Glyphs'
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
