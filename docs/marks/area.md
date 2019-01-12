---
title: Area Mark
---

# Area Mark

The standard area mark takes the following props:

Prop | Required | Type                                         | Default   | Mappable | Description
-----|----------|----------------------------------------------|-----------|----------|------------------------------------
x    | true     | [Array, Object, String, Function, undefined] | undefined | true     | x-coordinate of line points
y    | true     | [Array, Object, String, Function, undefined] | undefined | true     | y-coordinate of line points
x2    | false     | [Array, Object, String, Function, undefined] | undefined | true     | x2-coordinate (secondary) of line points
y2    | true     | [Array, Object, String, Function, undefined] | undefined | true     | y2-coordinate (secondary) of line points
stroke    | false     | [String, Object, Function, undefined] | undefined | true     | stroke color
stroke-width    | false     | [Number, Object, Function, undefined] | undefined | true     | stroke width
stroke-opacity    | false     | [Number, Object, Function, undefined] | undefined | true     | stroke opacity
fill    | false     | [String, Object, Function, undefined] | undefined | true     | fill color
fill-opacity    | false     | [Number, Object, Function, undefined] | undefined | true     | fill opacity
opacity    | false     | [Number, Object, Function, undefined] | undefined | true     | mark opacity
sort-x    | false     | Boolean | true | false     | sort by coordinates by their x value
close    | false     | Boolean | true | false     | make a closed polygon if last point != first point
interpolate    | false     | Boolean | false | false     | interpolate between line points (for transformation between coord systems)


::: v-pre
```html{17-23}
<vgg-graphic
    :width="600"
    :height="600"
    :data="dummyData">
    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scales="{
        x: 'xValues',
        y: 'yValues'
      }"
    >
      <vgg-transform :trans="{ groupBy: 'colors' }">
        <vgg-map>
          <vgg-area
            :x="row => row.grouped.xValues"
            :y="row => row.grouped.yValues"
            :y2="(row, i, prevRow) => prevRow ? prevRow.grouped.yValues : [0]"
            :fill="row => row.colors"
            :opacity="0.5"
          />
        </vgg-map>
      </vgg-transform>
    </vgg-section>
  </vgg-graphic>
```
:::