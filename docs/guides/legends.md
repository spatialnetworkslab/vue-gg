---
title: Legends
---

# Legends

Legends are used to show scale mappings for values like color, shape, size, opacity. Each legend is typically mapped to a single dimension or variable. Vue Graphics Grammar supports three (3) types of legends – gradient, discrete, and symbol legends.

`vgg-gradient-legend` maps the domain given to `scale` to a continuous gradient of two (2) or more colors housed in a rectangular section. The progression of the gradient is dictated by the spread of the tick values derived from `scale`.

<CodeDemoLayout>

<LegendGradientSimple/>

<CodeLayout>

```html
<vgg-gradient-legend
  :scale="'bins'"
  :h="100"
/>
```

</CodeLayout>

</CodeDemoLayout>

`vgg-discrete-legend` maps the domain given to `scale` to a rectangular section composed of discrete colors. The progression of the colors is dictated by the spread of the tick values derived from `scale`.

<CodeDemoLayout>

<LegendDiscreteSimple />

<CodeLayout>

```html
<vgg-discrete-legend
  :scale="'bins'"
  :font-size="10"
  :title-font-size="12"
  :title-padding="5"
  title="Bins"
  title-font-weight="bold"
  :h="120"
/>
```

</CodeLayout>

</CodeDemoLayout>

For gradient and discrete legends, either the `fill` or `fill-opacity` props may be used to encode `scale`. Applying transformations onto the data fed to `scale`, such as `binning`, will alter the placement of ticks and progression of colors to match the transformations.

`vgg-symbol-legend` maps `scale` to a series of symbols, which are based on those available in the `symbol` mark. At least one of the `size`, `shape`, `fill`, `stroke`, `stroke-width` `stroke-opacity`, or `fill-opacity` properties must be specified. All properties used for this legend follow the same input domain as `scale` (but each property can have its own range). If different domains are given per property, the legend will follow that which is given to `scale`.

<CodeDemoLayout>

<LegendSymbolSimple />

<CodeLayout>

```html
<vgg-symbol-legend
  :scale="'population'"
  :size="{ range: [2, 12] }"
  :h="140"
  title="Population"
  title-font-weight="bold"
  :title-font-size="10"
  :stroke="'none'"
  fill="#c66366"
  orientation='vertical'
  position="tr"
/>
```

</CodeLayout>

</CodeDemoLayout>

The number of 'ticks' or labels displayed is controlled by the prop `tickCount`, which is set to 10 by default.


## Properties

### Legend values

| Prop   | Required | Regular types           | Default   | Description                                               |
| ------ | -------- | ----------------------- | --------- | --------------------------------------------------------- |
| scale  | true     | [Array, String, Object] | undefined | range of values visualized by the legend, can be variable name |
| orientation   | false    | String               | 'vertical'     | orientation of legend (vertical/horizontal)|
| flip   | false    | Boolean               | false     | flip order of legend labels; if true, shows decreasing order                        |
| flip-numbers   | false    | Boolean               | false     | flip placement of numbers and gradient section                        |
| nice   | false    | Boolean             | true   | rounds off labels (if numerical) to closest ones digit                        |

### Legend Positioning

A legend component can contain the following position properties.

| Prop | Required | Types | Default   | Description                             | Unit(s)           |
| ---- | -------- | ----- | --------- | --------------------------------------- | ----------------- |
| x    | true     | Number | undefined | position of legend along section x-axis              | Local coordinates |
| y    | true     | Number | undefined | position of legend along section y-axis              | Local coordinates |
| position| false    | String | 'left'       | position of legend with respect to parent section                      | left, right, top, bottom, tl, tr, bl, br, center |

#### Allowed combinations of positioning props

| Combination      | Explanation         |
|------------------|----------------------|
| `x` + `y` | Manually positions the legend within the section   |
| `position` | Automatically computes the exact x-y coordinates to position the legend within the parent section, according to its input |

If left empty, then the default position of the x-axis is `position = 'left'` (center leftmost of parent section).

### Other aesthetics

| Prop | Required | Types | Default   | Description                             | Unit(s)           |
| ---- | -------- | ----- | --------- | --------------------------------------- | ----------------- |
| h   | false | Number | If `vertical`, automatically computed according to  parent section height, title font size (screen pixels), title padding (screen pixels), and number of tick; if `horizontal`, 10% of parent section height | height of legend section | Screen pixels |
| w   | false | Number | If `horizontal`, automatically computed according to  parent section width, title font size (screen pixels), title padding (screen pixels), and number of tick; if `vertical`, 10% of parent section width   | width of legend section | Screen pixels |
| legend-stroke | false | String | none | stroke color surrounding legend section | Named color, hex, rgb, hsl |
| legend-fill | false | String | none | fill color of legend section | Named color, hex, rgb, hsl |
| legend-stroke-width | false    | Number | 0  | stroke width of rectangle surrounding legend section | Named color, hex, rgb, hsl |

