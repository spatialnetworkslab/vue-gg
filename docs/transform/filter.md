---
title: Filter
---

# Filter transformation

```js
{ filter: ... }
```

`filter` will throw away all rows that do not satisfy a certain condition.
Note that the row will disappear in all columns, even if your condition only
involves one column!

### Instructions

| Type     | Description                                           | Result                                          |
| -------- | ----------------------------------------------------- | ----------------------------------------------- |
| Function | Function that takes current (row, index) as arguments | Row is removed if Function does not return true |

### Usage

To keep all rows that satisfy a certain condition, write a filter function that
returns true when that condition occurs. For example, to keep all rows where
`value` is smaller than 3:

::: v-pre
```html
<vgg-data
  :data="{ value: [1, 2, 3, 4], color: ['red', 'red', 'green', 'blue'] }"
  :transform="{ filter: row => row.value < 3 }"
>

  <!-- Data scope: { value: [1, 2], color: ['red', 'red'] } -->

</vgg-data>
```
:::

Inversely, to throw away all rows that satisfy a certain condition, write a filter
function that returns false when that condition occurs. For example, to throw away
all rows where the `color` is red:

::: v-pre
```html
<vgg-data
  :data="{ value: [1, 2, 3, 4], color: ['red', 'red', 'green', 'blue'] }"
  :transform="{ filter: row -> row.color !== 'red' }"
>

  <!-- Data scope: { value: [3, 4], color: ['green', 'blue'] } -->

</vgg-data>
```
:::
