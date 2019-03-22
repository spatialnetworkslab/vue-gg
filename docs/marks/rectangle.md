---
title: Rectangle Mark
---

# Component tag

`<vgg-rectangle>`

# Description

TODO

# Props

### Positioning

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

### Other aesthetics

| Prop           | Required | Types  | Default   | Description    | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| stroke         | false    | String | undefined | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | undefined | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | undefined | Stroke opacity | Number between 0 to 1      |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | undefined | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | undefined | Mark opacity   | Number between 0 and 1     |

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

There are a few caveats when positioning Rectangle marks. The Rectangle has four
props that can be used for positioning in the x-dimension: `x1`, `x2`, `x` and `w`.
This explanation is concerned with the x-dimension, but positioning works exactly the same
for the y-dimension- just substitute the four above-mentioned props with
`y1`, `y2`, `y` and `h`.

There are four allowed combinations of `x1`, `x2`, `x` and `w`:

1. just `x1` and `x2`
2. just `x` and `w`
3. just `x1` and `w`
4. just `x2` and `w`

The first option is straightforward: `x1` refers x-coordinate of the left side of the rectangle,
and `x2` to the x-coordinate of the right side of the triangle. When using any of the
other options, `vue-gg` will internally convert those to `x1` and `x2`, so we will
explain the other options by explaining what they will be converted to internally.

The second option uses `x`, which is the center of the rectangle in the x-dimension,
and `w`, the width. Here, `x1 = x - w / 2`, and `y2 = x + w / 2`. The third option is
using `x1` and `w`, where `x2 = x1 + w`. For the last option, `x1 = x2 - w`.

Finally, there is one caveat related to `w` (and `h`). `x1`, `x2` and `x` can
be specified in the parent Section's coordinate system, even if those coordinates are
categorical or temporal. `w`, however, does not take categorical or temporal data.
Instead, the coordinate system of the first parent component that has a quantitative
coordinate system will be used. So,

::: v-pre
```html{14}
<vgg-graphic :width="500" :height="500">

  <vgg-section
    :x1="50"
    :x2="450"
    :y1="50"
    :y2="450"
    :scale-x="['a', 'b', 'c', 'd']"
    :scale-y="[0, 100]"
  >

    <vgg-rectangle
      :x="'b'"
      :w="100"
      :y1="20"
      :y2="80"
    />

  </vgg-section>

</vgg-graphic>
```
:::

the `:w` value of `100` here is in the coordinate system of the `vgg-graphic`,
which is the first parent that has a quantitative coordinate system.

# Example
