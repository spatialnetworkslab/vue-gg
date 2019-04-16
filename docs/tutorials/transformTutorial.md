---
title: Using Transformations
---

# Using Transformations

Sometimes the data needs to be transformed before being used in a layer. A number of transformations can be applied for this purpose, for full details of each refer to the Transformations section of the docs.

This tutorial will walk through the steps needed to create a [boxplot](https://en.wikipedia.org/wiki/Box_plot) of the distribution of diameters of each category of fruit in the following dataset:


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

As mentioned in the [first tutorial](./basic.md), the data accepted by the library components can either by organized by row or by column.

To pass in data by row, the data should take the form of an array of objects, where each object contains the `column_name`:`value` pairs per instance (row).

To pass in data by column, the data should be a single object of `column_name`:`[ value1, value2, value3 ...]` where all the values in a column are included in an array accessible by column name.

**Passing in data by column is the preferred format as it reduces the amount of pre-processing needed.** The above data, for example, should be pre-processed into the following structure:

```js
data () {
	return {
		fruits_data: {	fruit: ['lime', 'lemon', 'grapefruit', ..., 'grapefruit'],
						diameter: [4.7, 6.1, 7.9, ..., 9.4] }
	}
	
}
```

For further details on data loading and formatting, refer to the [documentation](../concepts/data-loading.md).

## The Data Component

The `vgg-data` component can be used to specify new datasets or transform the current dataset.

All components declared within the opening and ending tags of `vgg-data` will use the new or transformed dataset.

```html{6-11}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-data>

		/* All components here use the new or transformed dataset
		/* fruits_data is overridden

	</vgg-data>

</vgg-graphic>
```

For further details on the data component, refer to the [documentation](../core/data.md).

## Specifying Transformations

In order to transform the data, we need to specify the `transform` property in the data component.

In this case, we want to calculate the summary statistics (min, q1, mean, q3, max) of each category of fruit. As such, the transformation we want is `groupBy` followed by `summarise` such that the original data is first grouped by type of fruit before the mean value is calculated for each group/category.

This can be done by specifying an array of transformations. Transformations are applied in order of specification, so the `groupBy` transformation will be applied before `summarise`.

```html{6-11}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-data
		:transform="[
			{ groupBy: 'fruit' },
			{ summarise: { meanDiameter: { diameter: 'mean' } } }
		]"
    >

	</vgg-data>

</vgg-graphic>
```

## Using Custom Functions

Note that we want more than just the mean diameter of each category of fruit, thus the `summarise` transformation should specify multiple summary statistics. The predefined statistics `min`, `max` and `mean` can be used as is, however, we need to defined our own methods to calculate the values of `q1` and `q3`.

For specifics of the `summarise` transformation, refer to the docs [here](../transform/summarise.md). There are many other transformations that can apply custom functions to the dataset, some of these include `mutate`, `mutarise` and `filter`.

:::v-pre
```html{10-11,26-34}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-data
		:transform="[
			{ groupBy: 'fruit' },
			{ summarise: { meanSize: { diameter: 'mean' },
	                       q1Size: { diameter: getQ1 },
	                       q3Size: { diameter: getQ3 },
	                       minSize: {diameter: 'min' },
	                       maxSize: {diameter: 'max' } } }
		]"
    >

	</vgg-data>

</vgg-graphic>

<script>
import * as d3 from 'd3-array'

export default {
	methods: {
	    getQ1 (col) {
			let sorted = col.sort((a, b) => a - b)
			return d3.quantile(sorted, 0.25)
	    },

		getQ3 (col) {
			let sorted = col.sort((a, b) => a - b)
			return d3.quantile(sorted, 0.75)
		},
	}
}
```
:::

The data object after the transformations now looks something like this:

fruit       | minSize     | q1Size     | meanSize     | q3Size     | maxSize     |
------------|-------------|------------|--------------|------------|-------------|
'lime'      | 4.7         | 4.85       | 5.225        | 5.575      | 5.8         |
'lemon'     | 5.3         | 5.90       | 6.1          | 6.45       | 6.6         |
'grapefruit'| 7.9         | 8.7        | 9.657        | 10.25      | 12.7        |
'orange'    | 6.7         | 7.25       | 7.8          | 8.35       | 8.9         |
'pomelo'    | 10.3        | 10.6       | 11.62        | 12.5       | 13.1        |

## Transformations and Marks

The new data columns can be used within the `<vgg-data>` component by referencing the column names. In the case of the `summarise` transformation, we named the new columns `minSize`, `q1Size`, `meanSize` etc. These column names can be used in marks as per usual.

Note that not all transformations allow users to define new column names. `groupBy` and `binning`, for example, create new data columns with fixed names.

Also note that we defined two scales `diameterScale` and `colorScale` outside of the transformation. The `diameterScale` is used to scale the transformed statistics to the original range of the `diameter` data column. It is defined before the transformation because after transformation (within the `<vgg-data>` component) the column called `diameter` no longer exists. The `colorScale` is defined simply for convenience.

```html{8-12,30-56}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-plot-title text="Distribution of Fruit Sizes" :vjust="0.95" />

    <vgg-scales :scales="{ diameterScale: 'diameter' }" />
    <vgg-scales :scales="{ colorScale: { 
    	ranges: ['#ffc300', '#ff9d26', '#c70039', '#900c3f', '#581845'],
    	domain: 'fruit' } }"
   	/>

	<vgg-data
		:transform="[
			{ groupBy: 'fruit' },
			{ summarise: { meanDiameter: { diameter: 'mean' } } }
		]"
    >

    	<vgg-section
	        :x1="50"
	        :x2="650"
	        :y1="50"
	        :y2="350"
	    >

	        <vgg-map v-slot="{ row }">

				<vgg-line
					:x1="{ val: row.fruit, scale: 'fruit' }"
					:x2="{ val: row.fruit, scale: 'fruit' }"
					:y1="{ val: row.minDiameter, scale: '#diameterScale' }"
					:y2="{ val: row.maxDiameter, scale: '#diameterScale' }"
					:stroke-width="1"
				/>

				<vgg-rectangle
					:x="{ val: row.fruit, scale: 'fruit' }"
					:w="50"
					:y1="{ val: row.meanDiameter, scale: '#diameterScale' }"
					:y2="{ val: row.q3Diameter, scale: '#diameterScale' }"
					:fill="{ val: row.fruit, scale: '#colorScale' }"
					stroke="black"
					:stroke-width="1"
				/>

				<vgg-rectangle
					:x="{ val: row.fruit, scale: 'fruit' }"
					:w="50"
					:y1="{ val: row.q1Diameter, scale: '#diameterScale' }"
					:y2="{ val: row.meanDiameter, scale: '#diameterScale' }"
					:fill="{ val: row.fruit, scale: '#colorScale' }"
					stroke="black"
					:stroke-width="1"
				/>

			</vgg-map>

	        /* axis details omitted */...

	    </vgg-section>

	</vgg-data>

</vgg-graphic>
```

<TutorialTransformation />