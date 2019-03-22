---
title: Point mark
---

# Component tag

`<vgg-point>`

# Description

The most basic mark in `vue-gg`: the Point.

# Props

### Positioning

| Prop | Required | Types                  | Default   | Description                     | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | ------------------------------- | ----------------- |
| x    | true     | [Number, String, Date] | undefined | x-coordinate of center of point | Local coordinates |
| y    | true     | [Number, String, Date] | undefined | y-coordinate of center of point | Local coordinates |

### Other aesthetics

| Prop           | Required | Types  | Default   | Description    | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| radius         | false    | Number | 3         | Radius length  | Screen pixel               |
| stroke         | false    | String | 'none'    | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | 0         | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | 1         | Stroke opacity | Number between 0 and 1     |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | 1         | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | 1         | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other props

| Prop       | Required | Types  | Default | Description                                                   |
| ---------- | -------- | ------ | ------- | ------------------------------------------------------------- |
| transition | false    | Number | 0       | Time taken to animate changes to each point when data changes |

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

To render the Point mark, you will need to provide the `x` and `y` props.
These can be of type `Number`, `String` and `Date`, depending what kind of domain type
the parent Section has.

# Example

TODO
