---
title: Transforming data
---

# Introduction

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
the data into `vue-gg`, while for others, like 4 or 6, might only be desirable
in certain parts of the graphic- for example, when you want one part of the
graphic showing a scatterplot of all data points, but another part showing
just a bar chart with average values across categories.

Transformation has already been briefly dicussed in the [data loading](./data-loading.md)
documentation, but will be discussed into more detail on this page.

# The transform prop



# Transformation verbs

R users familiar with [dplyr](https://dplyr.tidyverse.org/) (part of the
[tidyverse](https://www.tidyverse.org/)) will, by now, have seen a lot of similarities
between the verbs used in `dplyr` and the verbs used in `vue-gg`'s data transformations.
There are some small differences, but this similarity is no accident- the verbs and
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
  :data="{ : [1, 2, 3, 4], color: ['red', 'red', 'green', 'blue'] }"
  :transform="{ filter: row -> row.color !== 'red' }"
>

  <!-- Data scope: { a: [3, 4], color: ['green', 'blue'] } -->

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

`groupBy` is an operation that splits up a single dataframe into a couple of dataframes,
which are stored in another dataframe, inside of a column named `grouped`. This
grouped data can then be used in various ways, like creating facets, making plots with
multiple trend lines, or calculating summary statistics for groups or categories.
It is only possible to make groups with categorical data. Grouping by multiple
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
