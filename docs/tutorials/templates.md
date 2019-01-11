---
title: Using Template Graphs
---

# Using Template Graphs

The vue-gg library comes with a range of pre-made template graphs that cover the most common types of graphs that may be used in data visualization. Often times, it may be sufficient to import and use one of these templates instead of assembling a new graph from separate components.

A full list of template graphs can be accessed under the Template Graphs section of the docs.

## Formatting Data

The data accepted by the library components takes the form of an array of objects, where each object contains the `key`:`value` pairs per instance (row).

Given a raw data set of values:

```js
let rawData = [349, 251, 511, 70, 525,
			113, 23, 376, 360, 387,
			139, 447, 317, 68, 139,
			543, 72, 548, 427, 473,
			100, 116, 522, 446, 193,
			21, 150, 367, 497, 467,
			411, 394, 551, 443, 201,
			365, 417, 409, 297, 272,
			212, 295, 382, 5, 502,
			296, 466, 427, 218, 309]
```

The data should be pre-processed into the following structure:
```js
let data = []
```

<br />

## Import Graph

Like all Vue components, the template graphs can be used by simply importing them into a .vue file.

```vue{2}
<script>
	import Histogram from '...'
</script>
```

<br />

## Provide Props

Each template graph takes its own set of props. Details of required and optional props can be found in the docs for that graph type. Props can be provided the usual way for customary Vue components.

The following example uses a template histogram and passes it some random data for the `data` prop.

```vue{3-10}
<template>
</script>
```