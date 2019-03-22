---
title: Binning
---

# Binning transformation

```js
{ binning: ... }
```

The `binning` operation is like the `groupBy` operation, except with quantitative
data. Also, while `groupBy` keeps the name of the variable(s) that the data were grouped
by, binning will create a new column named `bins`. It is only possible to bin based
on one column.

### Instructions

| Type   | Description                            | Result                        |
| ------ | -------------------------------------- | ----------------------------- |
| Object | Object containing binning instructions | Returns new grouped dataframe |

### Usage

The binning transformation takes an object specifying the parameters of the binning method used,
and returns a new dataframe with two columns:

1. a column called `'bins'`, that contains the upper and lower boundaries of the
bins as [interval](../concepts/data-loading#data-types) data.
2. a column called `'grouped'`, that contains the data that is inside of each
bin as [nested](../concepts/data-loading#data-types) data.

### Keys

```js
{ binning: { groupBy: ..., method: ..., ... } }
```

All binning transformations must specify the following keys:

Key       | Type      |  Description
----------|-----------|----------------------------
groupBy   | String    | Name of data variable on which to perform binning
method    | String    | Type of binning to perform

Furthermore, different binning `method`s have additional required keys.
These different `method`s, and their additional required keys, will be discussed
below.

Here is an example using the `EqualInterval` method, which has the additional
required `numClasses` key:

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

#### IntervalSize

The `IntervalSize` method groups data into bins of a given size.

Key       | Type      |  Description
----------|-----------|----------------------------
binSize   | Number    | Size of each bin

#### EqualInterval

The `EqualInterval` method groups data into a given number of equal sized bins.

Key       | Type      |  Description
----------|-----------|----------------------------
numClasses| Number    | Number of bins

#### StandardDeviation, ArithmeticProgression, Geometric Progression, Quantile, Jenks

These classification methods are made available through [geostats](https://github.com/simogeo/geostats)
(see geostats docs for details on each method).

Key       | Type      |  Description
----------|-----------|----------------------------
numClasses| Number    | Number of bins

#### Manual

The `Manual` method groups data into user-defined ranges.

Key          | Type      |  Description
-------------|-----------|----------------------------
manualClasses| Array     | An array of bin boundaries
