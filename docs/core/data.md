---
title: Data
---

# Component tag

`<vgg-data>`

# Description

The Data component is used to create a new data scope by either adding new
data, or transforming its parent scope. For more information, check out the
[data loading](../concepts/data-loading.md) and the
[data transformation](../concepts/transforming-data.md) documentation.

# Props

| Prop       | Required | Types           | Default   | Description                                                 |
| ---------- | -------- | --------------- | --------- | ----------------------------------------------------------- |
| data       | false    | [Array, Object] | undefined | Some supported data structure                               |
| format     | false    | String          | undefined | Format of data structure                                    |
| transform  | false    | [Array, Object] | undefined | Transformation(s) to be applied                             |
| dataID     | false    | String          | undefined | ID for referencing from other data scope                    |
| allowEmpty | false    | Boolean         | false     | When false, won't render children when receiving empty data | 

# Usage

If none of the props are provided, the component will not do anything. If only
the `data` prop is provided, the component will create a new
[data scope](../concepts/data-loading.md#data-scope) for its child components
from the passed data:

::: v-pre
```html
<vgg-data :data="{ a: [1, 2, 3, 4], b: ['x', 'x', 'y', 'y'] }">

  <!-- Data scope: { a: [1, 2, 3, 4], b: ['x', 'x', 'y', 'y'] } -->

</vgg-data>
```
:::

If only the `transform` prop is provided, the component will perform one or
more transformations on its parent data scope, and use that as data scope for
its children:

::: v-pre
```html
<vgg-data :data="{ a: [1, 2, 3, 4], b: ['x', 'x', 'y', 'y'] }">

  <!-- Data scope: { a: [1, 2, 3, 4], b: ['x', 'x', 'y', 'y'] } -->

  <vgg-data :transform="{ filter: row => row.a > 2 }">

    <!-- Data scope: { a: [3, 4], b: ['y', 'y'] } -->

  </vgg-data>

</vgg-data>
```
:::

Finally, if both the `data` and the `transform` props are provided, the component
will transform whatever was passed to `data` and use that as data scope for its
children. If some data will only be used in its transformed form, it is
recommended to use this method, as this only creates one data scope, which saves
some memory and improves performance.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4], b: ['x', 'x', 'y', 'y'] }"
  :transform="[
    { groupBy: 'b' },
    { summarise: { aMean: { a: 'mean' }, aSum: { a: 'sum' } } }
  ]"
>

  <!-- Data scope: { b: ['x', 'y'], aMean: [1.5, 3.5], aSum: [3, 7] } -->

</vgg-data>
```
:::
