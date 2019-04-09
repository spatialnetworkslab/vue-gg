<template>
  <!-- If changing the size of the chart, change total chart size here first -->
  <vgg-graphic
    v-if="myData"
    :width="1000"
    :height="1000"
    :data="myData"
  >

    <!-- If changing the size of the chart, remember to change x1, x2, y1 and y2 values as well -->
    <vgg-section
      :x1="50"
      :x2="950"
      :y1="50"
      :y2="950"
      :transform="{ rename: extractVariables }"
    >

      <vgg-repeat
        v-slot="{ x, y, sides }"
        :x="newVariables"
        :y="newVariables"
        :cell-padding="1"
        :sides="['bottom', 'right']"
      >

        <vgg-section
          :axes="{
            bottom: { scale: x,
                      labelRotate: true,
                      tickCount: 5, },
            right: { scale: y,
                     flip: true,
                     tickCount: 5, },
          }"
        >

          <vgg-map
            v-slot="{ row, i }"
            v-if="x !== y">

            <vgg-point
              :x="{ val: row[x], scale: x }"
              :y="{ val: row[y], scale: y }"
              :fill="{ val: row[color] }"
              @hover="handleHover($event, row, i)"
            />

            <vgg-point
              v-if="hoverRow"
              :x="{ val: hoverRow[x], scale: x }"
              :y="{ val: hoverRow[y], scale: y }"
              :radius="5"
              fill="black"
            />

          </vgg-map>

          <vgg-plot-title
            v-if="x === y"
            :text="x"
            :vjust="0.5" />

          <vgg-x-grid
            v-if="x !== y"
            :scale="x"
            :grid-line-count="5" />
          <vgg-y-grid
            v-if="x !== y"
            :scale="y"
            :grid-line-count="5" />

        </vgg-section>

      </vgg-repeat>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
import { csv } from 'd3-fetch'
export default {
  props: {
    // Use either data or csvURL
    // For data, format as [ { variable1: , variable2: }, { variable1: , variable2: } ]
    // Where each Object in the Array represents a row
    data: {
      type: Array,
      default: undefined
    },
    // Pass the string to the .csv file
    // e.g. '../../../static/idcDrinksDemoClean.csv'
    // More likely than not, the .csv dataset should be in the static folder
    csvURL: {
      type: String,
      default: '../../static/idcDrinksDemoClean.csv'
    },
    // Pass in an object of variables to extract from the dataset
    // The variables should be defined as such:
    // { 'original variable name 1':'NEW NAME 1', 'original variable name 2':'NEW NAME 2' }
    // The new names will be used to vary the x and y columns of the matrix
    extractVariables: {
      type: Object,
      default: undefined
    },
    // The name of the column in the dataset that encodes the color of the points
    // Since we have been using the col 'Color2', this is the current default
    // This can be changed if we ever define a new color column in the datasets
    color: {
      type: String,
      default: 'Color2'
    }
  },
  // hovered keeps track of whether a point is being hovered over (i.e. true or false)
  // hoverRow keeps track of the details of the point being hovered over (e.g. x, y values)
  // Currently, corresponding points are highlighted across scatterplots on hover
  // hoverRow data can be used to render other info (e.g. adding <text> stating the x, y values etc.)
  // It is also possible to track other relevant values such as index, although this is not currently defined
  // but provisions have been made to do so in hoverHandler
  data () {
    return {
      myData: undefined,
      hovered: undefined,
      hoverRow: undefined
    }
  },
  computed: {
    newVariables () {
      let renamedVars = []
      for (let i of Object.keys(this.extractVariables)) {
        renamedVars.push(this.extractVariables[i])
      }
      return renamedVars
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.data) {
        this.myData = this.data
      } if (!this.csvURL) {
        throw new Error('Please provide either data or csvURL')
      } else {
        this.processCSV(this.csvURL)
      }
    },
    processCSV (url) {
      csv(url).then((data) => {
        let allVariables = Object.keys(data[0])
        let categories = {}
        for (let i of allVariables) {
          categories[i] = []
        }
        for (let i in data) {
          let row = data[i]
          if (row.constructor === Array) {
            continue
          }
          for (let j of allVariables) {
            let value = parseFloat(row[j])
            if (isNaN(value)) {
              categories[j].push(row[j])
            } else {
              categories[j].push(value)
            }
          }
        }
        this.myData = categories
      })
    },
    // Customize as needed
    handleHover (e, r, i) {
      this.hovered = e ? { r, i } : undefined
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
