---
title: 'Map'
---

# Component tag

`<vgg-map>`

# Description

The Map component is used to tap into the local [data scope](../concepts/data-loading.md#data-scope)
and render one of each of its direct child components for each row in the dataset.
In this sense, it is similar to using `v-for`. But it has some advantages over
using `v-for`:

1. The Map component has access to the domains of the data within the data scope
in which it is located. It also has access to the extents of the coordinate system
in which it is located. With this information, it can easily calculate appropriate
coordinates for its child components.

2. It enables a concice syntax on its child components that can be used to quickly
map data values to aesthetic values- for example, categories to colors.

# Props

| Prop | Required | Types  | Default | Description                                                              |
| ---- | -------- | ------ | ------- | ------------------------------------------------------------------------ |
| unit | false    | String | row     | What to loop over- by default rows, but can also be set to `'dataframe'` |

For more information on how to use the `unit` prop, see
[Mapping an entire dataframe](#mapping-an-entire-dataframe).

# Usage

### Mappable components and props

The Map component can only be used to map mappable components.
Mappable components are all Marks, all Glyphs, all Guides, and the
[Section](./section.md) component.

When placed within `vgg-map` tags, the [mapping object](#the-mapping-object)
syntax will be enabled on all mappable props of the mappable components.
While many mappable props will work in similar ways, there are some differences
based on what type of prop is being mapped. For example, some props allow you to
use `position`ers, others `scale`s, and others just `get`ters. Make sure
to check the documentation of the components you want to map to, to see
which syntaxes are allowed for which types of props.

### The mapping object

```js
{
  get: ...,
  scale: ...,
  position: ...,
  scaleGeo: ...
}
```

| Property | Types                   | Description                                              |
| -------- | ----------------------- | -------------------------------------------------------- |
| get      | [String, Function]      | Column name or getter function to access data in row     |
| scale    | [String, Array, Object] | Column name, domain boundaries or scaling options object |
| position | [String, Object]        | Name of positioner, or positioner options object         |
| scaleGeo | Object                  | Options object for scaling geographic coordinates        |

In any case where `scale` or `scaleGeo` is used, `get` must also be specified.
`get` can also be used alone, as the examples below will illustrate. `position`
is currently only used alone, but this might change in the future once more
positioners are implemented. For more information, see the
[scaling](../concepts/scaling.md) and [positioning](../concepts/positioning.md)
documentation.

### Basic example using `get` and `scale`

One way to create a scatterplot using some dummy data and the Map component is
using the mapping object syntax with both `get` and `scale`:

::: v-pre
```html{14-16}
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
      :x="{ get: 'a', scale: 'a' }"
      :y="{ get: 'a', scale: 'b' }"
      :fill="{ get: 'c', scale: 'c' }"
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
`fill` of the `vgg-point` Mark in two steps: first, `get` extracts the value
from the row in the dataset, and then this value will be fed through the scaling
function generated in step 3.

### `get`: String vs Function

The `get` property of the mapping object can be specified as either a String or
a Function. In most cases using a String will suffice, but when working with nested
data structures, using the Function can be handy. Under the hood, the String
referencing a column name will be compiled to a function. So
`{ get: 'something' }` simply becomes `{ get: row => row['something'] }`.

### When to use `scale`

Sometimes, the data in a column will already be in the right format, and scaling
won't be necessary. This is the case when you have, for example, a column of
colors, and you just want to use the color directly. In this situation, you will
want to use `get`, but not `scale`. To return to the previous example:

::: v-pre
```html{7,16}
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
      :x="{ get: 'a', scale: 'a' }"
      :y="{ get: 'b', scale: 'b' }"
      :fill="{ get: 'x' }"
    />

  </vgg-map>

</vgg-graphic>
```
:::

Leaving out `scale` is common when working with the Section component.
The Section component allows you to specify a local coordinate system. This
coordinate system can be defined as the domains of the columns in your dataset. See
the [documentation of the Section component](./section.md) for more information on this topic.
To create the same scatterplot again, but using the local Section coordinate
system:

::: v-pre
```html{16-19,25-26}
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
    :scale-x="'a'"
    :scale-y="'b'"
  >

    <vgg-map>

      <vgg-point
        :x="{ get: 'a' }"
        :y="{ get: 'b' }"
        :fill="{ get: 'c', scale: 'c' }"
      />

    </vgg-map>

  </vgg-section>

</vgg-graphic>
```
:::

### Using `position`

TODO

### Using `scaleGeo`

TODO

### Mapping an entire dataframe

In the examples above, `vgg-map` maps one row in the dataframe to one mark:
the `vgg-point`. But for many other graphics, like line graphs, the 'one mark per
row' relation does not hold. Where with the `vgg-point` mark you just give one value
to the `:x` prop, the `vgg-multi-line` expects a whole column of values. So,
to draw a single `vgg-multi-line` with the data used in the examples above,
we need to map an entire dataframe to a single mark:

::: v-pre
```
<vgg-data :data="{ a: [1, 2, 5, 3, 4], b: [2, 7, 9, 10, 9], }">

  <vgg-map unit="dataframe">

    <vgg-multi-line
      :x="{ get: frame => frame.a, scale: 'a' }"
      :y="{ get: frame => frame.b, scale: 'b' }"
    />

  </vgg-map>

</vgg-data>
```
:::
