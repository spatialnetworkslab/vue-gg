---
title: 'Map component'
---

# Component tag

`<vgg-map>`

# Description

The Map component is used to tap into the local data scope and render one
of each of its direct child components for each row in the dataset. In this sense,
it is similar to using `v-for`. But it has some advantages over using `v-for`:

1. The Map component has access to the domains of the data within the data scope
in which it is located. It also has access to the extents of the coordinate system
in which it is located. With this information, it can easily calculate appropriate
coordinates for its child components.

2. It enables a concice syntax on its child components that can be used to quickly
map data values to aesthetic values- for example, categories to colors.

# Usage

### The mapping-object

One way to create a scatterplot using some dummy data and the Map component is
using the 'mapping object' syntax:

::: v-pre
```html{15-17}
<vgg-graphic
  :width="500"
  :height="500"
  :data="{
    a: [1, 2, 5, 3, 4],
    b: [2, 7, 9, 10, 9],
    c: ['apple', 'apple', 'banana', 'banana', 'apple']
  }"
>

  <vgg-map>

    <vgg-point
      :x="{ scale: 'a' }"
      :y="{ scale: 'b' }"
      :fill="{ scale: 'c' }"
    />

  </vgg-map>

</vgg-graphic>
```
:::

Under the hood, the following is happening:

1. The domains for the data in the columns `a`, `b` and `c` are calculated.
These are respectively `[1, 5]`, `[2, 10]` and `['apple', 'banana']`. When the data is in
string format (or is 'categorical', in statistical terminology), the domain will
be an array of all the unique values.

2. The extents or 'ranges' of the local coordinate system are determined. In this
case, the range of the x-dimension is `[0, 500]`, and the range of the y-dimension
is `[0, 500]` too.

3. Using this information, three scaling functions are generated: one to scale
the data in column `a` to the coordinates in the x-dimension, one to scale the
data in column `b` to the coordinates in the y-dimension, and one to map the
data in column `c` to a set of colors.

4. The values in the columns `a`, `b` and `c` are mapped to the props `x`, `y` and
`fill` of the `vgg-point` Mark using these scaling functions.

### The getter function

Sometimes, the data in a column will already be in the right format, and scaling
won't be necessary. This is the case when you have, for example, a column of
colors, and you just want to use the color directly. In this situation, you will
want to use a getter function. To return to the previous example:

::: v-pre
```html{7, 17}
<vgg-graphic
  :width="500"
  :height="500"
  :data="{
    a: [1, 2, 5, 3, 4],
    b: [2, 7, 9, 10, 9],
    c: ['red', 'red', 'blue', 'blue', 'red']
  }"
>

  <vgg-map>

    <vgg-point
      :x="{ scale: 'a' }"
      :y="{ scale: 'b' }"
      :fill="row => row.c"
    />

  </vgg-map>

</vgg-graphic>
```
:::

Getter functions are used extensively in combination with the Section component.
The Section component allows you to specify a local coordinate system. This
coordinate system can be defined as the domains of columns in you dataset. See
the documentation of the Section component for more information on this topic.
To create the same scatterplot again, but using the local Section coordinate
system:

::: v-pre
```html{16-19, 25-26}
<vgg-graphic
  :width="500"
  :height="500"
  :data="{
    a: [1, 2, 5, 3, 4],
    b: [2, 7, 9, 10, 9],
    c: ['apple', 'apple', 'banana', 'banana', 'apple']
  }"
>

  <vgg-section
    :x1="0"
    :x2="500"
    :y1="0"
    :y2="500"
    :scales="{
      x: 'a',
      y: 'b'
    }"
  >

    <vgg-map>

      <vgg-point
        :x="row => row.x"
        :y="row => row.y"
        :fill="{ scale: 'c' }"
      />

    </vgg-map>

  </vgg-section>

</vgg-graphic>
```
:::