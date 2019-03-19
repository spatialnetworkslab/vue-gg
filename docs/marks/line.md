---
title: Line mark
---

# Component tag

`<vgg-line>`

# Description

TODO

# Props

### Positioning

| Prop   | Required | Types                  | Default   | Description                       | Unit(s)              |
| ------ | -------- | ---------------------- | --------- | --------------------------------- | -------------------- |
| x1     | depends  | [Number, String, Date] | undefined | x-coordinate of beginning of line | Local coordinates    |
| y1     | depends  | [Number, String, Date] | undefined | y-coordinate of beginning of line | Local coordinates    |
| x2     | depends  | [Number, String, Date] | undefined | x-coordinate of end of line       | Local coordinates    |
| y2     | depends  | [Number, String, Date] | undefined | y-coordinate of end of line       | Local coordinates    |
| func   | depends  | Function               | undefined | Function used to draw line        | y as a function of x |

### Other aesthetics

| Prop           | Required | Types  | Default   | Description             | Unit(s)                    |
| -------------- | -------- | ------ | --------- | ----------------------- | -------------------------- |
| stroke         | false    | String | '#000000' | Stroke color            | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | 2         | Stroke width            | Screen pixels              |
| stroke-opacity | false    | Number | 1         | Stroke opacity          | Number between 0 and 1     |
| fill           | false    | String | 'none'    | Fill color (under line) | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | 1         | Fill opacity            | Number between 0 and 1     |
| opacity        | false    | Number | 1         | Mark opacity            | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other props

| Prop        | Required | Types   | Default   | Description                                                              |
| ----------- | -------- | ------- | --------- | ------------------------------------------------------------------------ |
| interpolate | false    | Boolean | undefined | Interpolate between points (when using non-cartesian coordinate systems) | 
| transition  | false    | Number  | 0         | Time taken to animate changes to each line when data changes             |

# Usage

### Positioning

There are two main ways of drawing a `vgg-line`: by using `x1`, `y1`, `x2` and `y2`,
or by using `func`. When using the former method, all `x1`, `y1`, `x2` and `y2`
are required. When using `func`, no other prop is required. See [Example](#example)
for an example of both.

# Events

# Example

::: v-pre
```html
<vgg-graphic
  :width="300"
  :height="300"
>

  <vgg-section
    :x1="25"
    :x2="275"
    :y1="25"
    :y2="275"
    :scale-x="[-1, 1]"
    :scale-y="[-1, 1]"
  >

    <vgg-line
      :x1="-1"
      :x2="1"
      :y1="-1"
      :y2="1"
      stroke="green"
    />

    <vgg-line :func="x => x ** 2" stroke="blue" />

    <vgg-x-axis :scale="[-1, 1]" :vjust="0.5" />
    <vgg-y-axis :scale="[-1, 1]" :hjust="0.5" />

  </vgg-section>

</vgg-graphic>
```
:::

<lines-example />
