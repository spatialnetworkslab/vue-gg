---
title: Path mark
---

# Path Mark

The `vgg-path` mark is used to draw svg paths. It can be visually similar to `vgg-polygon`, `vgg-multi-line` and `vgg-path`, however there are some differences that may favor `vgg-path` in some use cases.

Most significantly, paths, even when closed and filled, are considered to have no area. Events (such as hover) are triggered only when the cursor is directly over the path. This is in contrast to polygons, which triggers events when the mouse is anywhere within the area of the mark.

<CodeDemoLayout>

<MarkPathSimple />

<CodeLayout>

```html
<vgg-map 
  v-slot="{ dataframe }"
  unit="dataframe">

  <vgg-multi-line
    :x="dataframe.year"
    :y="dataframe.population"
    stroke="#c66366"
    :close="false"
    fill="none"
  />

</vgg-map>
```

</CodeLayout>

</CodeDemoLayout>

## Properties

### Positioning

| Prop   | Required | Types | Default   | Description                             | Unit(s)           |
| ------ | -------- | ----- | --------- | --------------------------------------- | ----------------- |
| x      | depends  | Array | undefined | x-coordinates of each point along path  | Local coordinates |
| y      | depends  | Array | undefined | y-coordinates of each point along path  | Local coordinates |
| points | depends  | Array | undefined | Array of coordinate pairs [x, y] for each point along path | Local coordinates |

#### Allowed combinations of positioning props
The positioning properties of the Path mark can only be used in certain combinations.

| Combination | Explanation                                                                                                                    |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| `x` + `y`   | `x` refers to x-coordinate of each point along the path, `y` refers to y-coordinate of each point along the path.            |
| `points`    | Each point along the path is specified as [x, y], where x and y are numbers and not variables. All points in the path should be passed to the mark in the form [ [ x1 , y1 ] , [ x2 , y2 ] ... ]          |

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

| Prop        | Required | Types                | Default  | Description                                                              |
| ----------- | -------- | -------------------- | -------- | ------------------------------------------------------------------------ |
| interpolate | false    | Boolean              | false    | Interpolate between points (when using non-cartesian coordinate systems) |
| sort        | false    | [String, undefined]  | undefined| Sort points in ascending order in x or y dimension                       |
| close       | false    | Boolean              | true     | Whether path should closed, i.e. return to its origin                    |

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

To render an Path mark, you will need to set the `x` and `y` prop. Both have to be passed an Array of values/coordinates. The length of `x` and `y` has to be the same, with one exception: if one has a length
of greater than 1, the other one is allowed to have a length of exactly 1, which will
then be recycled. So, for example

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

It is also possible to use an entire column within the data scope as coordinates
using `vgg-map` with `unit="dataframe"` (see [Map](../core/map.md) documentation). The rule of equal lengths still holds: if `x` is passed a dataframe
column, and `y` is passed an array, the array has to be of the same length as the
data column (except, again, if `y` is of length 1).

### Other props

The `interpolate` option is switched off by default for Path marks. Only
turn it on when strictly necessary, otherwise it will slow down performance.

The Path mark is not sorted by default. However, it is closed. To render an open path, set `close` to `false`.

## Example

<MarkPathDemo />
