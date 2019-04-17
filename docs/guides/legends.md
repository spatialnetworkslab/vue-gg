---
title: Legends
---

# Legends

Legends are used to show mappings for aesthetics like color, shape, size,
opacity to a given domain. Each legend is mapped to a single dimension or variable.
Vue Graphics Grammar supports three (3)
types of legends – gradient, discrete, and symbol legends.

`vgg-gradient-legend` maps the domain given to `scale` to a continuous gradient
of two (2) or more colors housed in a rectangular section.

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

`vgg-discrete-legend` maps the domain given to `scale` to a rectangular section
composed of discrete colors.

<CodeDemoLayout>

<LegendDiscreteSimple />

<CodeLayout>

```html
<vgg-discrete-legend
  :scale="'bins'"
  :h="120"
/>
```

</CodeLayout>

</CodeDemoLayout>

For gradient and discrete legends, either the `fill` or `fill-opacity` props may
be used to encode the domain given to `scale`. Applying transformations onto the
data fed to `scale`, such as `binning`, will alter the placement of ticks and
the progression of colors to match the transformations. The progression of the
colors for both legends is dictated by the spread of the tick values derived from `scale`.

`vgg-symbol-legend` maps `scale` to a series of symbols, which are based on
those available in the `symbol` mark. At least one of the `size`, `shape`,
`fill`, `stroke`, `stroke-width` `stroke-opacity`, or `fill-opacity` aesthetics
must be specified. All aesthetics used for this legend follow the same input
domain given to `scale`, but each aesthetic can have its own `range`.
Even if different domains are given per aesthetic, the legend will follow that which is given to `scale`.

<CodeDemoLayout>

<LegendSymbolSimple />

<CodeLayout>

```html
<vgg-symbol-legend
  :scale="'population'"
  :size="{ range: [2, 12] }"
  :h="140"
  :stroke="'none'"
  fill="#c66366"
  position="tr"
/>
```

</CodeLayout>

</CodeDemoLayout>

## Properties

### Legend values

| Prop   | Required | Regular types           | Default   | Description                                               |
| ------ | -------- | ----------------------- | --------- | --------------------------------------------------------- |
| scale  | true     | [Array, String, Object] | undefined | Domain of values visualized by the legend, can be variable name |
| orientation   | false    | String               | 'vertical'     | orientation of legend (vertical/horizontal)|
| flip   | false    | Boolean               | false     | flip order of legend labels; if true, shows decreasing order                        |
| flip-numbers   | false    | Boolean               | false     | flip placement of numbers and gradient section                        |
| nice   | false    | Boolean             | true   | rounds off labels (if numerical) to closest ones digit                        |

Note that any aspects to do with the `domain` mapped to the legend, such as
`domainMin`, `absolute`, etc., should be handled in `scale`. The input to `scale`
can be a String (the name of the column or a custom scale with the `#` tag) or
an object. When stating other aspects of `domain` such as `domainMin`, `domainMax`,
the input must be an object, and the target domain of the legend must be listed under `domain` in the object.

```js
:scale="'<data column name>'"

// OR

:scale="'#domainScale'"

// OR

:scale="{ domain: <data column name>, domainMin: <value>, domainMax: <value>, ... }"
```

On the other hand, `range`, `rangeMin`, etc. should be specified in the target
aesthetic's input when giving the output of said aesthetic, such as the `range`
of the `size` property in the symbol legend in the symbol legend example.

```js
:size="'#rangeScale'"

// OR

:size="{ range: [<value 1>, <value 2>, ...], rangeMin: <value>, rangeMax: <value>, ... }"
```

In general, the `scale` property in all three legends uses the same concepts and
attributes for `domain` and `range`, as discussed in
[Concepts > Scaling](../concepts/scaling.md). An example of using multiple `domain`
attributes and a custom range for `size` can be found below.

<CodeDemoLayout>

<LegendSymbolObject />

<CodeLayout>

```html
<vgg-symbol-legend
  :scale="{ domain: 'population', domainMin: 200 }"
  :size="{ range: [2, 12] }"
  :tick-count="5"
  stroke="#c66366"
  fill="#c66366"
  position="tr"
/>
```

