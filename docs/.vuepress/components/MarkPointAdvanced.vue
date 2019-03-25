<template>
  <div>

    <div>
      <button
        style="margin-top: 10px;"
        @click="getData()"
      >Generate new data</button>
    </div>
    <div style="display:flex">
      <vgg-graphic
        v-if="data"
        :width="300"
        :height="300"
        :data="data"
      >

        <vgg-plot-title
          text="Scatterplot"
          :vMargin="10"
        />

        <vgg-section
          :x1="40"
          :x2="280"
          :y1="40"
          :y2="280"
        >

          <vgg-map v-slot="{ row,i }">

            <vgg-point
              @hover="handleHover($event, row, i)"
              :transition="transition/1||1"
              :radius="radius/1||3"
              :fill="color"
              :x="{ val: row.x, scale: 'x' }"
              :y="{ val: row.y, scale: 'y' }"
            />

          </vgg-map>

          <vgg-y-axis
            :x1="0"
            :x2="80"
            :y1="40"
            :y2="280"
            :scale="'y'"
          />

          <vgg-x-axis
            :x1="40"
            :x2="280"
            :y="35"
            :h="10"
            :scale="'x'"
          />

        </vgg-section>

        <vgg-x-grid
          :x1="40"
          :x2="280"
          :y1="40"
          :y2="280"
          :scale="'x'"
        />

        <vgg-y-grid
          :x1="40"
          :x2="280"
          :y1="40"
          :y2="280"
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
    </div>
    <div>
      <div>Transition duration:<input v-model="transition" /></div>
      <div>Radius:<input v-model="radius" /></div>
      <div>Color:
      <select v-model="color">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </select>
    </div>
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
      radius: 3,
      hovered: undefined,
      layerX: 0,
      layerY: 0,
      color:'red'
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
    }
  }
};
</script>
