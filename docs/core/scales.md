---
title: 'Scales'
---

# Component tag

`<vgg-scales>`

# Description

The Scales component is used to create reusable scales. Scales created
with the Scales component can be referenced in any place where you would
need to create a scale by using `#` followed by the name of the scale. Besides
leading to more DRY code, the Scales component can be used conveniently for
faceting, where you want to split up data into categories while keeping the
original domains of the data before it was split- see [Usage](#usage). Note that
the scales must be declared using the Scales component _before_ referencing
the scale with `#<scaleName>`.

# Props

| Prop   | Required | Types  | Description              |
| ------ | -------- | ------ | ------------------------ |
| scales | true     | Object | Object containing scales |

The values of the object passed to `scales` will be the identifiers of the scales.
The values must be a scaling options specification- see the [scaling](../concepts/scaling.md)
documentation for more information.

# Usage

Example of how to filter data, and then scaling the filtered data using the
domain before it was filtered:

::: v-pre
```html
<vgg-data
  :data="{
    a: [1, 2, 3, 4],
    b: [5, 6, 7, 8]
  }"
/>

  <vgg-scales :scales="{ myScale: 'a' }" />

  <vgg-data :transform="{ filter: row => row.a > 1 }">

    <vgg-point
      :x="{ get: 'a', scale: '#myScale' }"
      :y="{ get: 'b', scale: 'b' }"
    />

  </vgg-data>

</vgg-data>
```
:::

Note that the creating of scales with `vgg-scales` must be done before
referencing the scales! Otherwise `vue-gg` will throw an error.

Another example when using faceting:

TODO
