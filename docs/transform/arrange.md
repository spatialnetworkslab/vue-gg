---
title: Arrange
---

# Arrange transformation

```js
{ arrange: ... }
```

`arrange` is used to sort data.

## Instructions
| Type   | Description                                                  | Result                                |
| ------ | ------------------------------------------------------------ | ------------------------------------- |
| Object | Object containing which variable to sort, and how            | Rows are sorted by one variable       |
| Array  | Array of Objects containing which variables to sort, and how | Rows are sorted by multiple variables |

## Usage
When using a single Object for sorting, the Object must have only one key, which
represents the name of the variable that all rows will be sorted by:

```js
{ arrange: { <variable name>: ... } }
```

The value associated with this key can be either a String or a Function. When a
String is used, the string can only be `'ascending'` or `'descending'`. The
Strings `'ascending'` and `'descending'` can only be used to sort quantitative,
categorical or temporal data.

Quantitative data is the most straightforward:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 4, 2, 3] }"
  :transform="{ arrange: { a: 'ascending' } }"
>

  <!-- Data scope: { a: [1, 2, 3, 4] } -->

</vgg-data>
```
:::

Sorting categorical data with `'ascending'` will just sort it alphabetically,
and `'descending'`... well, in the opposite direction:

::: v-pre
```html
<vgg-data
  :data="{ fruit: ['durian', 'banana', 'apple', 'coconut'] }"
  :transform="{ arrange: { fruit: 'descending' } }"
>

  <!-- Data scope: { fruit: ['durian', 'coconut', 'banana', 'apple'] } -->

</vgg-data>
```
:::

Besides the `'ascending'` or `'descending'` Strings, it is also possible
to pass a sorting Function. With sorting functions it is also possible to sort
other data types. This function is then just passed to the vanilla JS `.sort`
Array method as
[compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description):

::: v-pre
```html
<vgg-data
  :data="{ value: [1, 4, 2, 3] }"
  :transform="{ arrange: { value: (a, b) => a < b ? -1 : 1 } }"
>

  <!-- Data scope: { value: [1, 2, 3, 4] } -->

</vgg-data>
```
:::

Finally, it is possible to provide an Array of sorting Objects as described above.
This allows sorting by multiple columns.

```js
{ arrange: [
    { <variable name>: ... },
    { <variable name>: ... }
  ]
}
```

Note that when sorting by multiple columns, order matters! The first entry in the
Array will provide the main sorting order. The second entry will be used as tiebreaker
for the first, the third column as tiebreaker for the second, etc.

::: v-pre
```html
<vgg-data
  :data="{
    fruit: ['apple', 'banana', 'coconut' 'durian', 'coconut', 'banana'],
    value: [4, 3, 7, 2, 4, 5]
  }"
  :transform="{ arrange: [
      { fruit: 'descending' }
      { value: 'ascending' }
    ]
  }"
>

  <!-- Data scope: {
    fruit: ['durian', 'coconut', 'coconut', 'banana', 'banana', 'apple']
    value: [2, 4, 7, 3, 5, 4] 
  } -->

</vgg-data>
```
:::
