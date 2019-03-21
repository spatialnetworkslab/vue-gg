---
title: Discrete Legend
---

# Component tag

`<vgg-discrete-legend>`

# Description

Legends are used to show scale mappings for values like color, shape, size, opacity. Each legend is typically mapped to a single dimension or variable.

The discrete legend maps the domain given in `scale` to a rectangular section composed of discrete rectangles pertaining to the value of the label on the color scale generated from the `fill` prop.  The number of 'ticks' or labels displayed is controlled by the prop `tickCount`, which is set to 10 by default.

# Props

| Prop   | Required | Regular types           | Default   | Description                                               |
| ------ | -------- | ----------------------- | --------- | --------------------------------------------------------- |
| scale  | true     | [Array, String, Object] | undefined | range of values visualized by the legend, can be variable name |
| orientation   | false    | String               | 'vertical'     | orientation of legend (vertical/horizontal)|
| flip   | false    | Boolean               | false     | flip order of legend labels; if true, shows decreasing order                        |
| flip-numbers   | false    | Boolean               | false     | flip placement of numbers and discrete colored rectangles                        |
| h   | false    | Number             | if `vertical`, 30% of parent section height + title font size (screen pixels) + 2 x title padding (screen pixels); if `horizontal`, 10% of parent section height   | height of legend section                        |
| w   | false    | Number             | if `vertical`, 30% of parent section width + title font size (screen pixels) + 2 x title padding (screen pixels); if `horizontal`, 10% of parent section width   | width of legend section                        |
| legend-stroke   | false    | String             | none   | stroke color surrounding legend section                        |
| legend-fill   | false    | String             | none   | fill color of legend section                        |
| legend-stroke-width   | false    | Number             | 0   | stroke width of rectangle surrounding legend section                        |
| nice   | false    | Boolean             | true   | rounds off labels (if numerical) to closest ones digit                        |

The height and width of the legend are auto-computed based on the dimensions of its parent section.

### Legend Positioning

There are two options for positioning the legend in the graphic. One method is by specifiying the `position` of the legend. This will automatically compute the exact x-y coordinates to position the legend within the parent section.

Alternatively, `x` and `y` can be used to manually position the legend within the section. Either can be specified alone (in which case the unspecified value will be auto-computed) or together.

The default position of the x-axis is `position = 'left'` (center leftmost of parent section).

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)                |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | ---------------------- |
| position| false    | String | 'left'       | position of legend with respect to parent section                      | left, right, top, bottom, tl, tr, bl, br, center |
| x    | false    | Number         | undefined | position of legend along section x-axis                      | Local Coordinates      |
| y    | false    | Number         | undefined | position of legend along section y-axis                         | Local Coordinates      |

### Title

The title can be found at the top of the legend section. It is located outside the bounding rectangle of the legend, should the legend section have `stroke`, `fill`, or `strokeWidth` properties specified.

| Prop            | Required | Regular types    | Default     | Description                             | Unit(s)                    |
| --------------- | -------- | ---------------- | ----------- | --------------------------------------- | -------------------------- |
| title           | false    | String         | ''          | text to render as axis title            |                           |
| title-anchor-point | false    | String         | 'center'    | baseline and alignment of title text    | left, right, top, bottom, tl, tr, bl, br, center                          |
| title-font     | false    | String         | 'Helvetica'     | font family of title                          | Named font |
| title-font-color      | false    | String         | 'black'     | color of title                          | Named color, hex, rgb, hsl |
| title-font-size   | false    | Number         | 16          | size of font used for legend title        | Screen pixels              |
| title-font-weight | false    | [String, Number] | 'normal'    | weight of font used for axis title      | Any valid css font weight  |
| title-opacity    | false    | Number         | 1           | opacity of title                        | Number between 0 and 1     |
| title-padding    | false    | Number         | 0           | space between title and legend labels + discrete color rectangles                      | Screen pixels     |

### Labels

These refer to the text beside the legend intervals. Note that if a `Function` is passed to the `format` prop to format labels before rendering, the function output must be of type `String`.

| Prop           | Required | Regular types      | Default     | Description                             | Unit(s)                    |
| -------------- | -------- | ------------------ | ----------- | --------------------------------------- | -------------------------- |
| labels         | false    | Array          | true        | array of labels to map legend to                   |                            |
| format         | false    | [String, Function] | undefined   | formatting of axis labels               |                            |
| label-color     | false    | String           | 'black'     | color of labels                         | Named color, hex, rgb, hsl |
| label-font      | false    | String           | 'Helvetica' | font used for axis labels               | Named font                 |
| label-font-size  | false    | Number           | 10          | size of font used for axis labels       | Screen pixels              |
| label-font-weight| false    | [String, Number]   | 'normal'    | weight of font used for axis labels     | Any valid css font weight  |
| label-opacity   | false    | Number           | 1           | opacity of labels                       | Number between 0 and 1     |
| label-rotate    | false    | Boolean          | false       | if true rotate labels                   | Degrees                   |
| label-padding    | false    | Number        | 0        | space between symbol and label | Number between 0 and 1 |

### Ticks

These properties control the number of ticks or labels, and the minimum interval between the labels (if they are `quantitative` data) of the legend.

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| tick-count          | false    | Object        | 10        | number of ticks/labels to render                         | Any integer greater than 0                           |
| tick-min-step          | false    | Object        | undefined        | minimum interval between ticks/labels                           | Any positive rational number                           |

### Discrete colors

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| fill          | false    | [Object, Array]        | { type: 'blues '}        | color scale to which the rectangles are mapped | See [Scales > Color](./scales/color.md) |

The color of the corresponding rectangle is mapped to the value of the label on the scale specified in the `fill` property.
# Example

<DiscreteDemo/>

::: v-pre
```html
<vgg-discrete-legend
  :scale="'bins'"
  :font-size="10"
  :title-font-size="16"
  position="tr"
  :fill="{type: 'viridis'}"
  title-font-weight="bold"
  title="Bins"
/>
```
:::
