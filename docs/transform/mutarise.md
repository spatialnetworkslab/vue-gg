---
title: Mutarise
---

# Mutarise transformation

```js
{ mutarise: ... }
```

`mutarise` is a combination of `mutate` and `summarise`. Its syntax is identical
to `summarise`, but instead of collapsing the dataframe to a single row or one row
per group, it will add one or more new columns with the summarised values. This
might seem strange, but is actually very powerful in combination with `mutate` to
calculate all sorts of useful values. For example, if you have a dataframe with
one column containing dates, and one column containg sales turnover of that day. It could
be interesting to calculate what percentage of your total turnover over the entire
period was made on which day. To do this, you would have to get the sum of the entire
column, and divide each row by that amount. This can be solved by using `mutarise`
followed by `mutate`.

## Instructions
| Type   | Description                                               | Result                           |
| ------ | --------------------------------------------------------- | -------------------------------- |
| Object | Object containing aggregation instructions per new column | New columns with summarised data |

## Usage
As mentioned before, the syntax to `mutarise` is the same as [summarise](./summarise.md).
The difference, however, is the result of the operation.
When summarising an entire dataframe (i.e. ungrouped data), the result will always
be a new dataframe with only one row. While `mutarise`, instead, adds a column
to the existing dataframe for each new column mentioned in the instructions Object.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ summarise: { sumA: { a: 'sum' } } }"
>

  <!-- Data scope: { a: [1, 2, 3, 4], sumA: [10, 10, 10, 10] } -->

</vgg-data>
```
:::

Moreover, when working with grouped data, `summarise` will return a new dataframe
with one row for each group. `mutarise` will add the same number of columns regardless
of how many groups- the only difference is that the values inside of the added
column will differ per group:

::: v-pre
```html
<vgg-data
  :data="{ value: [1, 2, 3, 4], fruit: ['apple', 'banana', 'apple', 'banana'] }"
  :transform="[
    { groupBy: 'fruit' },
    { mutarise: { totalFruit: { value: 'sum' } } }
  ]"
>

  <!-- Data scope: {
    value: [1, 2, 3, 4],
    fruit: ['apple', 'banana', 'apple', 'banana'],
    totalFruit: [4, 6, 4, 6]
  } -->

</vgg-data>
```
:::
