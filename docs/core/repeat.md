---
title: 'Repeat'
---

# Component tag

`<vgg-repeat>`

# Description

The Repeat component is used to quickly position and align [Section](./section.md)
components in a 2d matrix format.

# Props

| Prop           | Required | Types            | Default   | Description                            |
| -------------- | -------- | ---------------- | --------- | -------------------------------------- |
| x              | depends  | Array            | undefined | Values corresponding to matrix columns |
| y              | depends  | Array            | undefined | Values corresponding to matrix rows    |
| layout-padding | false    | [Number, Object] | 0         | Padding with respect to parent element |
| cell-padding   | false    | [Number, Object] | 0         | Padding between child elements         |

The repeat component is useful for quickly creating a 2d matrix of Sections. This
is useful for creating, for example, a [scatterplot matrix](#scatterplot-matrix).

Either the `x` prop, `y` prop, or both the `x` and `y` props are required.
The `x` and `y` props take an Array of values. For every entry in the Array passed
to the `x` prop, one column will be rendered- the same for the `y` prop and rows.
Besides creating one Section for each matrix cell and positioning the Section (like
the [Grid](./grid.md) component), the Repeat component also exposes the values
that are in the Arrays passed to `x` and `y`.

The `layout-padding` and `cell-padding` props work exactly the same as props
of the same names used in the [Grid](./grid.md#props) component.

# Usage

### Scatterplot matrix

In this example, `someData` is a data structure with three columns of quantitative
data, called `a`, `b` and `c`.

::: v-pre
```html
<vgg-data :data="someData">

  <vgg-repeat
    v-slot="{ x, y }"
    :x="['a', 'b', 'c']"
    :y="['a', 'b', 'c']"
    :cell-padding="20"
  >

    <vgg-section>

      <vgg-map v-slot="{ row }">

        <vgg-point
          :x="{ val: row[x], scale: x }"
          :y="{ val: row[y], scale: y }"
          :fill="{ val: row[x], scale: x }"
        />

      </vgg-map>

    </vgg-section>

  </vgg-repeat>

</vgg-data>
```
:::

<scatterplot-matrix />
