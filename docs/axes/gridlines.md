---
title: Gridlines
---

# Component tag

`<vgg-x-grid>`

`<vgg-y-grid>`

# Description

Not to be confused with the [Grid](../core/grid.md) component, the Gridlines
components `x-grid` and `y-grid` are used to draw lines through [Section](../core/section.md)s,
which, in combination with the [axes](./cartesian.md) components, can improve
the intelligibility of data scaled in the x or y dimensions.

# Props

| Prop            | Required | Types                   | Default   | Description                                  |
| --------------- | -------- | ----------------------- | --------- | -------------------------------------------- |
| scale           | true     | [Array, String, Object] | undefined | Range of values covered by the gridlines     |
| grid-lines      | false    | Array                   | undefined | Custom gridline positions                    |
| grid-line-count | false    | Number                  | 10        | Number of ticks on the axis, equal intervals |

The prop passed to the `scale` is a [scaling options](../concepts/scaling.md) prop.

### Grid positioning

The gridline components will be automatically positioned to span the entire parent
Section:

::: v-pre
```html
<vgg-section
  :x1="50"
  :x2="450"
  :y1="50"
  :y2="450"
>

  <vgg-x-grid :scale="[0, 5]" />
  <vgg-y-grid :scale="[0, 5]" />

</vgg-section>
```
:::

<grid-lines-example />

If for whatever reason you want to manually position them instead, you can use
the following props. In that case, the gridlines components behave in
the same way as the [Rectangle](../marks/rectangle.md) mark.

| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| x1   | false    | [Number, String, Date] | undefined | Left x coordinate    | Local coordinates |
| x2   | false    | [Number, String, Date] | undefined | Right x coordinate   | Local coordinates |
| x    | false    | [Number, String, Date] | undefined | Central x coordinate | Local coordinates |
| w    | false    | Number                 | undefined | Width                | Local coordinates |
| y1   | false    | [Number, String, Date] | undefined | Bottom y coordinate  | Local coordinates |
| y2   | false    | [Number, String, Date] | undefined | Top y coordinate     | Local coordinates |
| y    | false    | [Number, String, Date] | undefined | Central y coordinate | Local coordinates |
| h    | false    | Number                 | undefined | Height               | Local coordinates |

# Using the Section's gridLines prop

Gridlines can also be specified by using a prop on the Section component-
see the Section [props documentation](../core/section.md#axes-and-gridlines).