`legend-stroke`, `legend-fill`, and `legend-stroke-width` are analogous to the CSS properties of the same names and affect the body of the legend section that surrounds the ticks, rectangular section, and title.

### Title

The title can be found at the top of the legend section. It is located outside the bounding rectangle of the legend, should the legend section have `stroke`, `fill`, or `strokeWidth` properties specified.

| Prop            | Required | Regular types    | Default     | Description                             | Unit(s)                    |
| --------------- | -------- | ---------------- | ----------- | --------------------------------------- | --------------------------|
| title           | false    | String         | ''          | text to render as axis title            |                           |
| title-anchor-point | false    | String         | 'center'    | baseline and alignment of title text    | left, right, top, bottom, tl, tr, bl, br, center                          |
| title-font     | false    | String         | 'Helvetica'     | font family of title                          | Named font |
| title-font-color      | false    | String         | 'black'     | color of title                          | Named color, hex, rgb, hsl |
| title-font-size   | false    | Number         | 16          | size of font used for legend title        | Screen pixels              |
| title-font-weight | false    | [String, Number] | 'normal'    | weight of font used for axis title      | Any valid css font weight  |
| title-opacity    | false    | Number         | 1           | opacity of title                        | Number between 0 and 1     |
| title-padding    | false    | Number         | 0           | space between title and legend labels + gradient section                     | Screen pixels     |

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

## Events

Coming soon!

## Gradient and discrete legends

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| fill          | false    | [Object, Array]        | { type: 'blues '}        | color scale to which the gradient section/discrete colors is/are mapped | See [Scales > Color](../scales/color.md) |
| fill-opacity          | false    | [Number, Object, Array]        | 1        | fill opacity of color in `fill` | Number between 0 and 1 or `scale` |

The progression of the colors in the gradient/discrete colors section for `vgg-gradient-legend`/ `vgg-discrete-legend` is dictated by the spread of the legend's labels (as provided to `scale`). For more information on potential inputs to `scale`, see [Concepts > Scaling](../concepts/scaling.md).

## Symbol legends

These properties can be mapped to show scaling with respect to a specific variable in the symbol legend. The `shape` prop is set to the default for the Symbol mark, `circle`.

For more information on potential inputs to `scale` and other aesthetic properties to the legends, see [Concepts > Scaling](../concepts/scaling.md).

| Prop           | Required | Regular types    | Default     | Description | Unit(s) |
| -------------- | -------- | ---------------- | ----------- | ----------- | ------- |
| fill          | false    | [Object, Array, String]        | { type: 'blues '}        |  symbol fill color | Named color, hex, rgb, hsl |
| fill-opacity          | false    | [Number, Object, Array]        | 1        | symbol fill opacity | Number between 0 and 1 |
| shape          | false    | [String, Array]        | circle        | symbol shape | See [Marks > Symbol](docs/marks/symbol.md); an additional shape value called `line` is also available for the symbol legend |
| linecap          | false    | String      | round        | stroke line cap of symbol when `shape` is set to `line`| round, butt, square |
| size          | false    | [Number, Object, Array]        | 16        | symbol size | Screen pixel |
| stroke-width          | false    | [Number, Object, Array]        | 2        | symbol stroke width| Screen pixel |
| stroke          | false    | [Object, Array, String]        | undefined      | symbol stroke color| Named color, hex, rgb, hsl |
| stroke-opacity          | false    | [Number, Object, Array]        | 1        | symbol stroke opacity | Number between 0 and 1 |
| symbol-padding          | false    | Number        | 0.05        | space between symbol and label | Number between 0 and 1 |
| columns          | false    | Number        | undefined        | Max. number of columns the legend can have | Integer |
| rows          | false    | Number        | undefined        | Max. number of rows the legend can have | Integer |
| col-padding          | false    | Number        | 0.5       | space between columns | Screen pixels |
| row-padding          | false    | Number        | 0.5       | space between rows | Screen pixels |

`shape`, aside from the options in `vgg-symbol`, accepts the input 'line'. This will generate a legend where the symbols are line segments. Only when `shape` is set to 'line', will to input to `linecap` have any effect. When `shape = 'line'`, use `stroke-opacity` and `stroke` to change the symbols' opacity and color, respectively.

`columns` or `rows` instructs the component to draw the legend as a grid with the specified number of columns or rows. By default, the legend will draw ten (10) ticks.


## Usage

### Rendering

To render a legend, at bare minimum the `scale` prop must be provided. For all legend types, the default encoding is set to `fill`, using the 'blues' color scale. For `vgg-symbol-legend`, the default shape is `circle`.

<CodeDemoLayout>

<LegendBasic/>

