<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <vgg-scales :scales="{ 'sepal length scale': { domain: 'sepal length', domainMin: 0 } }" />
    <vgg-scales :scales="{ 'sepal width scale': { domain: 'sepal width',
                           domainMin: 0 } }" />
    <vgg-scales :scales="{ 'petal length scale': { domain: 'petal length', domainMin: 0 } }" />
    <vgg-scales :scales="{ 'petal width scale': { domain: 'petal width', domainMin: 0 } }" />
    <vgg-scales :scales="{ 'species scale': { domain: 'species' } }" />

    <vgg-section
      :x1="50"
      :x2="530"
      :y1="60"
      :y2="540"
    >

      <vgg-repeat
        v-slot="{ x, y }"
        :x="['sepal length', 'sepal width', 'species']"
        :y="['petal length', 'petal width', 'species']"
        :cell-padding="10"
        :sides="['right', 'bottom']"
      >

        <vgg-section
          :axes="{
            right: { scale: `#${y} scale`, flip: true, tickCount: 5, title: y, titleAngle: -90, titleHjust: 4.5 },
            bottom: { scale: `#${x} scale`, labelRotate: true, tickCount: 5, title: x, titleVjust: -3 }
          }"
        >

          <vgg-map v-slot="{ row }">

            <vgg-point
              @hover="handleHover($event, row)"
              :x="{ val: row[x], scale: `#${x} scale` }"
              :y="{ val: row[y], scale: `#${y} scale` }"
              :radius="3"
            />

            <vgg-point
              v-if="hoverRow"
              :x="{ val: hoverRow[x], scale: `#${x} scale` }"
              :y="{ val: hoverRow[y], scale: `#${y} scale` }"
              fill="red"
              :radius="3"
            />

          </vgg-map>

        </vgg-section>

      </vgg-repeat>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
import iris from './sampleData/iris.json'

export default {
  data () {
    return {
      hovered: undefined,
      hoverRow: undefined
    }
  },

  computed: {
    data () {
      let newData = []
      for (let ix = 0; ix < iris.length; ix++) {
        let instance = iris[ix]
        newData.push({ 'sepal length': instance['sepal_length'],
                       'sepal width': instance['sepal_width'],
                       'petal length': instance['petal_length'],
                       'petal width': instance['petal_width'],
                       species: instance['species'] })
      }
      return newData
    }
  },

  methods: {
    handleHover(e, r) {
      this.hovered = e ? { r } : undefined
      if (this.hovered) {
        this.hoverRow = r
      } else {
        this.hovered = undefined
        this.hoverRow = undefined
      }
    }
  }
}
</script>