</CodeLayout>

</CodeDemoLayout>

See [Usage](#usage) for more
examples on how to set inputs to `domain` and the legend's aesthetic properties.

### Legend Positioning

A legend component can take the following position properties. These take after [Marks > Rectangle](../marks/rectangle.md).

| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| x1   | depends  | [Number, String, Date] | undefined | Left x coordinate    | Local coordinates |
| x2   | depends  | [Number, String, Date] | undefined | Right x coordinate   | Local coordinates |
| y1   | depends  | [Number, String, Date] | undefined | Bottom y coordinate  | Local coordinates |
| y2   | depends  | [Number, String, Date] | undefined | Top y coordinate     | Local coordinates |
| x    | depends  | [Number, String, Date] | undefined | Central x coordinate | Local coordinates |
| y    | depends  | [Number, String, Date] | undefined | Central y coordinate | Local coordinates |
| w    | depends  | Number                 | undefined | Width                | Local coordinates |
| h    | depends  | Number                 | undefined | Height               | Local coordinates |
| position| false | String | 'left' | position of legend with respect to parent section | 'left', 'right', 'top', 'bottom', 'center', 'tl', 'tr', 'tc', 'bl', 'br', 'bc' |

#### Allowed combinations of positioning props

The positioning properties of the legend can only be used in certain combinations.

| Combination | Explanation    |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| `x1` + `x2` | `x1` refers to x-coordinate of the left side of the rectangle, `x2` refers to x-coordinate of the right side of the rectangle. |
| `x` + `w`   | `x` is the center of the rectangle in the x-dimension, `w` is the width. Here, `x1 = x - w / 2`, and `x2 = x + w / 2`.         |
| `x1` + `w`  | `x2 = x1 + w`|
| `x2` + `w`  | `x1 = x2 - w`|
| `y1` + `y2` | `y1` refers to y-coordinate of the bottom side of the rectangle, `y2` refers to y-coordinate of the top side of the rectangle. |
| `y` + `h`   | `y` is the center of the rectangle in the x-dimension, `h` is the width. Here, `y1 = y - h / 2`, and `y2 = y + h / 2`.         |
| `y1` + `h`  | `y2 = y1 + h`|
| `y2` + `h`  | `y1 = y2 - h`|

If left empty, then the default position of the x-axis is `position = 'left'`
(center leftmost of parent section).

### Other aesthetics

| Prop | Required | Types | Default   | Description                             | Unit(s)           |
| ---- | -------- | ----- | --------- | --------------------------------------- | ----------------- |
| h   | false | Number | If `vertical`, automatically computed according to  parent section height, title font size (screen pixels), and title padding (screen pixels); if `horizontal`, 10% of parent section height | height of legend section | Screen pixels |
| w   | false | Number | If `horizontal`, automatically computed according to  parent section width, title font size (screen pixels), and title padding (screen pixels); if `vertical`, 10% of parent section width   | width of legend section | Screen pixels |
| legend-stroke | false | String | none | stroke color surrounding legend section | Named color, hex, rgb, hsl |
| legend-fill | false | String | none | fill color of legend section | Named color, hex, rgb, hsl |
| legend-stroke-width | false    | Number | 0  | stroke width of rectangle surrounding legend section | Named color, hex, rgb, hsl |

`legend-stroke`, `legend-fill`, and `legend-stroke-width` are analogous to the
CSS properties of the same names and affect the body of the legend section that
surrounds the ticks, rectangular section, and title.

### Title

The title can be found at the top of the legend section. It is located outside
the bounding rectangle of the legend, should the legend section have `stroke`,
`fill`, or `strokeWidth` properties specified.

| Prop            | Required | Regular types    | Default     | Description                             | Unit(s)                    |
| --------------- | -------- | ---------------- | ----------- | --------------------------------------- | --------------------------|
| title           | false    | String         | ''          | text to render as legend title            |                           |
| title-anchor-point | false    | String         | 'center'    | baseline and alignment of title text    | left, right, top, bottom, tl, tr, bl, br, center                          |
| title-font     | false    | String         | 'Helvetica'     | font family of title                          | Named font |
| title-font-color      | false    | String         | 'black'     | color of title                          | Named color, hex, rgb, hsl |
| title-font-size   | false    | Number         | 16          | size of font used for legend title        | Screen pixels              |
| title-font-weight | false    | [String, Number] | 'normal'    | weight of font used for legend title      | Any valid css font weight  |
| title-opacity    | false    | Number         | 1           | opacity of title                        | Number between 0 and 1     |
| title-padding    | false    | Number         | 0           | space between title and legend labels + gradient section                     | Screen pixels     |

### Labels

These refer to the text beside the legend intervals. Note that if a `Function`
is passed to the `format` prop to format labels before rendering, the function
output must be of type `String`.

| Prop           | Required | Regular types      | Default     | Description                             | Unit(s)                    |
| -------------- | -------- | ------------------ | ----------- | --------------------------------------- | -------------------------- |
| format         | false    | [String, Function] | undefined   | formatting of legend labels, i.e. rounding off/down               |                            |
| label-color     | false    | String           | 'black'     | color of labels                         | Named color, hex, rgb, hsl |
| label-font      | false    | String           | 'Helvetica' | font used for legend labels               | Named font                 |
| label-font-size  | false    | Number           | 10          | size of font used for legend labels       | Screen pixels              |
| label-font-weight| false    | [String, Number]   | 'normal'    | weight of font used for legend labels     | Any valid css font weight  |
| label-opacity   | false    | Number           | 1           | opacity of labels                       | Number between 0 and 1     |
| label-rotate    | false    | Boolean          | false       | if true rotate labels                   | Degrees                   |
| label-padding    | false    | Number        | 0        | space between symbol and label | Number between 0 and 1 |

### Ticks

These properties control the number of ticks or labels, and the minimum interval
between the labels (unless they are `categorical` or `interval` data) of the legend. By default,
all three legend types have ten (10) ticks drawn.

If the data fed to the legend is `categorical` or `interval` and the number of ticks needs to be controlled, then
the values of the legend ticks to be shown must be specified as an `Array` in `tick-values`. Each value in the array given to `tick-values` must correspond to values in the domain derived from the input to `scale`.

| Prop           | Required | Regular types    | Default     | Description  | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ------------ | -------------------------- |
| tick-count          | false    | Object        | 10        | number of ticks/labels to render                         | Any integer greater than 0                           |
| tick-values          | false    | Array        | undefined        | actual tick values to render                         | Any integer greater than 0                           |
| tick-min-step          | false    | Object        | undefined        | minimum interval between ticks/labels                           | Any positive rational number                           |

## Events

Coming soon!

## Gradient and discrete legends

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| fill          | false    | [Object, Array]        | { type: 'blues '}        | color scale to which the gradient section/discrete colors is/are mapped | See [Scales > Color](../scales/color.md) |
| fill-opacity          | false    | [Number, Object, Array]        | 1        | fill opacity of color in `fill` | Number between 0 and 1 or `scale` |

The progression of the colors in the gradient/discrete colors section for `vgg-gradient-legend`/ `vgg-discrete-legend` is dictated by the spread of the legend's labels (as provided to `scale`).

For more information on how to construct `range` inputs to `fill` and `fillOpacity`, please refer to the documentation on `range` in [Concepts > Scaling](../concepts/scaling.md).

## Symbol legends

These properties can be mapped to show scaling based on the `scale` property,
with respect to a specific aesthetic of the symbol legend. The `shape` prop is
set to the default for the Symbol mark, `circle`.

| Prop           | Required | Regular types    | Default     | Description | Unit(s) |
| -------------- | -------- | ---------------- | ----------- | ----------- | ------- |
| fill          | false    | [Object, Array, String]        | { type: 'blues '}        |  symbol fill color | Named color, hex, rgb, hsl |
| fill-opacity          | false    | [Number, Object, Array]        | 1        | symbol fill opacity | Number between 0 and 1 |
| shape          | false    | [String, Array]        | circle        | symbol shape | See [Marks > Symbol](../marks/symbol.md); an additional shape value called `line` is also available for the symbol legend |
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

`shape`, aside from the options in `vgg-symbol`, accepts the input `'line'`.
This will generate a legend where the symbols are line segments. Only when `shape`
is set to 'line', will to input to `linecap` have any effect. When `shape = 'line'`,
use `stroke-opacity` and `stroke` to change the symbols' opacity and color, respectively.

`columns` or `rows` instructs the component to draw the legend as a grid with the
specified number of columns or rows.

For more information on how to construct `range` inputs to aesthetic properties,
see [Concepts > Scaling](../concepts/scaling.md).

## Usage

### Rendering

To render a legend, at bare minimum the `scale` prop must be provided. For discrete
and gradient legends, the default encoding is set to `fill`, using the `'blues'` color
scale. For `vgg-symbol-legend` specifically, the default shape is `circle`, with `stroke`
set to `'black'` and `fill` set to `'none'`.

<CodeDemoLayout>

<LegendBasic/>

<CodeLayout>
```html
<vgg-discrete-legend
  :scale="'bins'"
  :h="110"
  :w="50"
/>

<vgg-gradient-legend
  :scale="'bins'"
  position="center"
  :h="110"
  :w="50"
/>

<vgg-symbol-legend
  :scale="'binCount'"
  :fill="{ type: 'blues' }"
  stroke="none"
  :tickCount="6"
  position="right"
  :h="110"
  :w="50"
/>
```
</CodeLayout>

</CodeDemoLayout>

### Mappable aesthetics in discrete and gradient legends

Discrete and gradient legends support two combinations of encoding.

| Combination      | Explanation         |
|------------------|----------------------|
| `fill` as scale, `fillOpacity` as fixed value | Input to `fill` is an object, `fillOpacity` may be left unstated   |
| `fillOpacity` as scale, `fill` as fixed value | Input to `fillOpacity` is an object, `fill` must be specified as a color (rgb, hsl, hex value) |

#### `fill` as scale

When `fill` is set as the encoding, then `fillOpacity` does not need to be specified – the default `fillOpacity` is 1.

<CodeDemoLayout>

<LegendFill/>

<CodeLayout>
```html
<vgg-gradient-legend
  :scale="'bins'"
  :fill="'viridis'"
  :h="100"
  position="tl"
/>

<vgg-discrete-legend
  :scale="'bins'"
  :fill="{ type: 'viridis' }"
  position="bl"
/>
```
</CodeLayout>

</CodeDemoLayout>

#### `fillOpacity` as scale

When `fillOpacity` is set as the encoding, then `fill` must be set to a single color.

<CodeDemoLayout>

<LegendFillOpacity/>

<CodeLayout>
```html
<vgg-gradient-legend
  :scale="'bins'"
  fill="#c66366"
  :fill-opacity="{ domain: 'bins' }"
  position="tl"
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

An error will be thrown if both aesthetics are set to scales.

### Mappable aesthetics in symbol legends

Multiple encodings can be set in `vgg-symbol-gradient` simultaneously.
At least one encoding should be set, or else the legend will show up as a
series of circles with black strokes.

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

The symbol legend below makes use of a categorical color scale for `fill`
and a continuous scale for `size`. The type of `shape`/`fill` scheme to use
can specified with objects or arrays, i.e. `{ type: ... }` or `[ red, green, blue ]`.

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
  :size="{ range: [10, 15] }"
  title="Size"
  :title-font-size=12
  :title-padding="10"
  :w="350"
  :tick-count="5"
  position="bl"
  orientation="horizontal"
/>
```
:::
</CodeLayout>

</CodeDemoLayout>

This legend uses the `stroke-width`, `opacity` and `fill` properties to elaborate
on the values of the `trail` mark. Scales created using `vgg-scales` can be
called as input to `scale`. Custom ranges for the output of the legend aesthetics
can be set using objects or arrays (for categorical data), i.e. `{ range: ... }`
or `[ <value 1>, <value 2>, <value 3>]`.

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
  :x="150"
  :y="520"
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
  :x="150"
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
