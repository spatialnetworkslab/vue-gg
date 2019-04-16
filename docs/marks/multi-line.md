---
title: Multi-line mark
---
# Multi-line mark

The `vgg-multi-line` mark is used to plot line elements that consist of multiple line segments. This is in contrast to the Line Mark, which consists of only a single line segment.

<CodeDemoLayout>

<MarkMultiLineSimple />

<CodeLayout>

```html
<vgg-map 
  v-slot="{ dataframe }"
  unit="dataframe">

  <vgg-multi-line
    :x="dataframe.year"
    :y="dataframe.population"
    stroke="#c66366"
  />

</vgg-map>
```

</CodeLayout>

</CodeDemoLayout>

## Properties
A `vgg-multi-line` can contain the following position properties.

### Positioning

| Prop     | Required | Types  | Default   | Description                                           | Unit(s)           |
| -------- | -------- | -----  | --------- | ----------------------------------------------------- | ----------------- |
| x        | depends  | Array  | undefined | x-coordinates of multi-line path                            | Local coordinates |
| y        | depends  | Array  | undefined | y-coordinates of multi-line path                            | Local coordinates |
| geometry | depends  | Object | undefined | GeoJSON object of type LineString or MultiLineString  | Local coordinates |

### Other aesthetics

| Prop           | Required | Types  | Default   | Description    | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| stroke         | false    | String | undefined | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | undefined | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | undefined | Stroke opacity | Number between 0 to 1      |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | undefined | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | undefined | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other props

| Prop        | Required | Types   | Default | Description                                                              |
| ----------- | -------- | ------- | ------- | ------------------------------------------------------------------------ |
| interpolate | false    | Boolean | false   | Interpolate between points (when using non-cartesian coordinate systems) |
| sort        | false    | String  | 'x'     | Sort points in ascending order in x or y dimension                       |
| close        | false    | Boolean  | false     | Whether line should be closed, i.e. return to its origin                       |

## Events

| Event     | Description                                   |
| --------- | --------------------------------------------- |
| click     | Triggered when user clicks on mark            |
| hover     | Triggered when user hovers over mark          |
| mouseover | Triggered when user's mouse is above mark     |
| mouseout  | Triggered when user's mouse leaves mark       |
| select    | Triggered when mark is selected               |
| deselect  | Triggered when mark is removed from selection |

For more information on these events, see the [Interactivity](../concepts/interactivity.md)
documentation.

## Usage

### Positioning

To render a Multi-line mark, you will need to set the `x` and `y` or the `geometry` props. The two uses are mutually exclusive. `x` and `y` have to be passed an Array of values/coordinates of the same length, with one exception: when the shorter of the two arrays has length 1, its value will be repeated to match the length of the other array. For example

::: v-pre
```html
<vgg-multi-line
  :x="[1, 2, 3, 4]"
  :y="[100]"
/>
```
:::

will be treated as

::: v-pre
```html
<vgg-multi-line
  :x="[1, 2, 3, 4]"
  :y="[100, 100, 100, 100]"
/>
```
:::

`geometry` accepts GeoJSON LineString and MultiLineString objects only. To render other geometry types, see documentation on the [Point](point.md) and [Polygon](polygon.md) marks.

It is also possible to use an entire column within the data scope as coordinates using `vgg-map` with `unit="dataframe"` (see [Map](../core/map.md) documentation). The rule of equal lengths still holds: if `x` is passed a dataframe column, and `y` is passed an array, the array has to be of the same length as the data column (except, again, if `y` is of length 1).

### Other props

The `interpolate` option is switched off by default for Multi-line marks. Only
turn it on when strictly necessary, otherwise it will slow down performance.
`sort` is by default `'x'`, because most users will use the `x` dimension for
variables that must be sorted ascendingly, like points in time, while using the
`y` dimension for values that do not need sorting, like measurements at points
in time. If you want to plot time in the `y` dimension instead, make sure to
set `sort` to `'y'`.

## Example

<CodeDemoLayout>

<MarkMultiLineStacked />

<CodeLayout style="margin-top: 25px;">

```html
<vgg-graphic
  :width="200"
  :height="250"
  :data="{ 
    year: [
      2000, 2005, 2010, 2015,
      2000, 2005, 2010, 2015
    ],
    population: [
      100, 110, 130, 180,
      200, 310, 430, 480
    ],
    color: [
      '#c66366', '#c66366', '#c66366',
      '#c66366', '#008080', '#008080',
      '#008080', '#008080'
    ]
  }">

  <vgg-section
    :x1="25"
    :x2="175"
    :y1="25"
    :y2="225"
    scale-x="year"
    scale-y="population"
    :axes="{
      left: {'tick-count': 4, 'w': 30},
      bottom: {'tick-count': 4}
    }"
  >
    <vgg-data :transform="{ groupBy: 'color' }">
    
      <vgg-map v-slot="{ row }">

        <vgg-multi-line
          :x="row.grouped.year"
          :y="row.grouped.population"
          :stroke="row.color"
        />

      </vgg-map>

    </vgg-data>

  </vgg-section>

</vgg-graphic>
```

</CodeLayout>

</CodeDemoLayout>
