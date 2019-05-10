---
title: Transforming data
---
# Transforming data

After loading data into `vue-gg`, it is often necessary to
perform one or more transformations on this data. Situations where transforming
data is necessary include:

1. Having invalid or missing values in the data
2. Being interested in only a subset of the data
3. Needing to calculate new values based on the data
4. Having too much data to interpret, so that the data requires summarising
5. Needing to re-organize or sort data
6. Needing to divide data into groups or bins, in order to create particular graphics

Some of these operations, like 1, only require a single transformation before passing
the data into `vue-gg`. Others, like 4 or 6, might only be desirable
in certain parts of the graphic – for example, when you want one part of the
graphic showing a scatterplot of all data points, but another part showing
just a bar chart with average values across categories.

Transformation has already been briefly dicussed in the [data loading](./data-loading.md)
documentation, but will be discussed into more detail on this page.

## The transform prop

Like the `data` prop, the `transform` prop is available on all [Graphic](../core/graphic.md),
[Data](../core/data.md) and [Section](../core/section.md) components. When the
`transform` prop is on the same component as the `data` prop, the transformations
will be applied to the input data immediately, and only one data scope will
be created: one for the transformed data.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  :transform="{ filter: row => row.a > 2 }"
>

  <!-- Data scope: { a: [3, 4], b: [7, 8] } -->

</vgg-data>
```
:::

You can also put the `transform` prop on a component without a `data` prop. That way,
it will create a different data scope, containing the transformed version of the
data in its parent scope:

::: v-pre
```html
<vgg-data :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }">

  <!-- Data scope: { a: [1, 2, 3, 4], b: [5, 6, 7, 8] } -->

  <vgg-data :transform="{ summarise: { meanA: { a: 'mean' } } }">

    <!-- Data scope: { meanA: [2.5] } -->

  </vgg-data>

</vgg-data>
```
:::

The `transform` prop accepts two types: an Object or an Array.
We will call the Object a `transformation`. A `transformation` always has the
following format:

```js
{ <transformation verb>: <verb-specific instructions> }
```

A `transformation` is an object with exactly one key and one value. The key is
a transformation verb like `filter` or `summarise`, and the verb-specific
instructions will determine how the transformation will be applied.See the
[transformation verb](#transformation-verbs) documentation below for an
overview of the available transformation verbs, and the individual documentation
pages for each verb for more details on the verb-specific instructions.

It is also possible to have an Array of `transformation`s:

```js
[
  { filter: row => row.a > 2 },
  { arrange: { a: 'ascending' } },
  { groupBy: 'b' },
  { summarise: { sumA: { a: 'sum' } } }
]
```

In this way, the result of every transformation will be piped into the next one.
So all rows where `row.a > 2` will be piped into `arrange`, where they will be
sorted ascendingly. Next, the data will be grouped based on the values in column
`b`, and finally, the sum of values in the column `a` will be calculated for each
group.

To avoid wasting memory and achieve the best performance, it is recommended to
always put the `data` and `transform` props on the same component if possible. In
addition, when possible, try to use the Array syntax to perform all transformations
in one go, instead of spreading them out over different components. The less
data scopes the better.

## Transformation verbs
R users familiar with [dplyr](https://dplyr.tidyverse.org/) (part of the
[tidyverse](https://www.tidyverse.org/)) will, by now, have seen a lot of similarities
between the verbs used in `dplyr` and the verbs used in `vue-gg`'s data transformations.
There are some small differences, but this similarity is no accident – the verbs and
piping syntax used in `dplyr` have greatly inspired `vue-gg`'s transformation syntax.

For users less familiar with the `dplyr` verbs, this paragraph will give a small
overview of what each verb does, including a short example and a link to each verb's
own documentation page.

### Select
`select` is used to get rid of undesired columns. Some datasets might have a lot of
columns, and using select, the irrelevant ones can be thrown away. This will
reduce memory usage and improve performance a bit.

Example:

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

[Go to the select documentation](../transform/select.md)

### Rename
As the name suggests, `rename` is used to give columns a different name.

Example:

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

[Go to the rename documentation](../transform/rename.md)

### Filter
`filter` will throw away all rows that do not satisfy a certain condition.
Note that the row will disappear in all columns, even if your condition only
involves one column!

Example:

::: v-pre
```html
<vgg-data
  :data="{ value: [1, 2, 3, 4], color: ['red', 'red', 'green', 'blue'] }"
  :transform="{ filter: row => row.color !== 'red' }"
