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

### Positioning

| Prop | Required | Regular types    | Default   | Description                             |
| ---- | -------- | ---------------- | --------- | --------------------------------------- |
| hjust| false    | [Number, String] | 'l'       | horizontal position of title            |
| vjust| false    | [Number, String] | 'b'       | vertical position of title              |

### Main Line

| Prop           | Required | Regular types    | Default   | Description                             |
| -------------- | -------- | ---------------- | --------- | --------------------------------------- |
| domain         | false    | [Boolean]        | true      | if true render axis main line           |
| domainColor    | false    | [String]         | 'black'   | color of main line                      |
| domainOpacity  | false    | [Number]         | 1         | opacity of main line                    |
| domainWidth    | false    | [Number]         | 1         | stroke width of main line               |

### Labels

| Prop           | Required | Regular types      | Default     | Description                             |
| -------------- | -------- | ------------------ | ----------- | --------------------------------------- |
| labels         | false    | [Boolean]          | true        | if true render labels                   |
| format         | false    | [String, Function] | undefined | formatting of axis labels                 |
| labelColor     | false    | [String]           | 'black'     | color of labels                         |
| labelFont      | false    | [String]           | 'Helvetica' | font used for axis labels               |
| labelFontSize  | false    | [Number]           | 10          | size of font used for axis labels       |
| labelFontWeight| false    | [String, Number]   | 'normal'    | weight of font used for axis labels     |
| labelOpacity   | false    | [Number]           | 1           | opacity of labels                       |
| labelRotate    | false    | [Boolean]          | false       | if true rotate labels                   |

### Ticks

| Prop           | Required | Regular types    | Default     | Description                                    |
| -------------- | -------- | ---------------- | ----------- | ---------------------------------------------- |
| ticks          | false    | [Boolean]        | true        | if true render ticks                           |
| tickColor      | false    | [String]         | 'black'     | color of ticks                                 |
| tickValues     | false    | [Array]          | undefined   | custom tick positions                          |
| tickCount      | false    | [Number]         | 10          | number of ticks on the axis, equal intervals   |
| tickExtra      | false    | [Boolean]        | true        | if true, render extra tick at axis origin      |
| tickOpacity    | false    | [Number]         | 1           | opacity of ticks                               |
| tickSize       | false    | [Number]         | 7           | length of ticks                                |
| tickWidth      | false    | [Number]         | 0.5         | stroke width of ticks                          |

### Title

| Prop            | Required | Regular types    | Default     | Description                             |
| --------------- | -------- | ---------------- | ----------- | --------------------------------------- |
| titleHjust      | false    | [String, Number] | depends     | position of axis title relative to axis; default -0.08 for x-axis; default 'center' for y-axis |
| titleVjust      | false    | [String, Number] | depends     | position of axis title relative to axis; default 'center' for x-axis; default 1.05 for y-axis  |
| title           | false    | [String]         | ''          | text to render as axis title            |
| titleAnchorPoint| false    | [String]         | 'center'    | baseline and alignment of title text    |
| titleColor      | false    | [String]         | 'black'     | color of title                          |
| titleFont       | false    | [String]         | 'Helvetica' | font used for axis title                |
| titleFontSize   | false    | [Number]         | 12          | size of font used for axis title        |
| titleFontWeight | false    | [String, Number] | 'normal'    | weight of font used for axis title      |
| titleOpacity    | false    | [Number]         | 1           | opacity of title                        |
