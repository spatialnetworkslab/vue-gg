---
title: Area mark
---
# Area mark

The `vgg-area` mark is used to plot filled areas. This is useful to visualize change over time. It can either be used by itself or in a 'stacked' configuration. 

<div style="display: flex;
	justify-content: space-around;
	align-items: center"
>

<div>

<MarkAreaSimple />

</div>

<div style='width: 40%; height: 100%;'>

```html
<vgg-map 
  v-slot="{ dataframe }"
  unit="dataframe">

  <vgg-area
    :x="dataframe.year"
    :y="dataframe.population"
    :y2="[0]"
    fill="#c66366"
  />

</vgg-map>
```

</div>

</div>

## Properties
A `vgg-area` can contain the following position properties.
### Positioning

| Prop | Required | Types | Default   | Description                             | Unit(s)           |
| ---- | -------- | ----- | --------- | --------------------------------------- | ----------------- |
| x    | true     | Array | undefined | x-coordinates of area path              | Local coordinates |
| y    | true     | Array | undefined | y-coordinates of area path              | Local coordinates |
| x2   | depends  | Array | undefined | x2-coordinates (secondary) of area path | Local coordinates |
| y2   | depends  | Array | undefined | y2-coordinates (secondary) of area path | Local coordinates |

#### Allowed combinations of positioning props
The positioning properties of the Rectangle can only be used in certain combinations.

| Combination      | Explanation                                                                                                                                                                 |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `x` + `y` + `y2` | 'Vertical' alignment of area. Draws a line with `x` and `y` coordinates, then draws a line with `x` and `y2` coordinates and connects the two lines to complete the area.   |
| `x` + `y` + `x2` | 'Horizontal' alignment of area. Draws a line with `x` and `y` coordinates, then draws a line with `x2` and `y` coordinates and connects the two lines to complete the area. |

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

To render an Area mark, you will need the `x` prop, `y` prop, and a `x2` and/or `y2`
prop. So having just `x` and `y` is not allowed. `x`, `y` and `x2` is allowed,
and `x`, `y`, `x2` and `y2` is allowed too.

All above props can be passed an Array of coordinates. The length of `x` and `y`
(and of `x2` and `y2`) has to be the same, with one exception: if one has a length
of greater than 1, the other one is allowed to have a length of exactly 1, which will
then be recycled. So, for example

::: v-pre
```html
<vgg-area
  :x="[0]"
  :y="[1, 2, 3, 4]"
  :y2="[1, 2, 3, 4]"
/>
```
:::

will be treated as

::: v-pre
```html
<vgg-area
  :x="[0, 0, 0, 0]"
  :y="[1, 2, 3, 4]"
  :y2="[1, 2, 3, 4]"
/>
```
:::

It is also possible to use an entire column within the data scope as coordinates
using `vgg-map` with `unit="dataframe"` (see [Map](../core/map.md) documentation). The rule of equal lengths still holds: if `x` is passed a dataframe
column, and `y` is passed an array, the array has to be of the same length as the
data column (except, again, if `y` is of length 1).

### Other props

The `interpolate` option is switched off by default for Area marks. Only
turn it on when strictly necessary, otherwise it will slow down performance.
`sort` is by default `'x'`, because most users will use the `x` dimension for
variables that must be sorted ascendingly, like points in time, while using the
`y` dimension for values that do not need sorting, like measurements at points
in time. If you want to plot time in the `y` dimension instead, make sure to
set `sort` to `'y'`.

## Example

<div style="display: flex;
	justify-content: space-around;
	align-items: center"
>

<div>

<MarkAreaStacked />

</div>

<div style='width: 60%; height: 100%;'>

```html
<vgg-graphic
    :width="200"
    :height="250"
    :data="{
      year: [2000, 2005, 2010, 2015,
      2000, 2005, 2010, 2015],
      population: [100, 110, 130, 180,
      200, 310, 430, 480],
      color: ['#c66366', '#c66366', '#c66366', '#c66366',
      '#7CAE00', '#7CAE00', '#7CAE00', '#7CAE00']
    }">

    <vgg-section
      :x1="25"
      :x2="175"
      :y1="25"
      :y2="225"
      scale-x="year"
      :scale-y="{domain: 'population', domainMin: 0, domainMax: 700}"
      :axes="{
        left: {'tick-count': 4, 'w': 30},
        bottom: {'tick-count': 4}
      }"
    >
      <vgg-data :transform="{ groupBy: 'color' }">
      
      <vgg-map v-slot="{ row, i, prevRow }">

        <vgg-area
          :x="row.grouped.year"
          :y="prevRow ? row.grouped.population.map((value, i) => value + prevRow.grouped.population[i]) : row.grouped.population"
          :y2="prevRow ? prevRow.grouped.population : [0]"
          :fill="row.color"
        />

      </vgg-map>

      </vgg-data>

    </vgg-section>

   

  </vgg-graphic>
```

</div>

</div>