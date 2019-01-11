---
title: Making a Custom Graph
---

# Making a Custom Graph

This tutorial walks through the steps of using library components to create a custom graph when template graphs are insufficient for visualizing a certain data set.


fruit     | diameter | |fruit     | diameter |
----------|----------|-|----------|----------|
 lime     | 4.7      | | lime     | 4.7      |                            
 lemon    | 6.1      | |grapefruit| 8.8      |
grapefruit| 7.9      | | pomelo   | 12.5     |
 lemon    | 6.6      | |grapefruit| 12.7     |
 orange   | 6.7      | |grapefruit| 8.6      |
 lemon    | 5.3      | | pomelo   | 13.1     |
 pomelo   | 11.6     | | lime     | 5.8      |
grapefruit| 11.1     | | orange   | 8.9      |
 lime     | 5.5      | |grapefruit| 9.1      |
 pomelo   | 10.6     | | pomelo   | 10.3     |
 lemon    | 6.4      | |grapefruit| 9.4      |

## Formatting Data

The data accepted by the library components takes the form of an array of objects, where each object contains the `key`:`value` pairs per instance (row).

For example, the data above would be structured as such:

```js
let data = []
```

<br />

## Defining Graphic

Start by importing and defining the graphic component. The plot component takes the `data`, `width` and `height` props. This should create an empty svg on the page with the height and width provided.

```vue{2-8}
<template>
</template>
```

<br />

## Adding Sections

## Using Transformations

## Mapping Marks

## Drawing Axes and Title

Complete the graph by giving it a title and axes.

## Legends