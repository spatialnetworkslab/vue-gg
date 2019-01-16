---
title: Section
---

# Component tag

`<vgg-section>`

# Description

The Section is one of the corner stones of `vue-gg`. Sections have many different
purposes, such as:

- Defining a local coordinate system
- Indicating the ranges to which coordinates can be mapped
- Providing an entry point for new data
- Creating compositions of shapes that can be mapped to data

All of these will be discussed below, under [Usage](#usage)

# Props

### Positioning

| Prop | Required | Regular types          | Types when mapping                       | Default   | Description          | Unit(s)             |
| ---- | -------- | ---------------------- | ---------------------------------------- | --------- | -------------------- | ------------------- |
| x1   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Left x coordinate    | Local coordinate(s) |
| x2   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Right x coordinate   | Local coordinate(s) |
| y1   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Bottom y coordinate  | Local coordinate(s) |
| y2   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Top y coordinate     | Local coordinate(s) |
| x    | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Central x coordinate | Local coordinate(s) |
| y    | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Central y coordinate | Local coordinate(s) |
| w    | depends  | Number                 | [Number, Object, Function]               | undefined | Width                | Local coordinate(s) |
| h    | depends  | Number                 | [Number, Object, Function]               | undefined | Height               | Local coordinate(s) |

### Other props

| Prop | Required | Regular types   | Types when mapping        | Default   | Description                   |
| ---- | -------- | --------------- | ------------------------- | --------- | ----------------------------- |
| data | false    | [Array, Object] | [Function, Array, Object] | undefined | Some supported data structure |

| Prop      | Required | Types                     | Default   | Description                     |
| --------- | -------- | ------------------------- | --------- | ------------------------------- |
| type      | false    | String                    | 'scale'   | Type of local coordinate system |
| scales    | false    | Object                    | undefined | Scaling of x and y dimensions   |
| data      | false    | [Function, Array, Object] | undefined | Some supported data structure   |
| format    | false    | String                    | undefined | Format of data structure        |
| transform | false    | [Array, Object]           | undefined | Transformation(s) to be applied |

# Usage

### Positioning

Positioning the Section component works exactly the same way as positioning the
Rectangle mark. See the [documentation for the Rectangle mark](../marks/rectangle.md)
for an in-depth explanation.

### Defining a local coordinate system

Perhaps the most powerful feature of the Section is its ability to define local
coordinate systems. Especially with complicated or nested graphics, it can become
tricky to keep track of what coordinates things have relative to each other.
The Section, with its local coordinate systems, simplifies this problem somewhat.

For example: let's say we want to plot the domain -1 < x < 1 for the function
f(x) = x ** 2, on a graphic of 500 by 500 pixels, with a 50 pixel margin. Using
the Section's local coordinate system, this is as easy as writing:

::: v-pre
```html
<vgg-graphic
  :width="500"
  :height="500"
/>

  <vgg-section
    :x1="50"
    :x2="450"
    :y1="50"
    :y2="450"
    :scales="{
      x: [-1, 1]
      y: [-1, 1]
    }"
  >

    <vgg-line
      :func="x => x ** 2"
      :stroke-width="3"
      stroke="#8b0000"
    />

</vgg-section>

</vgg-graphic>
```
:::

The `scales` prop takes an object that has a `x` and a `y` property. These properties
are optional- it is allowed to only specify `x`, or leave out the `scales` prop
altogether. If the `x` scaling is not specified explicitly, it will default to
whatever values constitute the left and right borders of the section (in this case:
`[50, 450]`). Same for the `y` scaling.

The `x` and `y` scaling options can be specified in a number of ways.
