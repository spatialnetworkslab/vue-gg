<template>
  <div>
    <div class="field-selector">
    <label>Select document types</label>
    <multiselect v-model="selectedType"
    :options="uniqueType"
    placeholder="Choose a type"
    />
    </div>

     <div class = "hoverText" v-if="hoverInfo" style="fixed:right;">
        <h4> {{hoverInfo.title}} </h4>
        <h5> {{hoverInfo.author}} </h5>
        <h4> Citation number  :  {{hoverInfo.citation_num}}</h4>
        <h5> Publication Source  :  {{ hoverInfo.source}} </h5>
        <h5> Year of publication  :  {{hoverInfo.year}} </h5>
        <h5> Document type  :  {{hoverInfo.doc_type}} </h5>
        <h5> Check test  :  {{hoverInfo.manual_cat}} </h5>

        </div>

    <vgg-graphic :width="900" :height="620" :data="asdData">

      <vgg-data
      :transform="{ filter: row => {
      if (selectedType === null) return true // if no types selected, include all data
      else {
        return row.doc_type === selectedType
      }
      }
      }"
      >

    <!-- Fig. 1 Source vs year by category -->
      <vgg-section
      :x1="300"
      :x2="750"
      :y1="100"
      :y2="580"
      :transform="[
        { groupBy: ['manual_cat', 'year', 'source', 'doc_type', 'title', 'author', 'citation_num']},

        ]"
        >

      <vgg-plot-title
      text="Research categories in document source over time"
      :hjust="0.5"
      :vjust="1.10"
      color="#263238"
      :fontSize="12"
      fontFamily="Arial Black"
      />

      <vgg-x-grid
      :scale="'year'" opacity="0.3"/>
      <vgg-y-grid
      :scale="'source'" opacity="0.3"/>
      <vgg-scales :scales="{ categoryScale: { domain: 'manual_cat',  order: ['daylighting', 'wind', 'microclimate', 'thermal', 'energy']} }"/>
      <vgg-scales :scales="{ fillScale: { range:[ '#FC9841', '#FBC644', '#E5536B', '#648174', '#4B91F0'], domain: 'manual_cat'}}"/>
      <vgg-scales :scales="{ sourceScale: { domain: 'source'}}"/>
      <vgg-scales :scales="{ yearScale: { domain: 'year'}}" />
      <vgg-scales :scales="{ citScale: { domain: 'citation_num' }}" />



      <vgg-map v-slot=" { row , i }">
      <vgg-point
        :x="{ val: row.year, scale: '#yearScale' }"
        :y="{ val: row.source, scale: '#sourceScale' }"
        :radius="{ val: row.citation_num, scale: { range: [3,9], domain:'citation_num'}}"
        :fill="{ val: row.manual_cat, scale: '#fillScale'}"
        :fill-opacity="0.8"
        :stroke="hoverI === i ? 'black' : 'none'"
        @hover="handleHover( $event, row, i)"

      />

       </vgg-map>


      <vgg-x-axis
      :scale="'#yearScale'"
      :hjust="0"
      :tick-count="22"
      label-font="Arial Narrow"
      :label-font-size="8"
      title="Publication Year"
      :title-vjust="-0.2"
      :title-hjust="0.9"
      title-color="grey"
      title-font="Arial"
      :title-font-size="12"
      :title-font-weight="700"
      rotate-label
       />

      <vgg-y-axis
      :scale="'#sourceScale'"
      :hjust="0"
      :tick-extra="false"
      label-font="Arial Narrow"
      :label-font-size="6"
      title="Document Source"
      :title-hjust="-0.3"
      :title-vjust="1.05"
      title-color="grey"
      title-font="Arial"
      :title-font-size="12"
      />

      <vgg-symbol-legend
      :rows="5"
      :scale="{ domain: 'manual_cat', order: ['daylighting', 'wind', 'microclimate', 'thermal', 'energy']}"
      stroke="none"
      :fill="['#FC9841', '#FBC644', '#E5536B', '#648174', '#4B91F0']"
      :fill-opacity="0.6"
      title="Research Category"
      :title-font-size="14"
      title-font="Arial"
      title-anchor-point="right"
      orientation="vertical"
      :symbol-padding="0.001"
      :row-padding="0.1"
      :title-padding="4"
      :x1="5"
      :x2="100"
      :y1="100"
      :y2="230"
      :label-font-size="12"
      label-font="Arial"
      :size="12"
       />

      </vgg-section>
      </vgg-data>



    </vgg-graphic>
  </div>
</template>

<script>
import asdData from './dataset_3.json'
import multiselect from 'vue-multiselect'


export default {
  name: 'app',
  components: {multiselect},
  data () {
    return {
      docType: [],
      asdData: asdData,
      selectedType: null,
      hoverI: null,
      hoverInfo:null

    }
  },
  computed: {
    uniqueType () {
      let docType = asdData.map(row => row.doc_type)
      return [...new Set(docType)].sort()
    }
  },
   methods: {
    handleClick () {
      if (this.selectedType === row.doc_type) { this.selectedType = null } else {
        this.selectedType = row.doc_type
      }
    },

    handleHover (e, row, i) {
      if (e) {
        this.hoverI = i
        this.hoverInfo = row
      } else {
        this.hoverI = null
        this.hoverInfo = null
}
}
   }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.field-selector {
  width:200px;
  height:200px;
  font-family:Arial Narrow;
  font-size:14px;
  color: rgb(60, 60, 60);
  position:absolute;
  padding-left:10px;
  padding-top:50px;
  }

.hoverText {
    position: absolute;
    font-family: Arial Narrow;
    font-size:13px;
    color: rgb(60, 60, 60);
    bottom:180px;
    right: 150px;
    width: 300px;
    height:100px;
    text-align: left;
  }



</style>
