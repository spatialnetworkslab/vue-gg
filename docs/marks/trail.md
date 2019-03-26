---
title: Trail mark
---

# Trail mark

The Trail mark is used to plot point data with a line connecting all the points, and is particularly useful if you want to draw lines with variable width encoding in addition to position, color, and opacity. Trail marks are similar to `vgg-multi-line`. Their main feature is being mappable to variable widths from point to point, as specified in the `stroke-width` property.

This mark does not use `stroke` (nor `strokeOpacity`), but `fill` and `fillOpacity` to manipulate its color and opacity respectively.

<CodeDemoLayout>

<MarkTrailSimple />

<CodeLayout>

```html
<vgg-map v-slot="{ dataframe }"
  unit="dataframe">

  <vgg-trail
    :x="dataframe.xValues"
    :y="dataframe.yValues"
    :stroke-width="{
      val: dataframe.xValues,
      scale: 'xValues' }"
    fill="#c66366"
  />

</vgg-map>
```

</CodeLayout>

<<<<<<< HEAD
# Trail Mark
=======
</CodeDemoLayout>
>>>>>>> 1c155254b6c8f4de7ef15a21a6b5edd90ae62ea9

## Properties

### Positioning

| Prop   | Required | Types | Default   | Description                                           | Unit(s)           |
| ------ | -------- | ----- | --------- | ----------------------------------------------------- | ----------------- |
| x      | depends  | Array | undefined | Array of x-coordinates for each trail point           | Local coordinates |
| y      | depends  | Array | undefined | Array of y-coordinates for each trail point           | Local coordinates |
| points | depends  | Array | undefined | Array of coordinate pairs [x, y] for each trail point | Local coordinates |

#### Allowed combinations of positioning props
The positioning properties of the Trail mark can only be used in certain combinations.

| Combination | Explanation                                                                                                                    |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| `x` + `y`   | `x` refers to x-coordinate of each point along the trail, `y` refers to y-coordinate of each point along the trail.            |
| `points`    | Each point along the trail is specified as [x, y], where x and y are numbers and not variables. All points in the trail should be passed to the mark in the form [ [ x1 , y1 ] , [ x2 , y2 ] ... ]          |

### Other aesthetics

| Prop         | Required | Types           | Default   | Description                                              | Unit(s)                    |
| ------------ | -------- | --------------- | --------- | -------------------------------------------------------- | -------------------------- |
| stroke-width | false    | [Number, Array] | undefined | Stroke width in screen pixel of trail at the given point | Screen pixel               |
| fill         | false    | String          | 'black'   | Fill color                                               | Named color, hex, rgb, hsl |
| fill-opacity | false    | Number          | undefined | Fill opacity                                             | Number between 0 and 1     |

### Other properties

| Prop  | Required | Types   | Default   | Description                                                             | Unit(s) |
| ----- | -------- | ------- | --------- | ----------------------------------------------------------------------- | ------- |
| sort  | false    | Boolean | undefined | Points are to be sorted based on their x- or y-values, or left unsorted | Boolean |
| close | false    | Boolean | false     | If true, the start and end points of the trail are connected to form a closed path    | Boolean |

<<<<<<< HEAD
| Prop | Required | Regular types    | Default   | Description                             | Unit(s)                |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | ---------------------- |
| points| false    | Array | []       | array of x-y coordinate pairs referring to path tracked by `trail` mark                      | [ [ x1, y1 ], [ x2, y2 ], ...] |
| x    | true    | Number         | undefined | position of legend along section x-axis                      | Local Coordinates      |
| y    | true    | Number         | undefined | position of legend along section y-axis                         | Local Coordinates      |

Alternatively, the `points` prop may be used to specify the path followed by `trail`. Only `x` and `y` or `points` may be used at any given time for a certain `trail` mark.

### Other Props
=======
## Events
>>>>>>> 1c155254b6c8f4de7ef15a21a6b5edd90ae62ea9

| Event     | Description                                   |
| --------- | --------------------------------------------- |
| click     | Triggered when user clicks on mark            |
| hover     | Triggered when user hovers over mark          |
| mouseover | Triggered when user's mouse is above mark     |
| mouseout  | Triggered when user's mouse leaves mark       |
| select    | Triggered when mark is selected               |
| deselect  | Triggered when mark is removed from selection |

<<<<<<< HEAD
Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| stroke-width          | false    | [Number, Object, Array]        | 2        | symbol stroke width| Screen pixel |

# Example
=======
For more information on these events, see the [Interactivity](../concepts/interactivity.md)
documentation.
>>>>>>> 1c155254b6c8f4de7ef15a21a6b5edd90ae62ea9

## Usage

### Positioning

<<<<<<< HEAD
  <vgg-trail
    :x="{ val: dataframe.time, scale: 'time' }"
    :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
    :stroke-width="{ val: dataframe.width, scale: 'width'}"
    :fill-opacity="0.4"
    fill="green"
  />
=======
The Trail mark can be positioned in two ways: by providing both the `x` and `y` properties, or by providing the `points` property.
>>>>>>> 1c155254b6c8f4de7ef15a21a6b5edd90ae62ea9

### Other aesthetics

In the trail mark, the `stroke-width` properties can be scaled according to a third variable. However, the `fill` and `fill-opacity` properties can only take on a single value that applies to the entire trail mark.

### Other properties

<<<<<<< HEAD
::: v-pre
```html
<vgg-trail
  :points="[[0.50, 11], [1, 20], [3, 14], [7, 30], [3, 16], [9, 19]]"
  :stroke-width="[1, 5, 5, 3, 4, 2]"
  fill="orange"
  :fill-opacity="0.7"
  :sort="'x'"
/>
```
:::
=======
The `sort` property sorts the data according to the given variable before plotting the trail mark. Sorting is done from lowest to highest (or alphabetically).

The `close` property, when true, joins the start and end points of the trail mark to form a closed path.

## Example

<MarkTrailDemo />
>>>>>>> 1c155254b6c8f4de7ef15a21a6b5edd90ae62ea9
