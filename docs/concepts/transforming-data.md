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

[Go to the select documentation](../transform/select.md)

### Rename

[Go to the rename documentation](../transform/rename.md)

### Filter

[Go to the filter documentation](../transform/filter.md)

### Drop NA

[Go to the drop NA documentation](../transform/dropna.md)

### Arrange

[Go to the arrange documentation](../transform/arrange.md)

### Mutate and transmute

[Go to the mutate/transmute documentation](../transform/mutate.md)

### Summarise

[Go to the summarise documentation](../transform/summarise.md)

### Mutarise

[Go to the mutarise documentation](../transform/mutarise.md)

### Group by

[Go to the group by documentation](../transform/groupby.md)

### Bin

[Go to the bin documentation](../transform/binning.md)
