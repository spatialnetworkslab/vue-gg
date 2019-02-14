---
title: 'Grid'
---

# Component tag

`<vgg-grid>`

# Description

The Grid component is used to quickly position and align [Section](./section.md)
components.

# Props

| Prop           | Required | Types            | Default   | Description                               |
| -------------- | -------- | ---------------- | --------- | ----------------------------------------- |
| rows           | depends  | Number           | undefined | Max. number of rows the grid can have     |
| cols           | depends  | Number           | undefined | Max. number olf columns the grid can have |
| layout-padding | false    | [Number, Object] | 0         | Padding with respect to parent element    |
| cell-padding   | false    | [Number, Object] | 0         | Padding between child elements            |

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

# Usage

### Positioning Sections

::: v-pre
```html
<vgg-graphic :width="500" :height="500">

  <vgg-grid
    :rows="3"
    :layout-padding="10"
  >

    <vgg-section />
    <vgg-section />
    <vgg-section />
    <vgg-section />
    <vgg-section />

  </vgg-grid>

  <!--

  This would result in:

  <vgg-section :x1="" x2="" :y1="" y2="" />
  <vgg-section :x1="" x2="" :y1="" y2="" />
  <vgg-section :x1="" x2="" :y1="" y2="" />
  <vgg-section :x1="" x2="" :y1="" y2="" />
  <vgg-section :x1="" x2="" :y1="" y2="" />

  -->

</vgg-graphic>
```
:::

### Position mapped Sections
