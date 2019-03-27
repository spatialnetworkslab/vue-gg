---
title: Scaling
---

# Introduction

Scaling options are used to quickly create scales in various places, like the
[Scale](../core/scales.md) component, the [Section](../core/section.md) component
and inside the [mapping object](../core/map.md#the-mapping-object).

# Options

### Defining and reusing

```js
{ scale: ... }
```

There are four ways to specify a scale:

- By passing an object of options
- By passing the name of a data column as a String
- By creating a scale in advance and referencing its String ID.
- By passing an Array.

The method of passing an object of options will be discussed under [Properties](#options).
The other two will be discussed under [Usage](#usage).

### Properties

| Property   | Required | Types             | Default   | Description                                                                               |
| ---------- | -------- | ----------------- | --------- | ----------------------------------------------------------------------------------------- |
| domain     | true     | [Array, String]   | undefined | Array containing domain boundaries, or a String referencing a column.                     |
| type       | false    | String            | depends   | Type of scale.                                                                            |
| domain-min | false    | Number            | undefined | Lower domain boundary. Used to overwrite `domain`.                                        |
| domain-max | false    | Number            | undefined | Upper domain boundary. Used to overwrite `domain`.                                        |
| domain-mid | false    | Number            | undefined | Mid-point of domain. Useful for creating diverging scales.                                |
| range-min  | false    | Number            | undefined | Lower range boundary. Used to overwrite chosen range.                                     |
| range-max  | false    | Number            | undefined | Upper range boundary. Used to overwrite chosen range.                                     |
| absolute   | false    | Boolean           | false     | Will treat negative values as positive.                                                   |
| reverse    | false    | Boolean           | false     | Will reverse the order of the scale/domain                                                |
| nice       | false    | [Boolean, Number] | true      | Extends the domain to start/stop on nice, round values. Boolean or the desired tick count |
| order      | false    | Array, Function   | undefined | For categorical domains: domain order                                                     |

##### domain

The `domain` is the only required scaling option. It can be specified as an Array or
as a String. When using an array, it is allowed to use

- An array of length 2 containing only Numbers
- An array of length > 1 containing only Strings
- An array of length 2 containing only Dates

These correspond to the quantitative, categorical and temporal data types.
When using a String, make sure the data column that is referenced contains one
of these types too. It is, for example, not allowed to use `grouped` columns.
As for `geometry` columns: using these is allowed as long as long as you clarify
whether you want to use the x or y domain. For example, `'geometry.x'` is allowed,
`'geometry'` is not. The x and/or y domains of the geometry will be treated as
quantitative.

##### type

When the `type` property is not specified, `vue-gg` will try its best to pick
a good scale by default. To make a good choice, it takes into account the `domain`
type (quantitative, categorical, temporal) and the `range` type (color, coordinate,
radius). The defaults for all combinations of `domain` and `range` types are
discussed under [Defaults](#defaults). The `type` property can be used to overwrite
these defaults, but make sure that you reference scales that are allowed for the
domain and range types in question (you cannot, for example, use `'linear'` when
using a categorical domain).

##### domainMin and domainMax

These can be used to overwrite the domain selected under `domain`. `domainMin` is
commonly used when creating bar charts, where the bar heights have to start at
zero instead of at the lowest value in the data.

##### domainMid

`domain-mid` will be used as a central point between the upper and lower boundaries
of the domain to create a [diverging](https://github.com/d3/d3-scale#diverging-scales)
scale.

##### rangeMin and rangeMax

When the `range-min` and `range-max` properties are not specified, `vue-gg` will
pick a range depending on the context where the scale is being created. When
the scale is used within the `scale-x` or `scale-y` props of a
[Section](../core/section.md), the range will be the dimensions of the Section
(for example, for `scale-x`, the values of the `[x1, x2]` props). The lower and
upper boundaries of this automatically determined range can then be manually
overwritten with respectively `range-min` and `range-max`.

##### absolute

This will treat all negative values that are passed through the scales as positive
values. Using `absolute` will also have effect on the domain. For example,
the column `[-5, -2, 1, 3, 4]`, which has domain `[-5, 4]`, will be treated as
`[5, 2, 1, 3, 4]`, with the domain `[1, 5]`. This domain can then again be
overwritten with `domain-min` and `domain-max`.

##### order

Adds ordering to categorical data. Can be specified as an Array with the
desired order, or as a Function that takes the chosen domain as first argument,
and returning a new Array with the desired order:

```js
// Array
{ scale: { domain: ..., order: ['apple', 'banana', 'pear'] } }

// Function
{ scale: { domain: ..., order: oldDomain => { oldDomain.sort(); return oldDomain } } }
```

Note that the new order will replace the existing domain. So data values not listed
in the new order will return `undefined`, which could cause errors for required props.

When using in combinat

### Defaults

See [prop types]() to see which props fall under
which types.

| Prop type  | quantitative | categorical | temporal | interval: quantitative |
| ---------- | ------------ | ----------- | -------- | ---------------------- |
| coordinate | linear       | equidistant | temporal | linear                 |
| color      | blues        | category10  | NA       | blues                  |
| opacity    | linear       | fullExtent  | NA       | fullExtent             |
| radius     | squareRoot   | fullExtent  | NA       | fullExtent             |
| other      | linear       | fullExtent  | NA       | fullExtent             | 

# Usage

### Column name shorthand

A nice shorthand that will in many cases suffice is the 'column name' String.
Instead of passing an entire object, it is possible to just pass the name of the
column of which you want to use the domain:

::: v-pre
```html
<vgg-point :x="{ val: row.a, scale: 'a' }" />
```
:::

this will be converted to

::: v-pre
```html
<vgg-point :x="{ val: row.a, scale: { domain: 'a' } }" />
```
:::

### Referencing scales using `#`

The Scales component is used to create scales in one place,
which can then be referenced in other places. See the documentation of the
[Scales](../core/scales.md) component for more information.

### Using a domain Array

Setting a custom domain using an Array is commonly used in combination with
the [Section](../core/section.md) component.
