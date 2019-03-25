---
title: Using Transformations
---

# Using Transformations

Sometimes the data needs to be transformed before being used in a layer. A number of transformations can be applied for this purpose, for full details of each refer to the Transformations section of the docs.

This tutorial will walk through the steps needed to create a graph of the mean diameters of each category of fruit in the following dataset:


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

As mentioned in the [first tutorial](./basic.md), the data accepted by the library components takes the form of an array of objects, where each object contains the `column_name`:`value` pairs per instance (row).

The above data, for example, should be pre-processed into the following structure:

```js
let fruits_data = [{ fruit: 'lime', diameter: 4.7 },
	 			   { fruit: 'lemon', diameter: 6.1 },
	 			   { fruit: 'grapefruit', diameter: 7.9 },
	 			   ...
	 			   { fruit: 'grapefruit', diameter: 9.4 }]
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

In this case, the `summarise` transformation is suitable for our purposes. However, simply using `summarize` and asking for the `mean` of the `diameter` variable will throw an error.

```html{6-9}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	/* This throws an error */

	<vgg-data
      :transform="{ summarise: { meanDiameter: { diameter: 'mean' } } }" >

    	<vgg-section
	        :x1="50"
	        :x2="650"
	        :y1="50"
	        :y2="350"
	    >

	        <vgg-map v-slot="{ row }">

				<vgg-point
					:x="{ val: row.fruit, scale: 'fruit' }"
					:y="{ val: row.meanDiameter, scale: 'meanDiameter' }"
					fill="#63a5d8"
					:radius="4"
				/>

	        </vgg-map>

	        <vgg-x-axis scale="fruit" />

	        <vgg-y-axis scale="meanDiameter" :tickCount="4" />

	    </vgg-section>

	</vgg-data>

</vgg-graphic>
```

In this case, the error can be traced back to the data output of the transformation:

```js
{ meanDiameter: [ some_value ] }
```

The documentation for each transformation includes details about the data scope output from each transformation. For further details on the `summarise` transformation, refer to its [documentation](../transform/summarise.md).

Note that because we asked for the `mean` of the `diameter` variable, only a single mean is calculated from all the diameters in the original dataset. There is no intuitive way of graphing this result. Besides, it is better presented textually than as a graph.

What we want to do is calculate the mean of each category of fruit. As such, the transformation we want is `groupBy` followed by `summarise` such that the original data is first grouped by type of fruit before the mean value is calculated for each group/category.

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

    	<vgg-section
	        :x1="50"
	        :x2="650"
	        :y1="50"
	        :y2="350"
	    >

	        <vgg-map v-slot="{ row }">

				<vgg-point
					:x="{ val: row.fruit, scale: 'fruit' }"
					:y="{ val: row.meanDiameter, scale: 'meanDiameter' }"
					fill="#63a5d8"
					:radius="4"
				/>

	        </vgg-map>

	        <vgg-x-axis scale="fruit" />

	        <vgg-y-axis scale="meanDiameter" :tickCount="4" />

	    </vgg-section>

	</vgg-data>

</vgg-graphic>
```

<TutorialTransformation />