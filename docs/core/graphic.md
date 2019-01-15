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
have to worry about. We can now draw some basic shapes in the graphic.
