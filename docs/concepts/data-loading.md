---
title: Data loading
---

# Data Loading

To load data into `vue-gg`, pass data in a supported format to the `:data` prop
of any [Graphic](../core/graphic.md), [Data](../core/data.md) or
[Section](../core/section.md) component. This will create a [data scope](#data-scope)
for its child components.

## Data types

`vue-gg` supports 6 different data types: quantitative, categorical, temporal,
interval, geometry and nested. `vue-gg` will decide what data type your data is based on
what native JavaScript type it has, and for geometry and nested data, what structure
it has.

| Data type    | JS type                                         | Level of measurement (Smith Stevens) |
| ------------ | ----------------------------------------------- | ------------------------------------ |
| quantitative | Number                                          | Interval, Ratio                      |
| categorical  | String                                          | Nominal, Ordinal                     |
| temporal     | Date                                            | Interval                             |
| interval     | Array (length 2)                                | -                                    |
| geometry     | Object [(GeoJSON feature)](http://geojson.org/) | -                                    |
| nested       | Object (of Arrays)                              | -                                    |

## Data formats

While it is possible to load data in various formats into `vue-gg`, there are some
requirements that all data must adhere to:

- All columns must have the same length
- All columns have more than 0 valid values (invalid values being `NaN`, `null` etc)
- One column is only allowed to have one data type
- Column names are not allowed to have the characters `.`, `/` and `#`
- Data of the `geometry` type is only allowed in a column called `'geometry'`, and
a column called `'geometry'` must always have only data of the type `geometry`

### Tabular data: column-oriented vs row-oriented

Internally, `vue-gg` stores data in a column-oriented format. Or, in JavaScript
terms, an Object where each key is the column name and each value an array of all values for that column:

```js
{
  columnA: [1, 2, 3, 4],
  columnB: ['a', 'b', 'b', 'a']
}
```

It is recommended to pass data in this format when possible.
Alternatively, data can be passed in a row-oriented format, or an Array of Objects:

```js
[
  { columnA: 1, columnB: 'a' },
  { columnA: 2, columnB: 'b' },
  { columnA: 3, columnB: 'b' },
  { columbA: 4, columnB: 'a' }
]
```

Data passed in this format will internally be converted and stored as column-oriented
data. So when your data is originally in column-oriented format, passing it as
column-oriented data will save a little bit of conversion time.

### GeoJSON

When passing data in a [GeoJSON](http://geojson.org/) format, the GeoJSON data
will be converted to a column-oriented format. For every feature, the `geometry`
will be stored in a column called `geometry`, and all properties get their own
column.

## Data scope

### Using data scopes

When you load data into a [Graphic](../core/graphic.md), [Data](../core/data.md) or
[Section](../core/section.md) component, the component in question will create
a so-called data scope for its children. This data scope will be the same for
all its children until another data scope is created by one of its children.
For example:

::: v-pre
```html
<vgg-graphic
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
>

  <!--
    Here we are within the <vgg-graphic> component's data scope.
    We have access to the data { a: [1, 2, 3, 4], b: [5, 6, 7, 8] }
  -->

  <vgg-section>
    <!-- Here we are still within the <vgg-graphic> component's data scope. -->
  </vgg-section>

  <vgg-section
    :data="{ c: [11, 12, 13, 14], d: [15, 16, 17, 18] }"
  >

    <!-- Here we ware withing a new data scope: the <vgg-section>'s data scope. -->
    <!-- We have access to the data { c: [11, 12, 13, 14], d: [15, 16, 17, 18] } -->

  </vgg-section>

</vgg-graphic>
```
:::

Besides loading new data, another way to create a new data scope is using the
`:transform` prop to apply [transformations](./transforming-data.md) to the data:

::: v-pre
```html
<vgg-graphic
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
>

  <vgg-data
    :transform="{ filter: row => row.a > 2 }"
  >

    <!-- Here we ware withing a new data scope: the <vgg-data>'s data scope. -->
    <!-- We have access to the data { a: [3, 4], b: [7, 8] } -->

  </vgg-data>

</vgg-graphic>
```
:::

### Referencing domains from another data scope

In some cases, it can be handy to have access to columns from a different scope. To
access a different data scope, give the component that creates the scope you
are interested in an ID with the `dataID` prop. The data scope can then be accessed
from other data scopes using the `dataID` of the component, followed by `/`, and the
column name:

::: v-pre
```html
<vgg-graphic
  :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  dataID="parentData"
/>

  <vgg-data
    :transform="{ filter: row => row.a > 2 }"
  >

    <vgg-map v-slot="{ row }">

      <vgg-point
        :x="{ val: row.a, scale: { domain: 'a' } }"
        :y="{ val: row.b, scale: { domain: 'parentData/b' } }"
      />

      <!--
        In the x-direction, the points' scale will use the domain of the filtered data.
        In the y-direction, the points' scale will use the domain to the unfiltered data.
      -->

    </vgg-map>

  </vgg-data>

</vgg-graphic>
```
:::

Accessing another data scope is possible as long as the scope you want to access
was declared before you try to access it. This means that you can never access
child data scopes, and only access sibling data scopes if the sibling was declared
before the scope in question. For example:

::: v-pre
```html
<vgg-data dataID="before" :data="someData" />

<vgg-data :data="someOtherData" />
  <vgg-map v-slot="{ row }">
    <vgg-point :x="{ val: row.a, scale: 'before/a' }" />
  </vgg-map>
</vgg-data>
```
:::

is allowed, but

::: v-pre
```html
<vgg-data :data="someOtherData" />
  <vgg-map v-slot="{ row }">
    <vgg-point :x="{ val: row.a, scale: 'after/a' }" />
  </vgg-map>
</vgg-data>

<vgg-data dataID="after" :data="someData" />
```
:::

is not.
