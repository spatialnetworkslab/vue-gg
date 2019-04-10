---
title: 'Graphic'
---

# Component tag

`<vgg-graphic>`

# Description

The Graphic component is the start of any `vue-gg` graphic. None of the other
components should be used outside of the Graphic component.

# Props

| Prop      | Required | Types           | Default   | Description                                   |
| --------- | -------- | --------------- | --------- | --------------------------------------------- |
| width     | true     | Number          | undefined | Width in screen pixels of graphic             |
| height    | true     | Number          | undefined | Height in screen pixels of graphic            |
| flip      | false    | Boolean         | true      | If true, y-coordinates run from bottom to top |
| data      | false    | [Array, Object] | undefined | Some supported data structure                 |
| format    | false    | String          | undefined | Format of data structure                      |
| transform | false    | [Array, Object] | undefined | Transformation(s) to be applied               |
| dataID    | false    | String          | undefined | ID for referencing from other data scope      |

# Usage

To create a new `vue-gg` graphic, just add a new Graphic component, and give
it a `width` and a `height`:

::: v-pre
```html
<vgg-graphic
  :width="500"
  :height="500"
>

  <!-- We will define our graphic here  -->

</vgg-graphic>
```
:::

That's it! Right now, the only thing the Graphic component does is render a SVG
tag to the DOM, and initiate some things under the hood that you, as user, don't
have to worry about. We can now draw some basic shapes in the graphic. First,
however, it must be noted that the coordinates within the Graphic tags work
a little different from regular SVG or Canvas. By default, the y-coordinates will
run from bottom to top, while in regular SVG or Canvas the y-coordinates run from
top to bottom. This behavior can be disabled by adding the `flip` prop:

::: v-pre
```html
<vgg-graphic
  :width="500"
  :height="500"
>

  <!-- This point will at the left-bottom of the graphic -->
  <vgg-point
    :x="0"
    :y="0"
  />

</vgg-graphic>

<vgg-graphic
  :width="500"
  :height="500"
  :flip="false"
>

  <!-- This point will at the left-top of the graphic -->
  <vgg-point
    :x="0"
    :y="0"
  />

</vgg-graphic>
```
:::

However, disabling `flip` is not recommended, because it might create
unintuitive behavior in certain areas of the library. For example, when working
with components that have anchor points, setting the anchor point to the top-right
(`rt`) will result in a bottom-right anchor point when `flip` is disabled.

Besides `width`, `height` and `flip`, the Graphic component has three other props:
`data`, `format` and `transform`. The `data` prop can be passed data in various
formats. In many cases `vue-gg` will be able to detect the format automatically,
but in some cases the `format` prop must be used to make clear what format the
data is in. When some data is passed to the `data` prop, the `transform` prop
can then be used to apply transformations to the passed data. See the documentation
on [data loading](../concepts/data-loading.md) and
[transforming data](../concepts/transforming-data.md) for more details.

If you just want to draw some shapes and not use any input data (yet), that's ok.
The `data`, `format` and `transform` props are not required. It is also possible
to add data and transformations later, using the [Data](./data.md) and/or
[Section](./section.md) components- whatever works for you.
