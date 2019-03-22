---
title: Line mark
---

# Line Mark

`<vgg-line>`

## Description

A simple line mark component that takes either two coordinates or a function f(x). Besides drawing a line, it can also be used as a rule mark.

<div style="display:flex;align-items: center;">
 <lines-example style="flex:1;"/>
<div style="width:40%;flex:1">

```vue
...
<vgg-line
    :x1="-1"
    :x2="1"
    :y1="-1"
    :y2="1"
    stroke="green"
/>
<vgg-line :func="x => x ** 2" 
          stroke="blue" />
...
```

</div>

</div>

## Properties

### Positioning

| Prop | Required | Types                  | Default   | Description                       | Unit(s)              |
| ---- | -------- | ---------------------- | --------- | --------------------------------- | -------------------- |
| x1   | depends  | [Number, String, Date] | undefined | x-coordinate of beginning of line | Local coordinates    |
| y1   | depends  | [Number, String, Date] | undefined | y-coordinate of beginning of line | Local coordinates    |
| x2   | depends  | [Number, String, Date] | undefined | x-coordinate of end of line       | Local coordinates    |
| y2   | depends  | [Number, String, Date] | undefined | y-coordinate of end of line       | Local coordinates    |
| func | depends  | Function               | undefined | Function used to draw line        | y as a function of x |

### Allowed combinations of positioning props
The positing properties of the Line mark can only be used in certain combinations.

| Combination | Explanation                     |
| ----------- | ------------------------------- |
| x1+x2+y1+y2 | Two coordinates (x1,y1),(x2,y2) |
| func        | A function f(x)                 |

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

# Events

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

# Usage

### Positioning

There are two main ways of drawing a `vgg-line`: by using `x1`, `y1`, `x2` and `y2`,
or by using `func`. When using the former method, all `x1`, `y1`, `x2` and `y2`
are required. When using `func`, no other prop is required. See [Example](#example)
for an example of both.

# Example

<LinesExampleAdvanced/>