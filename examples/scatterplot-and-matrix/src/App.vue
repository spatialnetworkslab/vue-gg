<template>
  <div style="display: flex">

    <div style="width:150px; display: flex; flex-direction: column; justify-content: center">
      <button style="margin-top: 10px;" @click="getData()">Generate new data</button>
      <button style="margin-top: 10px;" @click="changeDisplay('Scatterplot')">Show Scatterplot</button>
      <button style="margin-top: 10px;" @click="changeDisplay('Matrix')">Show Scatterplot Matrix</button>
    </div>

    <vgg-graphic
      v-if="data && (display === 'Scatterplot')"
      :width="800"
      :height="800"
      :data="data">

      <vgg-plot-title text="Scatterplot" :vMargin="150" />

      <vgg-section
        :x1="200"
        :x2="600"
        :y1="200"
        :y2="600"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="{ val: row.x, scale: 'x' }"
            :y="{ val: row.y, scale: 'y' }"
          />

        </vgg-map>

        <vgg-y-axis
          :x1="600"
          :x2="650"
          :y1="200"
          :y2="600"
          :scale="'y'"
        />

        <vgg-x-axis
          :x1="200"
          :x2="600"
          :y="175"
          :h="50"
          :scale="'x'"
        />

      </vgg-section>

      <vgg-x-grid
        :x1="200"
        :x2="600"
        :y1="200"
        :y2="600"
        :scale="'x'"
      />

      <vgg-y-grid
        :x1="200"
        :x2="600"
        :y1="200"
        :y2="600"
        :scale="'y'"
      />

    </vgg-graphic>

    <vgg-graphic
      v-if="data && (display === 'Matrix')"
      :width="800"
      :height="800"
      :data="data"
    >

      <vgg-plot-title text="Scatterplot Matrix" :vMargin="25" />

      <vgg-section
        :x1="50"
        :x2="750"
        :y1="50"
        :y2="750"
      >

        <vgg-repeat
          v-slot="{ x, y }"
          :x="['x', 'y', 'z', 'a', 'b']"
          :y="['x', 'y', 'z', 'a', 'b']"
          :cell-padding="10"
          :sides="['right', 'bottom']"
        >

          <vgg-section
            :axes="{
              right: { scale: y, flip: true, 'label-font-size': 10 },
              bottom: { scale: x, labelRotate: true, 'label-font-size': 8 }
            }"
            :grid-lines="{
              x: { scale: x },
              y: { scale: y }
            }"
          >

            <vgg-map v-slot="{ row }">

              <vgg-point
                :x="{ val: row[x], scale: x }"
                :y="{ val: row[y], scale: y }"
                :fill="{ val: row[x], scale: x }"
              />

            </vgg-map>

          </vgg-section>

        </vgg-repeat>

      </vgg-section>

    </vgg-graphic>

  </div>

 
</template>

<script>
export default {
  name: 'Scatterplot',

  data () {
    return {
      data: undefined,
      display: 'Matrix'
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    getData () {
      let points = []
      for (let i = 0; i < 50; ++i) {
        let x = Math.random() * 1000 + 500
        let y = Math.random() * 1000
        let z = Math.random() * 10
        let a = Math.random() * 500
        let b = Math.random() * 500 + 250

        points.push({ x, y, z, a, b })
      }

      this.data = points
    },

    changeDisplay (n) {
      this.display = n
    }
  }
}
</script>
