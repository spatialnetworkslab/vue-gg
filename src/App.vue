<template>
  <div id="app">
    <glyphs v-if="example === 'Glyphs'" />

    <nested-coord-systems v-if="example === 'NestedCoordSystems'" />

    <plot-lines v-if="example === 'PlotLines'" />

    <scatterplot v-if="example === 'Scatterplot'" />

    <bars v-if="example === 'Bars'" />

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

      <button
        :disabled="example === 'Scatterplot'"
        @click="example = 'Scatterplot'">
        Scatterplot
      </button>

      <button
        :disabled="example === 'Bars'"
        @click="example = 'Bars'">
        Bars
      </button>
    </div>

  </div>
</template>

<script>
import Glyphs from './examples/Glyphs.vue'
import NestedCoordSystems from './examples/NestedCoordSystems.vue'
import PlotLines from './examples/PlotLines.vue'
import Scatterplot from './examples/Scatterplot.vue'
import Bars from './examples/Bars.vue'

export default {
  name: 'App',

  components: {
    Glyphs,
    NestedCoordSystems,
    PlotLines,
    Scatterplot,
    Bars
  },

  data () {
    return {
      example: 'Scatterplot'
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
