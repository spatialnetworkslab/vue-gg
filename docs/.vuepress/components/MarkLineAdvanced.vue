<template>
  <div>
    <vgg-graphic
      :width="300"
      :height="300"
    >

      <vgg-section
        :x1="25"
        :x2="275"
        :y1="25"
        :y2="275"
        :scale-x="[-1, 1]"
        :scale-y="[-1, 1]"
      >

        <vgg-line
          v-if="func==='sin'"
          :func="x=>Math.sin(20*x)"
          :fill="fill"
          :stroke-width="strokeWidth"
        />
        <vgg-line
          v-if="func==='cos'"
          :func="x=>Math.cos(20*x)"
          :fill="fill"
          :stroke-width="strokeWidth"
        />
        <vgg-line
          v-if="func==='poly'"
          :func="x=>x**2"
          :fill="fill"
          :stroke-width="strokeWidth"
        />

        <vgg-x-axis
          :scale="[-1, 1]"
          :vjust="0.5"
        />
        <vgg-y-axis
          :scale="[-1, 1]"
          :hjust="0.5"
        />

      </vgg-section>
    </vgg-graphic>
    <div style="display:flex;flex-direction:column">
      <p>Function
      <select
        style="width:100px"
        v-model="func"
      >
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
          <option :value="'red'">Red</option>
          <option :value="'green'">Green</option>
          <option :value="'white'">White</option>
        </select>
      </p>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      strokeWidth:2,
      fill: "none",
      func: "poly"
    };
  },
};
</script>

