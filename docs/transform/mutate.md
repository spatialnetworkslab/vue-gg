---
title: Mutate
---

# Mutate transformation

```js
{ mutate: ... }
```
`mutate` is used to calculate a new column based on the available data.
`transmute` does the same thing, except it throws away all columns other than the
just calculated ones.

## Instructions

| Type   | Description                                                           | Result                 |
| ------ | --------------------------------------------------------------------- | ---------------------- |
| Object | Object with new column names as keys, and calculation logic as values | Calculates new columns |

### Usage

The Object passed to `mutate` or `transmute` will have the new column names
as keys, and a Function to calculate these new columns as value. The Function will
be passed the current row, row index, previous row and next row:

```js
{ mutate: { <column name>: (row, i, prevRow, nextRow) => { /* Function body */ } } }
```

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ mutate: { aSquared: (row, i, prevRow, nextRow) => row.a * row.a } }"
>

  <!-- Data scope: { a: [1, 2, 3, 4], aSquared: [1, 4, 9, 16] } -->

</vgg-data>
```
:::

Here the same thing, but with `transmute`:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ transmute: { aSquared: (row, i, prevRow, nextRow) => row.a * row.a } }"
>

  <!-- Data scope: { aSquared: [1, 4, 9, 16] } -->

</vgg-data>
```
:::
