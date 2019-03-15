---
title: Symbol Legend
---

# Component tag

`<vgg-symbol-legend>`

# Description

Legends are used to show scale mappings for values like color, shape, size, opacity. Each legend is typically mapped to a single dimension or variable.

The symbol legend maps the given scale to a series of symbols.

 At least one of the `size`, `shape`, `fill`, `stroke`, `stroke-width` `stroke-opacity`, or `fill-opacity` properties must be specified. All properties used for this legend must have the same input domain as `scale` (but each property can have its own range). If different domains are given per property, the legend will follow that which is given to `scale`.

# Props

| Prop   | Required | Regular types           | Default   | Description                                               |
| ------ | -------- | ----------------------- | --------- | --------------------------------------------------------- |
| scale  | true     | [Array, String, Object] | undefined | range of values visualized by the legend, can be variable name |
| orientation   | false    | String               | 'vertical'     | orientation of legend (vertical/horizontal)|
| flip   | false    | [Boolean]               | false     | flip order of legend labels; if true, shows decreasing order                        |
| flip-numbers   | false    | [Boolean]               | false     | flip placement of numbers and discrete color rectangles                        |
| height   | false    | Number             | 300 if `direction = 'vertical'`, 60 if `direction = 'horizontal'`   | height of legend section                        |
| width   | false    | Number             | 60 if `direction = 'vertical'`, 300 if `direction = 'horizontal'`   | width of legend section                        |
| legend-stroke   | false    | String             | none   | stroke color surrounding legend section                        |
| legend-fill   | false    | String             | none   | fill color of legend section                        |
| legend-stroke-width   | false    | Number             | 0   | stroke width of rectangle surrounding legend section                        |

### Legend Positioning

There are two options for positioning the legend in the graphic. The default position of the x-axis is at `position = 'left'` (center leftmost of parent section).

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)                |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | ---------------------- |
| position| false    | String | 'left'       | position of legend with respect to parent section                      | left, right, top, bottom, tl, tr, bl, br, center |
| x    | false    | Number         | undefined | position of legend along section x-axis                      | Local Coordinates      |
| y    | false    | Number         | undefined | position of legend along section y-axis                         | Local Coordinates      |

### Title

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

Note that if a `Function` is passed to the `format` prop to format labels before rendering, the function output must be of type `String`

| Prop           | Required | Regular types      | Default     | Description                             | Unit(s)                    |
| -------------- | -------- | ------------------ | ----------- | --------------------------------------- | -------------------------- |
| labels         | false    | Array          | true        | array of labels to map legend to                   |                            |
| format         | false    | [String, Function] | undefined   | formatting of axis labels               |                            |
| label-color     | false    | String           | 'black'     | color of labels                         | Named color, hex, rgb, hsl |
| label-font      | false    | String           | 'Helvetica' | font used for axis labels               | Named font                 |
| label-font-size  | false    | Number           | 10          | size of font used for axis labels       | Screen pixels              |
| label-font-weight| false    | [String, Number]   | 'normal'    | weight of font used for axis labels     | Any valid css font weight  |
| label-opacity   | false    | Number           | 1           | opacity of labels                       | Number between 0 and 1     |
| label-rotate    | false    | [Boolean]          | false       | if true rotate labels                   | Degrees                   |

### Ticks

These properties control the number of labels/the interval between the labels and symbol mappings in the symbol legend.

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| tick-count          | false    | Object        | 6        | number of ticks/labels to render                         | Any integer greater than 0                           |
| tick-min-step          | false    | Object        | undefined        | minimum interval between ticks/labels                           | Any positive rational number                           |

### Symbols

These properties can be mapped to show scaling with respect to a specific variable in the symbol legend. The `shape` prop is set to the default for the Symbol mark, `circle`.

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| fill          | false    | [Object, Array, String]        | { type: 'blues '}        |  symbol fill color | Named color, hex, rgb, hsl |
| fill-opacity          | false    | [Number, Object, Array]        | 1        | symbol fill opacity | Number between 0 and 1 |
| shape          | false    | [String, Array]        | circle        | symbol shape | See [Marks > Symbol](./marks/symbol.md); an additional shape value called `line` is also accepted for the symbol legend |
| linecap          | false    | String      | round        | stroke line cap of symbol when `shape` is set to `line`| round, butt, square |
| size          | false    | [Number, Object, Array]        | 16        | symbol size | Screen pixel |
| stroke-width          | false    | [Object, Array]        | 2        | symbol stroke width| Screen pixel |
| stroke          | false    | [Object, Array, String]        | undefined      | symbol stroke color| Named color, hex, rgb, hsl |
| stroke-opacity          | false    | [Number, Object, Array]        | 1        | symbol stroke opacity | Number between 0 and 1 |
| symbol-padding          | false    | Number        | 0.05        | space between symbol and label | Number between 0 and 1 |
| columns          | false    | Number        | 1 if `orientation = 'vertical'`, `tickCount` if `orientation = 'horizontal'`        | Max. number of columns the legend can have | Number between 0 and 1 |

`shape`, aside from the options in `vgg-symbol`, can accept the input 'line'. This will generate a legend where the symbols are line segments. Only when `shape` is set to 'line', will giving an input to `linecap` have an effect. When using 'line', use `stroke-opacity` to change the symbol color.

`columns` instructs the component to draw the legend as a grid with that number of columns.

# Example

<SymbolLegendDemo/>

::: v-pre
```html
<vgg-symbol-legend
  :scale="{ domain: 'a'}"
  :tickCount=10
  :stroke="'none'"
  :size="{ domain: 'a', range: [1, 20]}"
  :fill="{ type: 'plasma'}"
  title="Size + Color"
  title-font-weight="bold"
  :title-font-size=12
  :title-padding="10"
  :height="120"
  :width="200"
  :columns=5
  position="tl"
  orientation="horizontal"
/>
```
:::
