---
title: Binning
---

# Binning transformation

```js
{ binning: ... }
```

The `binning` operation is like the `groupBy` operation, except with quantitative
data. Also, while `groupBy` keeps the name of the variable(s) that was used to group the data, binning will create a new column named `bins`. It is only possible to bin based
on one column.

## Instructions

| Type   | Description                            | Result                        |
| ------ | -------------------------------------- | ----------------------------- |
| Object | Object containing binning instructions | Returns new grouped dataframe |

## Usage

The binning transformation takes an object specifying the parameters of the binning method used,
and returns a new dataframe with two columns:

1. a column called `'bins'`, that contains the `[lowerbound, upperbound]` of the
bins as [interval](../concepts/data-loading#data-types) data type.
2. a column called `'grouped'`, that contains the data that is inside of each
bin as [nested](../concepts/data-loading#data-types) data type.

## Keys

```js
{ binning: { groupBy: ..., method: ..., ... } }
```

All binning transformations must specify the following keys:

Key       | Required  | Default         | Type      |  Description
----------|-----------|-----------------|-----------|----------------------------
groupBy   | true      | undefined       | String    | Name of data variable on which to perform binning
method    | false     | 'EqualInterval' | String    | Method of binning to use

## Additional Method Keys

Different binning methods may require additional keys.

### IntervalSize

The `IntervalSize` method groups data into bins of a given size.

Key       | Required  | Default         | Type      |  Description
----------|-----------|-----------------|-----------|----------------------------
binSize   | false     | 1               | Number    | Size of each bin

::: v-pre
```html{3-4}
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="{ binning: { groupBy: 'a',
                           method: 'IntervalSize', binSize: 3 } }"
>
```
:::

bins      | grouped                                    |
----------|--------------------------------------------|
[1, 4]    | { a: [1, 2, 3, 4], b: [8, 9, 10, 11] }     |
[4, 7]    | { a: [5, 6], b: [12, 13] }                 |

### EqualInterval

The `EqualInterval` method groups data into a given number of equal sized bins.

Key       | Required  | Default         | Type      |  Description
----------|-----------|-----------------|-----------|----------------------------
numClasses| false     | 5               | Number    | Number of bins

::: v-pre
```html{3-4}
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="{ binning: { groupBy: 'a',
                           method: 'EqualInterval', numClasses: 3 } }"
>
```
:::

bins      | grouped                             |
----------|-------------------------------------|
[1, 3]    | { a: [1, 2, 3], b: [8, 9, 10] }     |
[3, 5]    | { a: [4, 5], b: [11, 12] }          |
[5, 7]    | { a: [6, 7], b: [13, 14] }          |

### StandardDeviation | ArithmeticProgression | Geometric Progression | Quantile | Jenks

These classification methods are adapted from [geostats](https://github.com/simogeo/geostats) and share a similar syntax.

Key       | Required  | Default         | Type      |  Description
----------|-----------|-----------------|-----------|----------------------------
numClasses| false     | 5               | Number    | Number of bins

::: v-pre
```html{3-4}
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="{ binning: { groupBy: 'a',
                           method: 'StandardDeviation', numClasses: 3 } }"
>
```

### Manual

The `Manual` method groups data into user-defined ranges.

Key          | Required  | Default         | Type      |  Description
-------------|-----------|-----------------|-----------|----------------------------
manualClasses| true      | undefined       | Array     | An array of bin boundaries

::: v-pre
```html{3-4}
<vgg-data
  :data="{ a: [1, 2, 3, 4, 5, 6, 7], b: [8, 9, 10, 11, 12, 13, 14] }"
  :transform="{ binning: { groupBy: 'a',
                           method: 'Manual', manualClasses: [1, 5, 7] } }"
>
```

bins      | grouped                                           |
----------|---------------------------------------------------|
[1, 5]    | { a: [1, 2, 3, 4, 5], b: [8, 9, 10, 11, 12] }     |
[5, 7]    | { a: [6, 7], b: [13, 14] }                 |
