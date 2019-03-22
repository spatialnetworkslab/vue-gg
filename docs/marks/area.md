---
title: Area mark
---

# Component tag

`<vgg-area>`

# Description

Like the MultiLine mark, the Area mark is useful for visualizing trends.
But unlike the MultiLine, the Area is particularly suitable to dissect trends,
and see what they are composed of, while the MultiLine is better suited to
compare separate trends.

For example, to analyse how much money you spend monthly on various things, you
would want to use the Area mark, with each mark representing a different type of expense.
On the other hand, if you wanted to compare your monthly spending with that of
your friends, you might want to use the MultiLine, with each mark representing
a different person's spending.

# Props

### Positioning

| Prop | Required | Types | Default   | Description                             | Unit(s)           |
| ---- | -------- | ----- | --------- | --------------------------------------- | ----------------- |
| x    | true     | Array | undefined | x-coordinates of area path              | Local coordinates |
| y    | true     | Array | undefined | y-coordinates of area path              | Local coordinates |
| x2   | depends  | Array | undefined | x2-coordinates (secondary) of area path | Local coordinates |
| y2   | depends  | Array | undefined | y2-coordinates (secondary) of area path | Local coordinates |

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

# Events

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

# Usage

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
using `vgg-map` with `unit="dataframe"` (see [Map](../core/map.md) documenation).
But the rule of equal lengths still holds: if `x` is passed a dataframe
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

# Example

::: v-pre
```html
<vgg-graphic
  :width="600"
  :height="600"
  :data="dummyData">

  <vgg-section
    :x1="100"
    :x2="500"
    :y1="100"
    :y2="500"
    :scale-x="'xValues'"
    :scale-y="'yValues'"
  >
    <vgg-data :transform="{ groupBy: 'colors' }">

      <vgg-map v-slot="{ row, i, prevRow }">

        <vgg-area
          :x="row.grouped.xValues"
          :y="row.grouped.yValues"
          :y2="prevRow ? prevRow.grouped.yValues : [0]"
          :fill="row.colors"
          :opacity="0.5"
        />

      </vgg-map>

    </vgg-data>

  </vgg-section>

</vgg-graphic>
```
:::
