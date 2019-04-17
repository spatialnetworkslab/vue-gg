<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <vgg-scales v-if="scaleSpecial" :scales="{ 'sepal length scale': { domain: 'sepal length', domainMin: 0 } }" />
    <vgg-scales v-if="scaleSpecial" :scales="{ 'sepal width scale': { domain: 'sepal width',
                           domainMin: 0 } }" />
    <vgg-scales v-if="scaleSpecial" :scales="{ 'petal length scale': { domain: 'petal length', domainMin: 0 } }" />
    <vgg-scales v-if="scaleSpecial" :scales="{ 'petal width scale': { domain: 'petal width', domainMin: 0 } }" />
    <vgg-scales :scales="{ 'species scale': { domain: 'species' } }" />

    <vgg-scales v-if="!scaleSpecial" :scales="{ 'sepal length scale': { domain: 'sepal length' } }" />
    <vgg-scales v-if="!scaleSpecial" :scales="{ 'sepal width scale': { domain: 'sepal width',
                           domainMin: 0 } }" />
    <vgg-scales v-if="!scaleSpecial" :scales="{ 'petal length scale': { domain: 'petal length' } }" />
    <vgg-scales v-if="!scaleSpecial" :scales="{ 'petal width scale': { domain: 'petal width' } }" />

    <vgg-section
      :x1="50"
      :x2="530"
      :y1="60"
      :y2="540"
    >

      <vgg-repeat
        v-slot="{ x, y }"
        v-if="!showCombi" 
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
              :x="{ val: row[x], scale: `#${x} scale` }"
              :y="{ val: row[y], scale: `#${y} scale` }"
              :radius="3"
            />

          </vgg-map>

        </vgg-section>

      </vgg-repeat>

      <vgg-repeat
        v-slot="{ x, y }"
        v-if="showCombi" 
        :x="['sepal length', 'sepal width', 'species']"
        :y="['petal length', 'petal width', 'species']"
        :cell-padding="10"
        :sides="['right', 'bottom']"
      >

        <vgg-section v-if="showCombi" :scale-x="[0, 1]" :scale-y="[0, 1]">

          <vgg-plot-title :text="`${x}`" :vjust="0.1" :hjust="0.5" />
          <vgg-plot-title :text="`${y}`" :hjust="0.9" :vjust="0.5" :rotation="-90" />

          <vgg-rectangle
            :x1="0"
            :y1="0"
            :x2="1"
            :y2="1"
            fill="none"
            stroke="grey"
            :stroke-width="0.5"
          />

        </vgg-section>

      </vgg-repeat>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
import iris from './sampleData/iris.json'

export default {
  props: {
    showCombi: {
      type: Boolean,
      default: true
    },

    scaleSpecial: {
      type: Boolean,
      default: false
    },
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
  }
}
</script>
