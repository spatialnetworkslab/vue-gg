---
title: Group by
---

# Group by transformation

```js
{ groupBy: ... }
```

`groupBy` is an operation that groups a single dataframe on a certain column, creating a new
row for each unique value in the grouping column. It will store all the original rows belonging to that group
in a nested dataframe in a column named 'grouped'. This
grouped data can then be used in various ways: e.g. to create facets, making plots with
multiple trend lines, or calculating summary statistics for groups or categories. Grouping by multiple
columns is also possible.

## Instructions

| Type   | Description      | Result                                                 |
| ------ | ---------------- | ------------------------------------------------------ |
| String | Name of column   | Returns grouped dataframe, grouped by one column       |
| Array  | Names of columns | Returns grouped dataframe, grouped by multiple columns | 

## Usage

To grouped data based on a single categorical column, pass the name of the column
as String to groupBy:

::: v-pre
```html
<vgg-data
  :data="{ fruit: ['apple', 'banana', 'banana', 'apple'], sales: [10, 5, 13, 9] }"
  :transform="{ groupBy: 'fruit' }"
>

  <!-- Data scope: {
    fruit: ['apple', 'banana'],
    grouped: [
      { fruit: ['apple', 'apple'], sales: [10, 9] },
      { fruit: ['banana', 'banana'], sales: [5, 13] }
    ]
  } -->

</vgg-data>
```
:::

To group by multiple columns, use an Array of column names:

::: v-pre
```html
<vgg-data
  :data="{
    fruit: ['apple', 'banana', 'banana', 'apple', 'apple', 'banana', 'banana', 'apple'],
    onDiscount: ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no'],
    sales: [10, 5, 13, 9, 6, 4, 6, 7]
  }"
  :transform="{ groupBy: ['fruit', 'onDiscount'] }"
>

  <!-- Data scope: {
    fruit: ['apple', 'apple', 'banana', 'banana'],
    onDiscount: ['yes', 'no', 'yes', 'no']
    grouped: [
      { fruit: ['apple', 'apple'], onDiscount: ['yes', 'yes'], sales: [10, 9] },
      { fruit: ['apple', 'apple'], onDiscount: ['no', 'no'], sales: [6, 7] },
      { fruit: ['banana', 'banana'], onDiscount: ['yes', 'yes'], sales: [5, 13] },
      { fruit: ['banana', 'banana'], onDiscount: ['no', 'no'], sales: [4, 6] },
    ]
  } -->

</vgg-data>
```
:::
