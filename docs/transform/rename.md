---
title: Rename
---

# Rename transformation

```js
{ rename: ... }
```

As the name suggests, `rename` is used to give columns a different name.

### Instructions

| Type   | Description                     | Result                 |
| ------ | ------------------------------- | ---------------------- |
| Object | Object with rename instructions | Columns get a new name |

### Usage

The `rename` instructions are given as an Object, where the keys are the old
column names, and the values are the new column names.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  :transform="{ rename: { a: 'apple', b: 'banana' } }"
>

  <!-- Data scope: { apple: [1, 2, 3, 4], banana: [5, 6, 7, 8] } -->

</vgg-data>
```
:::