<CodeLayout>
```html
<vgg-discrete-legend
  :scale="'bins'"
  :h="100"
/>

<vgg-gradient-legend
  :scale="'bins'"
  position="center"
  :h="100"
/>

<vgg-symbol-legend
  :scale="'bins'"
  :fill="'bins'"
  stroke='none'
  position="right"
  :h="100"
/>
```
</CodeLayout>

</CodeDemoLayout>

### Discrete and gradient legends

Discrete and gradient legends support two types of encoding:

| Combination      | Explanation         |
|------------------|----------------------|
| `fill` as scale, `fillOpacity` as fixed value | Input to `fill` is an object, `fillOpacity` may be left unstated   |
| `fillOpacity` as scale, `fill` as fixed value | Input to `fillOpacity` is an object, `fill` must be specified as a color (rgb, hsl, hex value) |

For more information on potential inputs to these props, see [Concepts > Scaling](../concepts/scaling.md).

#### `fill` as scale

When `fill` is set as the encoding, then `fillOpacity` does not need to be specified – the default `fillOpacity` is 1. An error will be raised if both encodings are set to `scale.`

<CodeDemoLayout>

<LegendFill/>

<CodeLayout>
```html
<vgg-gradient-legend
  :scale="'bins'"
  :fill="{type:'viridis'}"
  :h="100"
/>

<vgg-discrete-legend
  :scale="'bins'"
  :fill="{type:'viridis'}"
  position="bl"
/>
```
</CodeLayout>

</CodeDemoLayout>

#### `fillOpacity` as scale

When `fillOpacity` is set as the encoding, then `fill` must be set to a single color. An error will be raised if both encodings are set to `scale.`

<CodeDemoLayout>

<LegendFillOpacity/>

<CodeLayout>
```html
<vgg-gradient-legend
  :scale="'bins'"
  fill="#c66366"
  :fill-opacity="{ domain: 'bins' }"
/>

<vgg-discrete-legend
  :scale="'bins'"
  fill="#c66366"
  :fill-opacity="{ domain: 'bins' }"
  position="bl"
/>
```
</CodeLayout>

</CodeDemoLayout>

### Symbol legends

Multiple encodings can be set in `vgg-symbol-gradient` simultaneously. At least one encoding should be set, or else the legend will show up as a series of circles with black strokes.

<CodeDemoLayout>

<LegendColor/>

<CodeLayout>
```html
<vgg-symbol-legend
  :scale="'a'"
  stroke="none"
  :size="{ range: [5, 12] }"
  :fill="{ type: 'plasma'}"
  title="Size, Color"
  :title-font-size="12"
  position="br"
  orientation="horizontal"
  :symbol-padding="0.3"
  :col-padding="0.1"
  :title-padding="20"
  :rows="2"
/>
```
</CodeLayout>

</CodeDemoLayout>

## Examples

The symbol legend below makes use of a categorical color scale for `fill` and a continuous scale for `size`. The type of `shape`/`fill` scheme to use can specified as inputs, i.e. `{ type: ... }`.

<CodeDemoLayout>

<LegendSymbol/>

<CodeLayout>

::: v-pre
```html
// fill, shape
<vgg-symbol-legend
  :scale="'category'"
  :size="16"
  :fill="{ type: 'paired'}"
  :shape="{ type: 'stars'}"
  stroke="none"
  :w="350"
  title="Fill, Shape"
  :title-font-size=12
  :title-padding="10"
  position="tl"
  orientation="horizontal"
/>

// size
<vgg-symbol-legend
  :scale="'a'"
  :size="{ range: [10, 20] }"
  title="Size"
  :title-font-size=12
  :title-padding="10"
  :w="350"
  position="bl"
  orientation="horizontal"
/>
```
:::
</CodeLayout>

</CodeDemoLayout>

This legend uses the `stroke-width`, `opacity` and `fill` properties to elaborate on the values of the `trail` mark.
Scales created using `vgg-scales` can be called as input to `scale`. Custom ranges for the output of the legend aesthetics can be set using `{ range: ... }`.

<CodeDemoLayout>

<LegendLine/>

<CodeLayout>

::: v-pre
```html
// stroke width, opacity
<vgg-symbol-legend
  :scale="'#rainfallScale'"
  :font-size="10"
  :size="15"
  :stroke-width="{ range: [2, 12] }"
  :stroke-opacity="{ range: [0, 0.7] }"
  shape="line"
  :x="10"
  :y="500"
  :w="250"
  title="Stroke width, opacity"
  title-font-weight="bold"
  :title-font-size="12"
  orientation="horizontal"
/>

// stroke color
<vgg-symbol-legend
  :scale="'colors'"
  :font-size="10"
  :stroke-width="10"
  :stroke="['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange']"
  :x="10"
  :y="50"
  :w="250"
  shape="line"
  title="Stroke color"
  title-font-weight="bold"
  :title-font-size="12"
  orientation="horizontal"
/>

```
:::
</CodeLayout>

</CodeDemoLayout>
