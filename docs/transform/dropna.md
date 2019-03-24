---
title: Drop NA
---

# Drop NA transformation

```js
{ dropNA: ... }
```

`dropNA` is essentially a special case of `filter`, that throws away
all rows that contain invalid values, like `NaN`, `null` or `undefined`.

## Instructions

| Type   | Description               | Result                                                                  |
| ------ | ------------------------- | ----------------------------------------------------------------------- |
| null   | Shorthand for all columns | Will throw away any row that has an invalid value in any of its columns |
| String | Name of column            | Will throw away any row that has an invalid value in this column        |
| Array  | Names of columns          | Will throw away any row that has invalid values in any of these columns |

## Usage

When using `null`, each row that has an invalid value in any of its columns will
be thrown out:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, undefined, 4], b: [5, null, 7, 8], c: [NaN, 10, 11, 12] }"
  :transform="{ dropNA: null }"
>

  <!-- Data scope: { a: [4], b: [8], c: [12] } -->

</vgg-data>
```
:::

When using a String that represents the name of a column, each row that has an
invalid value in that specific column will be thrown out:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, undefined, 4], b: [5, null, 7, 8], c: [NaN, 10, 11, 12] }"
  :transform="{ dropNA: 'b' }"
>

  <!-- Data scope: { a: [1, undefined, 4], b: [5, 7, 8], c: [NaN, 11, 12] } -->

</vgg-data>
```
:::

When using an Array of Strings representing column names, each row that has an
invalid value in any of those specific columns will be thrown out:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, undefined, 4], b: [5, null, 7, 8], c: [NaN, 10, 11, 12] }"
  :transform="{ dropNA: ['b', 'c'] }"
>

  <!-- Data scope: { a: [undefined, 4], b: [7, 8], c: [11, 12] } -->

</vgg-data>
```
:::
