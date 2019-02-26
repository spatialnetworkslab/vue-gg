---
title: Cartesian Axes
---

# Component tag

`<vgg-x-axis>`

`<vgg-y-axis>`

# Description

Axes are used as reference scales for values in the graph. Each axis is typically mapped to a single dimension or variable.

# Props

| Prop   | Required | Regular types           | Default   | Description                                               |
| ------ | -------- | ----------------------- | --------- | --------------------------------------------------------- |
| scale  | true     | [Array, String, Object] | undefined | range of values covered by the axis, can be variable name |
| flip   | false    | [Boolean]               | false     | direction of tick and axis labels                         |

### X Axis Positioning

There are three options for positioning the x axis on the graph. The default position of the x-axis is at `vjust = 'b'` (bottom of parent section).

When using `vjust`, the x axis defaults to a height of 100px in screen coordinates.

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)                |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | ---------------------- |
| vjust| false    | [Number, String] | 'b'       | position of x axis                      | Number between 0 and 1 |
| y    | false    | [Number]         | undefined | position of x axis                      | Local Coordinates      |
| h    | false    | [Number]         | undefined | height of x axis                        | Local Coordinates      |
| y1   | false    | [Number]         | undefined | starting y coordinate of x axis         | Local Coordinates      |
| y2   | false    | [Number]         | undefined | ending y coordinate of x axis           | Local Coordinates      |

By default the x axis spans the entire width of the section. To customize the width of the x axis, it is possible to provide `x1` and `x2` as start and end coordinates.

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)               |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | --------------------- |
| x1   | false    | [Number]         | undefined | starting x coordinate of x axis         | Local Coordinates     |
| x2   | false    | [Number]         | undefined | ending x coordinate of x axis           | Local Coordinates     |

<cartesian :showX="true" />

### Y Axis Positioning

Similar to the x axis, there are three options for positioning the y axis on the graph. The default position of the y-axis is at `hjust = 'l'` (left of parent section).

When using `hjust`, the y axis defaults to a width of 100px in screen coordinates.

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)                |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | ---------------------- |
| hjust| false    | [Number, String] | 'l'       | position of y axis                      | Number between 0 and 1 |
| x    | false    | [Number]         | undefined | position of y axis                      | Local Coordinates      |
| w    | false    | [Number]         | undefined | width of y axis                         | Local Coordinates      |
| x1   | false    | [Number]         | undefined | starting x coordinate of y axis         | Local Coordinates      |
| x2   | false    | [Number]         | undefined | ending x coordinate of y axis           | Local Coordinates      |

By default the y axis spans the entire height of the section. To customize the height of the y axis, it is possible to provide `y1` and `y2` as start and end coordinates.

| Prop | Required | Regular types    | Default   | Description                             | Unit(s)               |
| ---- | -------- | ---------------- | --------- | --------------------------------------- | --------------------- |
| y1   | false    | [Number]         | undefined | starting y coordinate of y axis         | Local Coordinates     |
| y2   | false    | [Number]         | undefined | ending y coordinate of y axis           | Local Coordinates     |

<cartesian :showY="true" />

### Main Line

| Prop           | Required | Regular types    | Default   | Description                             | Unit(s)                    |
| -------------- | -------- | ---------------- | --------- | --------------------------------------- | -------------------------- |
| domain         | false    | [Boolean]        | true      | if true render axis main line           |                            |
| domainColor    | false    | [String]         | 'black'   | color of main line                      | Named color, hex, rgb, hsl |
| domainOpacity  | false    | [Number]         | 1         | opacity of main line                    | Number between 0 and 1     |
| domainWidth    | false    | [Number]         | 1         | stroke width of main line               | Screen pixels              |

### Labels

Note that if a `Function` is passed to the `format` prop to format labels before rendering, the function output must be of type `String`

| Prop           | Required | Regular types      | Default     | Description                             | Unit(s)                    |
| -------------- | -------- | ------------------ | ----------- | --------------------------------------- | -------------------------- |
| labels         | false    | [Boolean]          | true        | if true render labels                   |                            |
| format         | false    | [String, Function] | undefined   | formatting of axis labels               |                            |
| labelColor     | false    | [String]           | 'black'     | color of labels                         | Named color, hex, rgb, hsl |
| labelFont      | false    | [String]           | 'Helvetica' | font used for axis labels               | Named font                 |
| labelFontSize  | false    | [Number]           | 10          | size of font used for axis labels       | Screen pixels              |
| labelFontWeight| false    | [String, Number]   | 'normal'    | weight of font used for axis labels     | Any valid css font weight  |
| labelOpacity   | false    | [Number]           | 1           | opacity of labels                       | Number between 0 and 1     |
| labelRotate    | false    | [Boolean]          | false       | if true rotate labels                   | Degrees                    |

### Ticks

| Prop           | Required | Regular types    | Default     | Description                                    | Unit(s)                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- | -------------------------- |
| ticks          | false    | [Boolean]        | true        | if true render ticks                           |                            |
| tickColor      | false    | [String]         | 'black'     | color of ticks                                 | Named color, hex, rgb, hsl |
| tickValues     | false    | [Array]          | undefined   | custom tick positions                          |                            |
| tickCount      | false    | [Number]         | 10          | number of ticks on the axis, equal intervals   |                            |
| tickExtra      | false    | [Boolean]        | true        | if true, render extra tick at axis origin      |                            |
| tickOpacity    | false    | [Number]         | 1           | opacity of ticks                               | Number between 0 and 1     |
| tickSize       | false    | [Number]         | 7           | length of ticks                                | Screen pixels              |
| tickWidth      | false    | [Number]         | 0.5         | stroke width of ticks                          | Screen pixels              |

### Title

| Prop            | Required | Regular types    | Default     | Description                             | Unit(s)                    |
| --------------- | -------- | ---------------- | ----------- | --------------------------------------- | -------------------------- |
| titleHjust      | false    | [String, Number] | depends     | position of axis title relative to axis; default -0.08 for x-axis; default 'center' for y-axis | Number between 0 and 1     |
| titleVjust      | false    | [String, Number] | depends     | position of axis title relative to axis; default 'center' for x-axis; default 1.05 for y-axis  | Number between 0 and 1     |
| title           | false    | [String]         | ''          | text to render as axis title            |                            |
| titleAnchorPoint| false    | [String]         | 'center'    | baseline and alignment of title text    |                            |
| titleColor      | false    | [String]         | 'black'     | color of title                          | Named color, hex, rgb, hsl |
| titleFont       | false    | [String]         | 'Helvetica' | font used for axis title                | Named font                 |
| titleFontSize   | false    | [Number]         | 12          | size of font used for axis title        | Screen pixels              |
| titleFontWeight | false    | [String, Number] | 'normal'    | weight of font used for axis title      | Any valid css font weight  |
| titleOpacity    | false    | [Number]         | 1           | opacity of title                        | Number between 0 and 1     |