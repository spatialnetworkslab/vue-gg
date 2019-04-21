---
title: Scale
---

# Scale transformation

```js
{ scale: ... }
```

The `scale` transformation exposes `vue-gg`'s built-in scaling functionality as a data
transformation.

## Instructions

| Type   | Description                                           | Result                                |
| ------ | ----------------------------------------------------- | ------------------------------------- |
| Object | Object containing scaling instructions per new column | New scaled columns added to dataframe |

## Usage

The instructions given to `scale` are passed as an object with the keys being
new column names, and the values being instructions to create those columns:

```js
{ scale: { <column a>: ..., <column b>: ... } }
```

These instructions have the following format:

```js
{ <column a>: { prop: ..., column: ..., scale: ... } }
```

Where `prop` is a String respresenting the name of the prop that the data will be used for,
`column` is a String representing the name of the column in the data frame that will be transformed, and `scale`
is a [scaling](../concepts/scaling.md) definition. There are two caveats here:
when using a coordinate prop (like `x`, `y`, `x2`, `h`...), the `range` scaling
option is obligatory, and it is not allowed to use domains or columns from other
data scoped.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{
    scale: {
      b: { prop: 'x', column: 'a', scale: { domain: 'a', range: [2, 8] } }
    }
  }"
>

  <!-- Data scope: {
    a: [1, 2, 3, 4],
    b: [2, 4, 6, 8]
  } -->

</vgg-data>
```
:::
