---
title: Cartesian Axes
---

# Component tag

`<vgg-x-axis>`

`<vgg-y-axis>`

# Description

Axes are used as reference scales for values in the graph. Each axis is typically mapped to a single dimension or variable.

# Props

| Prop  | Required | Types                   | Default   | Description                         |
| ----- | -------- | ----------------------- | --------- | ----------------------------------- |
| scale | true     | [Array, String, Object] | undefined | Range of values covered by the axis |
| flip  | false    | Boolean                 | false     | Direction of tick and axis labels   |

The prop passed to the `scale` is a [scaling options](../concepts/scaling.md) prop.

### X Axis positioning

| Prop  | Required | Types            | Default                      | Description          | Unit(s)                                      |
| ----- | -------- | ---------------- | ---------------------------- | -------------------- | -------------------------------------------- |
| vjust | false    | [Number, String] | 'b'                          | Vertical position    | Number between 0 and 1, 'b', 't' or 'center' |
| h     | false    | Number           | 1/8 of parent Section height | Height               | Local coordinates                            |
| y1    | false    | Number           | undefined                    | Bottom y coordinate  | Local coordinates                            |
| y2    | false    | Number           | undefined                    | Top y coordinate     | Local coordinates                            |
| y     | false    | Number           | undefined                    | Central y coordinate | Local coordinates                            |

There are different methods for vertically positioning the x-axis on the graph.
The first is `vjust`. `vjust` can be specified as a String or as a Number.
By default, the position of the x-axis is `vjust = 'b'` (bottom), which
is the same as giving `vjust` the value 0. Other options are `'t'` (top) and
`'center'`, which are the same as respectively 1 and 0.5. These numbers refer to
the position within the parent Section component- again, 0 placing the axis at the
bottom, 0.5 in the middle, and 1 at the top of the parent Section.

By default, the height of the axis will be 1/8 of its parent Section's height.
Using the `'h'` prop, another value can be chosen.

<cartesian :show-x="true" />

The other method to vertically position the x-axis is to use some combination of
the `y1`, `y2`, `y`, and `h` props. When using these props, the axis behaves in
the same way as the [Rectangle](../marks/rectangle.md) mark.

| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| x1   | false    | [Number, String, Date] | undefined | Left x coordinate    | Local coordinates |
| x2   | false    | [Number, String, Date] | undefined | Right x coordinate   | Local coordinates |
| x    | false    | [Number, String, Date] | undefined | Central x coordinate | Local coordinates |
| w    | false    | Number                 | undefined | Width                | Local coordinates |

By default the x-axis spans the entire width of the section. To customize the width
 of the x-axis, it is possible to use `x1`, `x2`,
`x` and `w` as start and end coordinates. These props also behave in the same way
as the [Rectangle](../marks/rectangle.md) mark.


### Y Axis positioning

| Prop  | Required | Types            | Default                     | Description          | Unit(s)                                      |
| ----- | -------- | ---------------- | --------------------------- | -------------------- | -------------------------------------------- |
| hjust | false    | [Number, String] | 'l'                         | Horizontal position  | Number between 0 and 1, 'l', 'r' or 'center' |
| w     | false    | Number           | 1/8 of parent Section width | Width                | Local coordinates                            |
| x1    | false    | Number           | undefined                   | Left x coordinate    | Local coordinates                            |
| x2    | false    | Number           | undefined                   | Right x coordinate   | Local coordinates                            |
| x     | false    | Number           | undefined                   | Central x coordinate | Local coordinates                            |

There are different methods for vertically positioning the y-axis on the graph.
The first is `hjust`. `hjust` can be specified as a String or as a Number.
By default, the position of the y-axis is `hjust = 'l'` (left), which
is the same as giving `hjust` the value 0. Other options are `'r'` (right) and
`'center'`, which are the same as respectively 1 and 0.5. These numbers refer to
the position within the parent Section component- again, 0 placing the axis on the
left, 0.5 in the middle, and 1 on the right side of the parent Section.

By default, the width of the axis will be 1/8 of its parent Section's width.
Using the `'w'` prop, another value can be chosen.

<cartesian :show-y="true" />

The other method to horizontally position the y-axis is to use some combination of
the `x1`, `x2`, `x`, and `w` props. When using these props, the axis behaves in
the same way as the [Rectangle](../marks/rectangle.md) mark.

| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| y1   | false    | [Number, String, Date] | undefined | Bottom y coordinate  | Local coordinates |
| y2   | false    | [Number, String, Date] | undefined | Top y coordinate     | Local coordinates |
| y    | false    | [Number, String, Date] | undefined | Central y coordinate | Local coordinates |
| h    | false    | Number                 | undefined | Height               | Local coordinates |

By default the y-axis spans the entire width of the section. To customize the width
 of the y-axis, it is possible to use `y1`, `y2`,
`y` and `h` as start and end coordinates. These props also behave in the same way
as the [Rectangle](../marks/rectangle.md) mark.


### Main line

| Prop           | Required | Types   | Default | Description                   | Unit(s)                    |
| -------------- | -------- | ------- | ------- | ----------------------------- | -------------------------- |
| domain         | false    | Boolean | true    | If true render axis main line |                            |
| domain-color   | false    | String  | 'black' | Color of main line            | Named color, hex, rgb, hsl |
| domain-opacity | false    | Number  | 1       | Opacity of main line          | Number between 0 and 1     |
| domain-width   | false    | Number  | 1       | Stroke width of main line     | Screen pixels              |

### Labels

Note that if a `Function` is passed to the `format` prop to format labels before rendering, the function output must be of type `String`

| Prop              | Required | Types              | Default     | Description                         | Unit(s)                    |
| ----------------- | -------- | ------------------ | ----------- | ----------------------------------- | -------------------------- |
| labels            | false    | Boolean            | true        | If true render labels               |                            |
| format            | false    | [String, Function] | undefined   | Formatting of axis labels           |                            |
| label-color       | false    | String             | 'black'     | Color of labels                     | Named color, hex, rgb, hsl |
| label-font        | false    | String             | 'Helvetica' | Font used for axis labels           | Named font                 |
| label-font-size   | false    | Number             | 10          | Size of font used for axis labels   | Screen pixels              |
| label-font-weight | false    | [String, Number]   | 'normal'    | Weight of font used for axis labels | Any valid css font weight  |
| label-opacity     | false    | Number             | 1           | Opacity of labels                   | Number between 0 and 1     |
| label-rotate      | false    | Boolean            | false       | If true rotate labels               | Degrees                    |

### Ticks

| Prop         | Required | Types   | Default   | Description                                  | Unit(s)                    |
| ------------ | -------- | ------- | --------- | -------------------------------------------- | -------------------------- |
| ticks        | false    | Boolean | true      | If true render ticks                         |                            |
| tick-color   | false    | String  | 'black'   | Color of ticks                               | Named color, hex, rgb, hsl |
| tick-values  | false    | Array   | undefined | Custom tick positions                        |                            |
| tick-count   | false    | Number  | 10        | Number of ticks on the axis, equal intervals |                            |
| tick-extra   | false    | Boolean | true      | If true, render extra tick at axis origin    |                            |
| tick-opacity | false    | Number  | 1         | Opacity of ticks                             | Number between 0 and 1     |
| tick-size    | false    | Number  | 7         | Length of ticks                              | Screen pixels              |
| tick-width   | false    | Number  | 0.5       | Stroke width of ticks                        | Screen pixels              |

### Title

| Prop               | Required | Types            | Default     | Description                                                                                    | Unit(s)                    |
| ------------------ | -------- | ---------------- | ----------- | ---------------------------------------------------------------------------------------------- | -------------------------- |
| title-hjust        | false    | [String, Number] | depends     | Position of axis title relative to axis; default -0.08 for x-axis; default 'center' for y-axis | Number between 0 and 1     |
| title-vjust        | false    | [String, Number] | depends     | Position of axis title relative to axis; default 'center' for x-axis; default 1.05 for y-axis  | Number between 0 and 1     |
| title              | false    | String           | ''          | Text to render as axis title                                                                   |                            |
| title-anchor-point | false    | String           | 'center'    | Baseline and alignment of title text                                                           |                            |
| title-color        | false    | String           | 'black'     | Color of title                                                                                 | Named color, hex, rgb, hsl |
| title-font         | false    | String           | 'Helvetica' | Font used for axis title                                                                       | Named font                 |
| title-font-size    | false    | Number           | 12          | Size of font used for axis title                                                               | Screen pixels              |
| title-font-weight  | false    | [String, Number] | 'normal'    | Weight of font used for axis title                                                             | Any valid css font weight  |
| title-opacity      | false    | Number           | 1           | Opacity of title                                                                               | Number between 0 and 1     |

# Using the Section's axes prop

TODO
