---
title: Binning
---

# Transformation Specification

```
<vgg-transform
    :trans="[{ binning: { groupBy: 'apple', method: selected, numClasses: 5 } }]" >
```

# Binning

Binning is used within the `<vgg-transform`> tag. Similar to the groupBy transformation, binning groups the data into numeric bins. These bins can be determined one of the inbuilt methods/algorithms or provided manually as an array of [lowerBound, upperBound] ranges.

The binning transformation takes an object specifying the parameters of the binning method used.

# Keys

All binning transformations must specify the following keys:

Key       | Type      |  Description 
----------|-----------|----------------------------
groupBy   | String    | Name of data variable on which to perform binning
method    | String    | Type of binning to perform

# Additional Keys by Method

### IntervalSize

The `IntervalSize` method groups data into bins of a given size.

Key       | Type      |  Description 
----------|-----------|----------------------------
binSize   | Number    | Size of each bin

### EqualInterval

The `EqualInterval` method groups data into a given number of equal sized bins.

Key       | Type      |  Description 
----------|-----------|----------------------------
numClasses| Number    | Number of bins

### StandardDeviation, ArithmeticProgression, Geometric Progression, Quantile, Jenks
These classification methods are made available through [geostats](https://github.com/simogeo/geostats) (see geostats docs for details on each method). 
Key       | Type      |  Description 
----------|-----------|----------------------------
numClasses| Number    | Number of bins

### Manual

The `Manual` method groups data into user-defined ranges.

Key          | Type      |  Description 
-------------|-----------|----------------------------
manualClasses| Array     | An array of bin boundaries