>

  <!-- Data scope: { value: [3, 4], color: ['green', 'blue'] } -->

</vgg-data>
```
:::

[Go to the filter documentation](../transform/filter.md)

### Drop NA
`dropNA` is essentially a special case of `filter`, that throws away
all rows that contain invalid values, like `NaN`, `null` or `undefined`.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, NaN, 4], b: [undefined, 6, 7, 8] }"
  :transform="{ dropNA: 'a' }"
>

  <!-- Data scope: { a: [1, 2, 4], b: [undefined, 6, 8] } -->

</vgg-data>
```
:::

[Go to the drop NA documentation](../transform/dropna.md)

### Arrange
`arrange` is used to sort data.

::: v-pre
```html
<vgg-data
  :data="{ a: [4, 2, 3, 1], b: ['a', 'a', 'b', 'b'] }"
  :transform="{ arrange: [ { b: 'descending' }, { a: 'ascending' } ] }"
>

  <!-- Data scope: { a: [1, 3, 2, 4], b: ['b', 'b', 'a', 'a'] } -->

</vgg-data>
```
:::

[Go to the arrange documentation](../transform/arrange.md)

### Mutate and transmute
`mutate` is used to calculate a new column based on the available data.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ mutate: { aSquared: row => row.a * row.a } }"
>

  <!-- Data scope: { a: [1, 2, 3, 4], aSquared: [1, 4, 9, 16] } -->

</vgg-data>
```
:::

`transmute` does the same thing, except it throws away all columns other than the
just calculated ones.

[Go to the mutate/transmute documentation](../transform/mutate.md)

### Summarise
`summarise` is used to calculate summary statistics over columns or groups.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ summarise: { sumA: { a: 'sum' } }"
>

  <!-- Data scope: { sumA: [10] } -->

</vgg-data>
```
:::

[Go to the summarise documentation](../transform/summarise.md)

### Mutarise
`mutarise` is a combination of `mutate` and `summarise`. Its syntax is identical
to `summarise`, but instead of collapsing the dataframe to a single row or one row
per group, it will add a new column with the summarised values.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4] }"
  :transform="{ summarise: { sumA: { a: 'sum' } }"
>

  <!-- Data scope: { a: [1, 2, 3, 4], sumA: [10, 10, 10, 10] } -->

</vgg-data>
```
:::

[Go to the mutarise documentation](../transform/mutarise.md)

### Group by
`groupBy` is an operation that groups a single dataframe on a certain column, creating a new
row for each unique value in the grouping column. It will store all the original rows belonging to that group
in a nested dataframe in a column named 'grouped'. This
grouped data can then be used in various ways: e.g. to create facets, making plots with
multiple trend lines, or calculating summary statistics for groups or categories. Grouping by multiple
columns is also possible.

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

[Go to the group by documentation](../transform/groupby.md)

### Binning

The `binning` operation is like the `groupBy` operation, except with quantitative
data. Also, while `groupBy` keeps the name of the variable(s) that the data were grouped
by, binning will create a new column named `bins`. It is only possible to bin based
on one column.

::: v-pre
```html
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="{ binning: { groupBy: 'a', method: 'EqualInterval', numClasses: 3 } }"
>

  <!-- Data scope: {
    bins: [[1, 3], [3, 5], [5, 7]],
    grouped: [
      { a: [1, 2, 3], b: [8, 9, 10] },
      { a: [4, 5], b: [11, 12] },
      { a: [6, 7], b: [13, 14] }
    ]
  } -->

</vgg-data>
```
:::

[Go to the bin documentation](../transform/binning.md)

### Transform

`transform` is the most basic, yet most flexible and powerful transformation.
It allows you to do whatever you want with the data. It takes a Function that
takes the entire dataframe as an argument, and must return another entire
dataframe.

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

[Go to the transform documentation](../transform/transform.md)

### Scale

The `scale` transformation exposes `vue-gg`'s built-in scaling functionality as a data
transformation.

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

[Go to the scale documentation](../transform/scale.md)
