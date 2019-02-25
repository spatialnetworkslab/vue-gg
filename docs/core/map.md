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

2. It enables a concise syntax on its child components that can be used to quickly
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
  val: ...,
  band: ...,
  scale: ...,
  scaleGeo: ...
}
```

| Property | Types                                 | Description                                              |
| -------- | ------------------------------------- | -------------------------------------------------------- |
| val      | [Number, String, Date, Object, Array] | Anything that could be passed to a prop directly         |
| band     | [String, Array, Object]               | Column name, domain boundaries or scaling options object |
| scale    | [String, Array, Object]               | Column name, domain boundaries or scaling options object |
| scaleGeo | Object                                | Options object for scaling geographic coordinates        |

In any case where `scale` or `scaleGeo` is used, `val` must also be specified.
`val` can also be used alone, as the examples below will illustrate. `band`
is used to calculate widths and heights and can only be used in `w` and `h` props.
For more information, see the [scaling](../concepts/scaling.md) documentation.

### Basic example using `val` and `scale`

One way to create a scatterplot using some dummy data and the Map component is
using the mapping object syntax with both `val` and `scale`:

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

  <vgg-map v-slot="{ row }">

    <vgg-point
      :x="{ val: row.a, scale: 'a' }"
      :y="{ val: row.b, scale: 'b' }"
      :fill="{ val: row.c, scale: 'c' }"
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
`fill` of the `vgg-point` Mark in two steps. First, the destructuring of the scope
in `v-slot` provides access to each row in the dataset. The data values contained in that
row are mapped to the props of the `vgg-point` using the `val` key. Second,
before being passed as a prop, the data values are transformed using the scale
functions generated in step 3.

### The Map component's scoped slot

The Map component utilises Vue's
[scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots).
The way `vue-gg` uses scoped slots might seem a bit puzzling at first, but using
`vgg-map` with `v-slot` actually quite similar to using Vue's native `v-for`:

::: v-pre
```html
<!-- Using v-for -->
<vgg-point
  v-for="(row, i) in data"
  :x="row.a"
  :y="row.b"
/>

<!-- Using vgg-map -->
<vgg-map v-slot="{ row, i }">

  <vgg-point
   :x="row.a"
   :y="row.b"
  />

</vgg-map>
```
:::

Besides the current `row` and the current row index `i`, the scope also provides
access to the previous and next rows through `prevRow` and `nextRow`. However,
when using `prevRow` and `nextRow`, be aware of the fact that `prevRow` will be
undefined for the first row, and `nextRow` will be undefined for the last row.

When using `unit="dataframe"`, only `dataframe` will be available in the scope-
see [Mapping an entire dataframe](#mapping-an-entire-dataframe).

### When to use `scale`

Sometimes, the data in a column will already be in the right format, and scaling
won't be necessary. This is the case when you have, for example, a column of
colors, and you just want to use the color directly. In this situation, you will
want to use `val`, but not `scale`. To return to the previous example:

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

  <vgg-map v-slot="{ row }">

    <vgg-point
      :x="{ val: row.a, scale: 'a' }"
      :y="{ val: row.b, scale: 'b' }"
      :fill="{ val: row.c }"
    />

  </vgg-map>

</vgg-graphic>
```
:::

Leaving out `scale` is common when working with the Section component.
The Section component allows you to specify a local coordinate system. This
coordinate system can be defined as the domains of the columns in your dataset.
See the [documentation of the Section component](./section.md) for more information on this topic.
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

    <vgg-map v-slot="{ row }">

      <vgg-point
        :x="{ val: row.a }"
        :y="{ val: row.b }"
        :fill="{ val: row.c, scale: 'c' }"
      />

    </vgg-map>

  </vgg-section>

</vgg-graphic>
```
:::

### Using `band`

// TODO

### Using `scaleGeo`

TODO

### Mapping an entire dataframe

In the examples above, `vgg-map` maps one row in the dataframe to one mark:
the `vgg-point`. But for many other graphics, like line graphs, the 'one mark per
row' relation does not hold. Where with the `vgg-point` mark you just give one value
to the `:x` prop, the `vgg-multi-line` expects a whole Array of values. So,
to draw a single `vgg-multi-line` with the data used in the examples above,
we need to map an entire dataframe to a single mark:

::: v-pre
```
<vgg-data :data="{ a: [1, 2, 5, 3, 4], b: [2, 7, 9, 10, 9], }">

  <vgg-map
    v-slot="{ dataframe }"
    unit="dataframe"
  >

    <vgg-multi-line
      :x="{ val: dataframe.a, scale: 'a' }"
      :y="{ val: dataframe.b, scale: 'b' }"
    />

  </vgg-map>

</vgg-data>
```
:::

Note that the scope object now only has a `dataframe` key.
