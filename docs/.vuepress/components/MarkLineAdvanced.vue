<template>
  <div class="container">

    <div>
      <vgg-graphic
        :width="250"
        :height="250"
      >

        <vgg-section
          :x1="25"
          :x2="225"
          :y1="25"
          :y2="225"
          :scale-x="[-1, 1]"
          :scale-y="[-1, 1]"
        >

          <vgg-line
            v-if="func&&func==='sin'"
            :func="x=>Math.sin(20*x)"
            :fill="fill"
            :stroke-width="strokeWidth"
          />
          <vgg-line
            v-if="func&&func==='cos'"
            :func="x=>Math.cos(20*x)"
            :fill="fill"
            :stroke-width="strokeWidth"
          />
          <vgg-line
            v-if="func&&func==='poly'"
            :func="x=>x**2"
            :fill="fill"
            :stroke-width="strokeWidth"
          />
          <vgg-x-axis
            :scale="[-1, 1]"
            :vjust="0.5"
            :tickCount="5"
          />
          <vgg-y-axis
            :scale="[-1, 1]"
            :hjust="0.5"
            :tickCount="5"
          />

        </vgg-section>
      </vgg-graphic>

      <p>Function:
        <select v-model="func">
          <option value="poly">x^2</option>
          <option value="sin">Math.sin(20*x)</option>
          <option value="cos">Math.cos(20*x)</option>
        </select>
      </p>
      <p>Stroke Width:
        <select v-model="strokeWidth">
          <option :value="2">2</option>
          <option :value="4">4</option>
          <option :value="6">5</option>
        </select>
      </p>
      <p>Fill:
        <select v-model="fill">
          <option :value="'none'">None</option>
          <option :value="'#c66366'">Red</option>
          <option :value="'#008080'">Green</option>
        </select>
      </p>
    </div>

    <div>
      <vgg-graphic
        :width="250"
        :height="250"
      >

        <vgg-section
          :x1="25"
          :x2="225"
          :y1="25"
          :y2="225"
          :scale-x="[-1, 1]"
          :scale-y="[-1, 1]"
        >

         <vgg-line
            :x1="coordinates.x1"
            :x2="coordinates.x2"
            :y1="coordinates.y1"
            :y2="coordinates.y2"
            stroke="#008080"
          />

          <vgg-x-axis
            :scale="[-1, 1]"
            :vjust="0.5"
            :tickCount="5"
          />
          <vgg-y-axis
            :scale="[-1, 1]"
            :hjust="0.5"
            :tickCount="5"
          />

        </vgg-section>
      </vgg-graphic>
      <p>(x1,y1) (x2,y2):
          <select v-model="coordinates">
            <option :value="set1">(1,-1) (-1.5,0.3)</option>
            <option :value="set2">(1,0.6) (-1,0.6)</option>
            <option :value="set3">(0.4,-1.7) (-0.1,1.2)</option>
          </select>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      coordinates:{
        x1:1,
        x2:-1.2,
        y1:-1,
        y2:0.3
      },
      set1:{
        x1:1,
        x2:-1.2,
        y1:-1,
        y2:0.3
      },
      set2:{
        x1:1,
        x2:-1,
        y1:0.6,
        y2:0.6,
      },
      set3:{
        x1:0.4,
        x2:-0.1,
        y1:-1.7,
        y2:1.2,
      },
      strokeWidth:2,
      fill: 'none',
      func: 'poly'
    };
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: space-around;
}

</style>