<template>
  <div>

    <vgg-graphic
      v-if="data"
      :width="600"
      :height="500"
      :data="data"
    >

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="450"
      >

        <vgg-y-axis :scale="'y'" :hjust="-.05" />

        <vgg-x-axis :scale="'x'" :vjust="-.05" />

        <vgg-map v-slot="{ row, i }">

          <vgg-point
            @hover="handleHover($event, row, i)"
            :transition="transition/1||1"
            :radius="radius/1||3"
            :fill="{ val: row.x, scale: { type: 'viridis', domain: 'x' } }"
            :x="{ val: row.x, scale: 'x' }"
            :y="{ val: row.y, scale: 'y' }"
          />

        </vgg-map>

      </vgg-section>

      <vgg-x-grid
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="450"
        :scale="'x'"
      />

      <vgg-y-grid
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="450"
        :scale="'y'"
      />

    </vgg-graphic>

    <div
      v-if="hovered"
      style="position:absolute;background-color:black;opacity:0.8;padding:5px;margin-left:10px;margin-top:10px;"
      :style="{top:layerY+'px',left:layerX+'px'}"
    >
      <p style="color:white;margin:0;padding:0">x: {{hovered.r.x}}</p>
      <p style="color:white;margin:0;padding:0">y: {{hovered.r.y}}</p>
    </div>

    <div>
      <button
        style="margin-top: 10px;"
        @click="getData()"
      >Generate new data</button>

      <p>Transition duration:
        <span>
          <button class="wrapper" v-on:click="decrease">-</button>
          {{ transition + 's' }}
          <button class="wrapper" v-on:click="increase">+</button>
        </span>
      </p>

      <p>Radius:
        <span>
          <button class="wrapper" v-on:click="decreaseRad">-</button>
          {{ radius + 'px' }}
          <button class="wrapper" v-on:click="increaseRad">+</button>
        </span>
      </p>

    </div>
  </div>

</template>


<script>
export default {
  name: "Scatterplot",

  data() {
    return {
      data: undefined,
      transition: 1,
      radius: 5,
      hovered: undefined,
      layerX: 0,
      layerY: 0,
      color:'#c66366'
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      let points = [];
      for (let i = 0; i < 50; ++i) {
        let x =  Number.parseInt(Math.random() * 1000 + 500);
        let y = Number.parseInt(Math.random() * 1000);

        points.push({ x, y });
      }

      this.data = points;
    },

    handleHover(e, r, i) {
      this.hovered = e ? { r, i } : undefined ;
      if (this.hovered) {
        const { layerX, layerY } = e;
        this.layerX = layerX;
        this.layerY = layerY;
      }
    },

    increase () {
      if (this.transition < 10) {
        this.transition++
      }
    },

    decrease () {
      if (this.transition > 0) {
        this.transition--
      }
    },

    increaseRad () {
      if (this.radius < 10) {
        this.radius++
      }
    },

    decreaseRad () {
      if (this.radius > 2) {
        this.radius--
      }
    }
  }
};
</script>

<style scoped>

input {
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #d3d3d3;
  margin-left: 10px;
}

.wrapper {
  border-radius: 3px;
  border: solid;
  border-width: 1px;
  border-color: #e6e6e6;
  margin-left: 5px;
  margin-right: 5px;
}

</style>
