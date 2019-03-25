---
title: Select
---

# Select transformation

```js
{ select: ... }
```

`select` is used to get rid of undesired columns. Some datasets might have a lot of
columns, and using select, the irrelevant ones can be thrown away. This will
reduce memory usage and improve performance a bit.

## Instructions

| Type   | Description      | Result                                            |
| ------ | ---------------- | ------------------------------------------------- |
| String | Name of column   | All other columns except this one are thrown away |
| Array  | Names of columns | All other columns except these are thrown away    | 

## Usage

The `select` transformation's instructions can be passed as a single String,
or as an Array of Strings. When passing a single String, the String must be the
name of a column. This will result in selecting a single column:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  :transform="{ select: 'a' }"
>

  <!-- Data scope: { a: [1, 2, 3, 4] } -->

</vgg-data>
```
:::

Passing an Array of column names will result in selecting those columns:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8], c: [9, 10, 11, 12] }"
  :transform="{ select: ['a', 'b'] }"
>

  <!-- Data scope: { a: [1, 2, 3, 4], b: [5, 6, 7, 8] } -->

</vgg-data>
```
:::
