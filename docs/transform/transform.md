---
title: Transform
---

# Transform transformation

```js
{ transform: ... }
```

`transform` is the most basic, yet most flexible and powerful transformation.
It allows you to do whatever you want with the data. It takes a Function that
takes the entire dataframe as an argument, and must return another entire
dataframe.

## Instructions

| Type     | Description             | Result                                                        |
| -------- | ----------------------- | ------------------------------------------------------------- |
| Function | Transformation function | Takes all data as first argument, must return valid dataframe | 

## Usage

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="{ transform: df => {
    let c = df.a.map((v, i) => v + df.b[i])
    df.c = c
    return df
  } }"
>

  <!-- Data scope: {
    a: [1, 2, 3, 4, 5, 6, 7],
    b: [8, 9, 10, 11, 12, 13, 14],
    c: [9, 11, 13, 15, 17, 19, 21]
  } -->

</vgg-data>
```
:::
