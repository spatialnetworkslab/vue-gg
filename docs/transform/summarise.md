---
title: Summarise
---

# Summarise transformation

```js
{ summarise: ... }
```

`summarise` is used to calculate summary statistics over columns or groups.

### Instructions

| Type   | Description                                           | Result                             |
| ------ | ----------------------------------------------------- | ---------------------------------- |
| Object | Object containing aggregation instructions per new column | New dataframe with summarised data |

### Usage

`summarise` is most useful when used in combination with `groupBy` or `binning`. However,
for the purpose of explanation, using `summarise` to summarise an entire dataframe
will first be discussed in the following paragraph. In the paragraph after that,
the same principles will then be applied to data grouped with `groupBy` or `binning`.

#### Summarising an entire dataframe

The `summarise` instructions Object has new column names as keys, and 'aggregation
instructions' as value:

```
{ summarise: { <new column name>: <aggregation instructions> } }
```

The aggregation instructions can be either an Object or a Function. When the
aggregation instructions are passed as an Object, it must be an Object with one
key/value pair. The key, then, is a column in the data on which the
transformation is applied, and the value either a String with the name of an aggregation
function, or an actual Function.

```
{ summarise: { <new column name>: { <old column name>: ... } } }
```

For example, to calculate the sum of all data in a single column, we can use the
`'sum'` aggregation Function:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ summarise: { sumA: { a: 'sum' } } }"
>

  <!-- Data scope: { sumA: [10] } -->

</vgg-data>
```
:::

The following aggregation Functions can be accessed through the String syntax:

| Aggregation | Description                    |
| ----------- | ------------------------------ |
| count       | Number of occurances/rows      |
| sum         | Sum of all values in column    |
| mean        | Mean of all values in column   |
| median      | Median of all values in column |
| mode        | Most occuring value in column  |
| min         | Lowest value in column         |
| max         | Highest value in column        |

Alternatively, you can use your own custom Function. This Function will be called
with the entire column as its first argument:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ summarise: {
    meanA: { a: col => {
      let sum = 0
      col.forEach(value => { sum += value })
      return sum / col.length
    } }
  } }"
>

  <!-- Data scope: { meanA: [2.5] } -->

</vgg-data>
```
:::

Finally, we can provide the aggregation instructions as Function instead of as an
Object:

```
{ summarise: { <column name>: <aggregation Function> } }
```

In this example, we will do the same as in the example above, but clearly
there are more advanced summary techniques possible with this method:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  :transform="{ summarise: {
    meanA: df => {
      let sum = 0
      let col = df.a
      col.forEach(value => { sum += value })
      return sum / col.length
    }
  } }"
>

  <!-- Data scope: { meanA: [2.5] } -->

</vgg-data>
```
:::

#### Summarising groups

As mentioned above, `summarise` is especially powerful in combination with grouped
data. For more information on how to create grouped data, check out the
[group by](./groupby.md) and [binning](./binning.md) documentation.

The syntax used in `summarise` is exactly the same when working with grouped data.
The difference, however, is that instead of returning a dataframe with only one row,
a dataframe with one row per group will be returned. For example, to calculate
the average price per fruit:

::: v-pre
```html
<vgg-data
  :data="{ value: [1, 2, 3, 4], fruit: ['apple', 'banana', 'apple', 'banana'] }"
  :transform="[
    { groupBy: 'fruit' },
    { summarise: { meanFruit: { fruit: 'mean' } } }
  ]"
>

  <!-- Data scope: { fruit: ['apple', 'banana'], meanFruit: [2, 3] } -->

</vgg-data>
```
:::

Or, to calculate the number of items in each bin when using `binning`:

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="[
    { binning: { groupBy: 'a', method: 'EqualInterval', numClasses: 3 } },
    { summarise: { binCount: { b: 'count' } } }
  ]"
>

  <!-- Data scope: {
    bins: [[1, 3], [4, 5], [6, 7]],
    binCount: [3, 2, 2]
  } -->

</vgg-data>
```
:::
