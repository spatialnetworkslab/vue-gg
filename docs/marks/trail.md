---
title: Trail Mark
---

# Component tag

`<vgg-trail>`

# Description

The Trail mark is used to plot point data with a line connecting all the points, and is particularly useful if you want to draw lines with variable width size as a third encoding aside from position (x, y) color, and opacity. Trail marks are similar to `vgg-multi-line` in that they can follow arbitrary trajectories and do not need to follow a vertical or horizontal orientation. Their main feature is being mappable to variable widths from point to point, as inputted to `stroke-width`.

This mark does not use `stroke` (nor `strokeOpacity`), but `fill` and `fillOpacity` to manipulate its color and opacity respectively.

# Props

### Positioning

| Prop   | Required | Types | Default   | Description                                           | Unit(s)           |
| ------ | -------- | ----- | --------- | ----------------------------------------------------- | ----------------- |
| x      | depends  | Array | undefined | Array of x-coordinates for each trail point           | Local coordinates |
| y      | depends  | Array | undefined | Array of y-coordinates for each trail point           | Local coordinates |
| points | depends  | Array | undefined | Array of coordinate pairs [x, y] for each trail point | Local coordinates |

### Other aesthetics

| Prop         | Required | Types           | Default   | Description                                              | Unit(s)                    |
| ------------ | -------- | --------------- | --------- | -------------------------------------------------------- | -------------------------- |
| stroke-width | false    | [Number, Array] | undefined | Stroke width in screen pixel of trail at the given point | Screen pixel               |
| fill         | false    | String          | 'black'   | Fill color                                               | Named color, hex, rgb, hsl |
| fill-opacity | false    | Number          | undefined | Fill opacity                                             | Number between 0 and 1     |

### Other props

| Prop  | Required | Types   | Default   | Description                                                             | Unit(s) |
| ----- | -------- | ------- | --------- | ----------------------------------------------------------------------- | ------- |
| sort  | false    | Boolean | undefined | Points are to be sorted based on their x- or y-values, or left unsorted | Boolean |
| close | false    | Boolean | false     | If true, start point of trail is also its last point                    | Boolean |

# Events

TODO

# Usage

### Positioning

The Trail mark can be positioned in two ways: by providing both the `x` and `y` props,
or by providing the `points` prop. These two ways are mutually exclusive.

### Other Props

The `stroke-width` prop sets the stroke width of the `trail` mark at a given point. This may be given in screen pixels, or as a scaled value, as shown in the Example section.

# Example

::: v-pre
```html
<vgg-map
  v-slot="{ dataframe }"
  unit="dataframe"
>

  <vgg-trail
    :x="{ val: dataframe.time, scale: 'time' }"
    :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
    :stroke-width="{ val: dataframe.width, scale: 'width'}"
    :fill-opacity="0.4"
    fill="green"
  />

</vgg-map>
```
:::

<TrailMarkDemo />

This produces a green trail mark with 0.4 opacity and varying stroke width according to `dataframe.width`. Alternatively, `points` can be used to input an array of coordinate pairs, like so:

::: v-pre
```html
<vgg-trail
  :points="[[0.50, 11], [1, 20], [3, 14], [7, 30], [3, 16], [9, 19]]"
  :stroke-width="[1, 5, 5, 3, 4, 2]"
  :fill-opacity="0.7"
  :sort="'x'"
  fill="orange"
/>
```
:::
