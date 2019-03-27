---
title: Legends
---

# Legends

Legends are used to show scale mappings for values like color, shape, size, opacity. Each legend is typically mapped to a single dimension or variable. Vue Graphics Grammar supports three (3) types of legends – gradient, discrete, and symbol legends.

`vgg-gradient-legend` maps the given scale to a continuous gradient of two (2) or more colors housed in a rectangular section. The progression of the gradient is dictated by the outcome of the tick value when it is fed to the scale derived from the `fill` prop.

<CodeDemoLayout>

<LegendGradientSimple/>

<CodeLayout>

```html
<vgg-gradient-legend
  :scale="'bins'"
  :font-size="10"
  :title-font-size="12"
  :title-padding="5"
  title-font-weight="bold"
  title="Bins"
/>
```

</CodeLayout>

</CodeDemoLayout>

`vgg-discrete-legend` maps the domain given in `scale` to a rectangular section composed of discrete colors pertaining to the value of the label on the color scale generated from the `fill` prop.

<CodeDemoLayout>

<LegendDiscreteSimple />

<CodeLayout>

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

</CodeLayout>

</CodeDemoLayout>

`vgg-symbol-legend` maps `scale` to a series of symbols, which are based on those available in the `symbol` mark. At least one of the `size`, `shape`, `fill`, `stroke`, `stroke-width` `stroke-opacity`, or `fill-opacity` properties must be specified. All properties used for this legend must have the same input domain as `scale` (but each property can have its own range). If different domains are given per property, the legend will follow that which is given to `scale`.

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
| h   | false | Number | if `vertical`, 30% of parent section height + title font size (screen pixels) + 2 x title padding (screen pixels); if `horizontal`, 10% of parent section height | height of legend section | Screen pixels |
| w   | false | Number | if `vertical`, 30% of parent section width + title font size (screen pixels) + 2 x title padding (screen pixels); if `horizontal`, 10% of parent section width   | width of legend section | Screen pixels |
| legend-stroke | false | String | none | stroke color surrounding legend section | Named color, hex, rgb, hsl |
| legend-fill | false | String | none | fill color of legend section | Named color, hex, rgb, hsl |
| legend-stroke-width | false    | Number | 0  | stroke width of rectangle surrounding legend section | Named color, hex, rgb, hsl |

`legend-stroke`, `legend-fill`, and `legend-stroke-width` are analogous to the CSS properties of the same names and affect the body of the legend section.

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

## Gradient and discrete legends

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| fill          | false    | [Object, Array]        | { type: 'blues '}        | color scale to which the gradient section/discrete colors is/are mapped | See [Scales > Color](./scales/color.md) |

The progression of the colors in the gradient section for `vgg-gradient-legend` is dictated by the label values next to it.

The color of the corresponding rectangle for `vgg-discrete-legend` is mapped to the value of the label on the scale specified in the `fill` property.

## Symbol legends

These properties can be mapped to show scaling with respect to a specific variable in the symbol legend. The `shape` prop is set to the default for the Symbol mark, `circle`.

| Prop           | Required | Regular types    | Default     | Description | Unit(s) |
| -------------- | -------- | ---------------- | ----------- | ----------- | ------- |
| fill          | false    | [Object, Array, String]        | { type: 'blues '}        |  symbol fill color | Named color, hex, rgb, hsl |
| fill-opacity          | false    | [Number, Object, Array]        | 1        | symbol fill opacity | Number between 0 and 1 |
| shape          | false    | [String, Array]        | circle        | symbol shape | See [Marks > Symbol](./marks/symbol.md); an additional shape value called `line` is also available for the symbol legend |
| linecap          | false    | String      | round        | stroke line cap of symbol when `shape` is set to `line`| round, butt, square |
| size          | false    | [Number, Object, Array]        | 16        | symbol size | Screen pixel |
| stroke-width          | false    | [Number, Object, Array]        | 2        | symbol stroke width| Screen pixel |
| stroke          | false    | [Object, Array, String]        | undefined      | symbol stroke color| Named color, hex, rgb, hsl |
| stroke-opacity          | false    | [Number, Object, Array]        | 1        | symbol stroke opacity | Number between 0 and 1 |
| symbol-padding          | false    | Number        | 0.05        | space between symbol and label | Number between 0 and 1 |
| columns          | false    | Number        | undefined        | Max. number of columns the legend can have | Integer |
| rows          | false    | Number        | undefined        | Max. number of rows the legend can have | Integer |

`shape`, aside from the options in `vgg-symbol`, accepts the input 'line'. This will generate a legend where the symbols are line segments. Only when `shape` is set to 'line', will to input to `linecap` have any effect. When `shape = 'line'`, use `stroke-opacity` and `stroke` to change the symbols' opacity and color, respectively.

`columns` or `rows` instructs the component to draw the legend as a grid with the specified number of columns or rows. By default, the legend will draw ten (10) ticks.


## Usage

## Examples

<SizeColorLegend/>

::: v-pre
```html
<vgg-symbol-legend
  :scale="'a'"
  :tickCount=10
  :stroke="'none'"
  :size="{ range: [1, 20] }"
  :fill="{ type: 'plasma'}"
  title="Size & Color"
  title-font-weight="bold"
  :title-font-size=12
  :title-padding="10"
  position="tl"
  :rows="2"
  :symbol-padding="0.2"
  :h="100"
  orientation="horizontal"
/>
```
:::

<SymbolLegend/>

::: v-pre
```html
<vgg-symbol-legend
  :scale="'category'"
  :size="{ range: [1, 30] }"
  :fill="{ type: 'paired'}"
  :shape="{ type: 'stars'}"
  stroke="'none'"
  :w="400"
  title="Fill, Shape, Size"
  title-font-weight="bold"
  :title-font-size=12
  :title-padding="10"
  position="tr"
  orientation="horizontal"
/>
```
:::


<LineLegend/>

::: v-pre
```html
// stroke width and opacity
<vgg-symbol-legend
  :scale="'#rainfallScale'"
  :font-size="10"
  :size="15"
  :x="600"
  :y="300"
  :stroke-width="{ range: [2, 12] }"
  :stroke-opacity="{ range: [0, 0.7] }"
  shape="line"
  direction="vertical"
  title="Stroke width & opacity"
  title-font-weight="bold"
  :title-font-size="12"
/>

// stroke color
<vgg-symbol-legend
  :scale="'colors'"
  :font-size="10"
  :stroke-width="15"
  :stroke="['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange']"
  :x="600"
  :y="50"
  shape="line"
  title="Stroke color"
  title-font-weight="bold"
  :title-font-size="12"
/>
```
:::
