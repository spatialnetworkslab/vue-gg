---
title: Creating Basic Graphs
---

# Creating Basic Graphs

The vue-gg library comes with a range of components that can be used to compose common graph types easily. Generally, most graphs use the following components:

* [Graphic](#graphic)
* [Section](#section)
* [Map](#map)
* A selection of the available [Marks](#marks)
* [Axes](#axes)

Optional:
* [Plot Title](#plot-title-optional)
* [Axis Title](#axis-title-optional)
* [X/Y Grid](#x-y-grid-optional)
* [Scales](#scales)

The following tutorial will walk through the steps needed to create a basic dot plot of this dataset:

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

The data accepted by the library components takes the form of an array of objects, where each object contains the `column_name`:`value` pairs per instance (row).

Given the above data, for example, should be pre-processed into the following structure:

```js
let fruits_data = [{ fruit: 'lime', diameter: 4.7 },
	 			   { fruit: 'lemon', diameter: 6.1 },
	 			   { fruit: 'grapefruit', diameter: 7.9 },
	 			   ...
	 			   { fruit: 'grapefruit', diameter: 9.4 }]
```

For further details on data loading and formatting, refer to the [documentation](../concepts/data-loading.md).

## Graphic

The `vgg-graphic` component is used in all vue-gg graphs. The component is declared first, and takes the `width`, `height` and `data` properties.

This creates an empty svg canvas of the given `width` and `height`.

The `data` property is passed to all children in the `vgg-graphic` component. Currently there are none.

```html
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

</vgg-graphic>
```

For further details on the graphic component, refer to the [documentation](../core/graphic.md).

## Section

The `vgg-section` component divides the graphic (or canvas) up into subsections. Each subsection can contain its own graph with its own variables, axes etc.

It is sometimes convenient to use `vgg-section` instead of declaring `vgg-graphic` multiple times when the sub-graphs use the same dataset (faceting), or when user interactions are meant to be reflected across multiple graphs.

In this example, we declare a single `vgg-section` since only a single graph is being created.

```html{6-12}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-section
		:x1="50"
        :x2="650"
        :y1="50"
        :y2="350">

	</vgg-section>

</vgg-graphic>
```

For further details on the section component, refer to the [documentation](../core/section.md).

## Map

The `vgg-map` component is similar to the `v-for` directive.

All components that are declared within a `vgg-map` component is rendered either once per data row or once per data column.

In this example, the graph should render a single point per data row, this should be specified as follows:

```html{12-14}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-section
		:x1="50"
        :x2="650"
        :y1="50"
        :y2="350">

        <vgg-map v-slot="{ row }">

	    </vgg-map>

	</vgg-section>

</vgg-graphic>
```

In order to draw one mark per data column, refer to the map component documentation [here](../core/map.html#mapping-an-entire-dataframe).

## Marks

Now in order to actually render a point per row in the dataset, we need to specify the mark to use in the map component.

In this case, the `vgg-point` component is sufficient for our purposes, however there are a wide range of marks that are available. For details of each, refer to the marks section of the documentation.

```html{14-18}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-section
		:x1="50"
        :x2="650"
        :y1="50"
        :y2="350">

        <vgg-map v-slot="{ row }">

	        <vgg-point
				:x="{ val: row.fruit, scale: 'fruit' }"
				:y="{ val: row.diameter, scale: 'diameter' }"
				fill="#63a5d8"
	        />

	    </vgg-map>

	</vgg-section>

</vgg-graphic>
```

Note that the `vgg-point` component requires the `x` and `y` properties to be specified. This tells the component which data variable to use as the x and y coordinates of each point. As such, we specify the `val` to be `row.fruit` and `row.diameter` respectively.

We also specify the `scale` as the variable names `'fruit'` and `'diameter'`. This is **important** because the raw values need to scaled to screen coordinates.

(Consider that the x value of each point is some fruit name, it makes no sense to position the corresponding point at x coordinate `'lemon'` or `'grapefruit'` if these values are not first scaled to a reasonable screen coordinate in pixels.)

The graph should now look like this:

<TutorialBasic />

## Axes

Axes are always good to include as a reference for viewers to extract values from the graph. 

Axes can either be specified as a [property](../core/section.md) of the `vgg-section` component or they can be manually added using the `<vgg-x-axis>` and `<vgg-y-axis>` [components](../axes/cartesian.md).

When manually adding axes, make sure to specify the scale (variable) being used on each axis. Also ensure that the axis components are specified outside the map component, unless you really mean to render an axis per row or column of data.

```html{22-24}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-section
		:x1="50"
        :x2="650"
        :y1="50"
        :y2="350">

        <vgg-map v-slot="{ row }">

	        <vgg-point
				:x="{ val: row.fruit, scale: 'fruit' }"
				:y="{ val: row.diameter, scale: 'diameter' }"
				fill="#63a5d8"
	        />

	    </vgg-map>

	    <vgg-x-axis scale="fruit" />

	    <vgg-y-axis scale="diameter" />

	</vgg-section>

</vgg-graphic>
```

<TutorialBasic :step="1" />

## Plot Title (Optional)

Graphs usually come with titles describing the subject of the graph. This can be added using the `<vgg-plot-title>` component.

```html{6}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-plot-title text="Fruit Sizes" />

	<vgg-section>

		/* details omitted */...

	</vgg-section>

</vgg-graphic>
```

<TutorialBasic :step="2" />

For further details on customizing the appearance of the plot title, refer to the [documentation](../graphs/plot-title.md).

## Axis Title (Optional)

Similar to the plot title, titles can be added to the axes for additional readability. This can be specified as properties of the `<vgg-x-axis>` and `<vgg-y-axis>` components.

The `title-vjust` and `title-hjust` properties are used to position the axis title relative to the vertical and horizontal size of the axis. For further details, refer to the axes component [documentation](../axes/cartesian.html#title).

```html{21-23}
/* details omitted */...

	<vgg-y-axis scale="diameter"
				title="diameter/cm"
				:title-vjust="1.07"
				title-hjust="center"
    />

/* details omitted */...
```

<TutorialBasic :step="3" />

## X/Y Grid (Optional)

It is possible to add horizontal and vertical gridlines to the graph to help viewers read values off the graph. Like the axes, it is possible to specify gridlines either as a [property](../core/section.md) of the `vgg-section` component or to manually add gridlines using the `<vgg-x-grid>` and `<vgg-y-grid>` [components](../axes/gridlines.md).

When manually adding gridlines, make sure to specify the scale (variable) being used on each axis. Also specify the position of the gridlines. **Positioning of `<vgg-x-grid>` and `<vgg-y-grid>` is not done automatically**.

```html{12-26}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-section>

        /* details omitted */...

	</vgg-section>

	<vgg-x-grid
		:x1="50"
		:x2="650"
		:y1="50"
		:y2="350"
		scale="fruit"
    />

    <vgg-y-grid
		:x1="50"
		:x2="650"
		:y1="50"
		:y2="350"
		scale="diameter"
    />

</vgg-graphic>
```

<TutorialBasic :step="4" />

## Scales (Optional)

We have briefly discussed the necessity of scales in the Marks section above. Scales are necessary for converting raw values in the dataset (e.g. fruit name) into values that can be rendered on a screen (e.g. pixels).

However, scaling is not limited to changing data values into screen coordinates/pixels. Scaling can be done for a wide range of appearance aesthetics, such as color, shape and opacity. Different marks allow different aesthetics to be scaled. For details of each, refer to the marks and scales documentation.

In this case, the points on the graph can be scaled to display a different color for each category of fruit. To do so, the fill property on the `vgg-point` component can be changed from a single color to a scale, similar to the `x` and `y` properties.

```html{17-18}
<vgg-graphic
	:width="700"
	:height="500"
	:data="fruits_data">

	<vgg-section
		:x1="50"
        :x2="650"
        :y1="50"
        :y2="350">

        <vgg-map v-slot="{ row }">

	        <vgg-point
				:x="{ val: row.fruit, scale: 'fruit' }"
				:y="{ val: row.diameter, scale: 'diameter' }"
				:fill="{ val: row.fruit,
						 scale: { type: 'category10', domain: 'fruit' } }"
	        />

	    </vgg-map>

	    /* details omitted */...

	</vgg-section>

</vgg-graphic>
```

Note that there is an extra `type: 'category10'` specification passed to the scale. This simply tells the mark to use the 'category10' color scheme. This is one of many [predefined color schemes](../scales/color.md) in vue-gg. However, do note that certain color schemes can only be used with categorical variables, while others can only be used with numerical variables.

<TutorialBasic :step="5" />