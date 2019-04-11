---
title: 'Grid'
---

# Component tag

`<vgg-grid>`

# Description

The Grid component is used to quickly position and align 'square'
components in a grid format. 'Square' here refers to any component that has
 `x1`, `x2`, `y1` and `y2` props. This includes the [Section](./section.md)
 component, the [Rectangle](../marks/rectangle.md) mark, and any custom component
 that you would want to create, given it has the props mentioned above.

# Props

| Prop           | Required | Types            | Default   | Description                                  |
| -------------- | -------- | ---------------- | --------- | -------------------------------------------- |
| rows           | depends  | Number           | undefined | Max. number of rows the grid can have        |
| cols           | depends  | Number           | undefined | Max. number olf columns the grid can have    |
| layout-padding | false    | [Number, Object] | 0         | Padding with respect to parent element       |
| cell-padding   | false    | [Number, Object] | 0         | Padding between child elements               |
| start          | false    | String           | 'b'       | Start filling from top ('t') or bottom ('b') |

The Grid component requires either the `rows`, _or_ the `cols` prop. If you use both,
or neither, the component will throw an error. The number given to `rows` or `cols`
will be the maximum number of respectively rows or columns that the grid will be
allowed to have. So, let's say that we set the `rows` to 3, and we use the Grid
component to position 5 Section components. This will give us a grid of three
rows, and 2 columns, with the 5 Sections positioned to 5 grid cells and one grid
cell left empty (see [positioning sections](#positioning-sections) below).

`layout-padding` and `cell-padding` can both take either a number, or an object
of the following form:

```js
{
  l: ...,
  r: ...,
  b: ...,
  t: ...
}
```

where `l`, `r`, `b` and `t` are all optional.

There are two main ways of using the Grid component:

1. A number of Sections can be put into the Grid directly, manually or with `v-for`
2. A number of Sections can be created with the [Map](./map.md) component

Both will be discussed below.

# Usage

### Positioning Sections

When placing the Section components directly into the Grid component, all the
Section's coordinate props (`x1`, `y2`, `w`, etc.) must be left out- these
will automatically be determined by the Grid component. Note that the positioning
starts from the bottom left, and that rows will be filled out before columns.
See the example below:

::: v-pre
```html
<vgg-grid
  :rows="3"
  :cell-padding="{
    t: 10,
    l: 15,
    r: 5
  }"
>

  <vgg-section
    v-for="color in ['#2A5B84', '#AAC4D1', '#EBC137', '#FEFAE1', '#BD8025']"
    :key="color"
    :scale-x="[0, 1]"
    :scale-y="[0, 1]"
  >

    <vgg-rectangle :x1="0" :x2="1" :y1="0" :y2="1" :fill="color" />

  </vgg-section>

</vgg-grid>
```
:::

<sections-grid />

### Position Sections with the Map component

The Grid component can also be used in combination with the Map component.
See the example below, where we create one Section for each row in the data,
which are scaled and positioned into a grid layout automatically:

::: v-pre
```html
<vgg-data :data="{ fruit: ['apple', 'banana', 'coconut', 'durian', 'eggplant'] }">

  <vgg-grid :cols="3" :cell-padding="5">

    <vgg-map v-slot="{ row }">

      <vgg-section :scale-x="[0, 1]" :scale-y="[0, 1]">

        <vgg-rectangle
          :x1="0"
          :x2="1"
          :y1="0"
          :y2="1"
          :fill="{ val: row.fruit, scale: {
            domain: 'fruit',
            range: ['#2A5B84', '#AAC4D1', '#EBC137', '#FEFAE1', '#BD8025']
          } }"
        />

      </vgg-section>

    </vgg-map>

  </vgg-grid>

</vgg-data>
```
:::

<mapped-sections-grid />
