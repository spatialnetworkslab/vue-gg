---
title: Discrete Legend
---

# Component tag

`<vgg-discrete-legend>`

# Description

Legends are used to show scale mappings for values like color, shape, size, opacity. Each legend is typically mapped to a single dimension or variable.

The discrete legend maps the given scale to a rectangular section composed of discrete rectangles pertaining to the value of the label as per the `fill` color scale.

The scale given in `scale` must be the same as that used in `fill`, if an input to the latter is given. Otherwise, the behavior of the legend is undefined.

# Props

| Prop   | Required | Regular types           | Default   | Description                                               |
| ------ | -------- | ----------------------- | --------- | --------------------------------------------------------- |
| scale  | true     | [Array, String, Object] | undefined | range of values visualized by the legend, can be variable name |
| orientation   | false    | String               | vertical     | orientation of legend (vertical/horizontal)|
| flip   | false    | [Boolean]               | false     | flip order of legend labels; if true, shows decreasing order                        |
| flipNumbers   | false    | [Boolean]               | false     | flip placement of numbers and discrete color rectangles                        |
| height   | false    | Number             | 300 if `direction = 'vertical'`, 60 if `direction = 'horizontal'`   | height of legend section                        |
| width   | false    | Number             | 60 if `direction = 'vertical'`, 300 if `direction = 'horizontal'`   | width of legend section                        |
| legendStroke   | false    | String             | none   | stroke color surrounding legend section                        |
| legendFill   | false    | String             | none   | fill color of legend section                        |
| legendStrokeWidth   | false    | Number             | 0   | stroke width of rectangle surrounding legend section                        |

### Legend Positioning

There are two options for positioning the legend in the graphic. The default position of the x-axis is at `position = 'left'` (center leftmost of parent section).

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)                |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | ---------------------- |
| position| false    | String | 'left'       | position of legend with respect to parent section                      | left, right, top, bottom, tl, tr, bl, br, center |
| x    | false    | Number         | undefined | position of legend along section x-axis                      | Local Coordinates      |
| y    | false    | Number         | undefined | position of legend along section y-axis                         | Local Coordinates      |

### Title

Note that if a `Function` is passed to the `format` prop to format labels before rendering, the function output must be of type `String`

| Prop            | Required | Regular types    | Default     | Description                             | Unit(s)                    |
| --------------- | -------- | ---------------- | ----------- | --------------------------------------- | -------------------------- |
| title           | false    | String         | ''          | text to render as axis title            |                           |
| titleAnchorPoint| false    | String         | 'center'    | baseline and alignment of title text    | left, right, top, bottom, tl, tr, bl, br, center                          |
| titleFont     | false    | String         | 'Helvetica'     | font family of title                          | Named font |
| titleFontColor      | false    | String         | 'black'     | color of title                          | Named color, hex, rgb, hsl |
| titleFontSize   | false    | Number         | 16          | size of font used for legend title        | Screen pixels              |
| titleFontWeight | false    | [String, Number] | 'normal'    | weight of font used for axis title      | Any valid css font weight  |
| titleOpacity    | false    | Number         | 1           | opacity of title                        | Number between 0 and 1     |
| titlePadding    | false    | Number         | 0           | space between title and legend labels + discrete color rectangles                      | Screen pixels     |

### Labels

Note that if a `Function` is passed to the `format` prop to format labels before rendering, the function output must be of type `String`

| Prop           | Required | Regular types      | Default     | Description                             | Unit(s)                    |
| -------------- | -------- | ------------------ | ----------- | --------------------------------------- | -------------------------- |
| labels         | false    | Array          | true        | array of labels to map legend to                   |                            |
| format         | false    | [String, Function] | undefined   | formatting of axis labels               |                            |
| labelColor     | false    | String           | 'black'     | color of labels                         | Named color, hex, rgb, hsl |
| labelFont      | false    | String           | 'Helvetica' | font used for axis labels               | Named font                 |
| labelFontSize  | false    | Number           | 10          | size of font used for axis labels       | Screen pixels              |
| labelFontWeight| false    | [String, Number]   | 'normal'    | weight of font used for axis labels     | Any valid css font weight  |
| labelOpacity   | false    | Number           | 1           | opacity of labels                       | Number between 0 and 1     |
| labelRotate    | false    | [Boolean]          | false       | if true rotate labels                   | Degrees                    |

### Ticks

These properties control the number of labels/the interval between the labels in the gradient legend.

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| tickCount          | false    | Object        | 6        | number of ticks/labels to render                         | Any integer greater than 0                           |
| tickMinStep          | false    | Object        | undefined        | minimum interval between ticks/labels                           | Any positive rational number                           |

### Discrete colors

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| fill          | false    | [Object, Array]        | { type: 'blues '}        | color scale to which the rectangles are mapped | See [Scales > Color](./scales/color.md) |

# Example

<DiscreteDemo/>

::: v-pre
```html
<vgg-discrete-legend
  :scale="{ domain: 'bins', domainMin: 10 }"
  :fontSize="10"
  :titleFontSize="16"
  :tickCount="10"
  flipNumbers
  title="Legend title"
  position="tr"
  flip
/>
```
:::
