---
title: Layouts and Interactions
---

# Layouts and Interactions

Interactions are a great way for users to explore a visualization and draw insights from the data. The vue-gg library makes it possible to add a variety of interactions to marks, and to track and respond to these changes.

This tutorial will walk through the steps needed to create a [scatterplot matrix](https://en.wikipedia.org/wiki/Scatter_plot#Scatterplot_matrices) such that hovering over a point on one graph highlights its corresponding position on all other graphs.

In addition to the components introduced in the previous tutorials, this tutorial will also introduce the `<vgg-repeat>` component that is used to layout the graphs in a matrix.

The [iris dataset](https://en.wikipedia.org/wiki/Iris_flower_data_set#Data_set) will be used for this tutorial. Information on data formatting can be obtained from the previous tutorials.

## Creating a Layout Matrix

The `<vgg-repeat>` component provides a quick and easy way to arrange graphs in a matrix layout. By defining the variables to use across the x dimension and down the y dimension, the component combinatorially creates a matrix of graphs using the variables provided.

```html{3-4}
<vgg-repeat
	v-slot="{ x, y }"
	:x="['sepal length', 'sepal width', 'species']"
	:y="['petal length', 'petal width', 'species']"
	:cell-padding="10"
	:sides="['right', 'bottom']"
>

</vgg-repeat>
```

<tutorial-layout />

## Adding Graphs to Matrix

Adding graphs to the matrix is as simple as defining sections and marks in the usual syntax with one caveat:

Within the `<vgg-repeat>` component, variables used along the x and y dimensions vary across matrix rows and down matrix columns. As such, we use `x` and `y` to refer to the variables, instead of the variable names that are used in general graph specification.

```html{9-32}
<vgg-repeat
	v-slot="{ x, y }"
	:x="['sepal length', 'sepal width', 'species']"
	:y="['petal length', 'petal width', 'species']"
	:cell-padding="10"
	:sides="['right', 'bottom']"
>

	<vgg-section
		:axes="{
            right: { scale: y, flip: true, tickCount: 5,
            		 title: y, titleAngle: -90, titleHjust: 4.5 },
            bottom: { scale: x, labelRotate: true, tickCount: 5,
            		 title: x, titleVjust: -3 }
          }"
	>

		<vgg-map v-slot="{ row }">

			<vgg-point
				:x="{ val: row[x], scale: x }"
				:y="{ val: row[y], scale: y }"
				:radius="3"
			/>

		</vgg-map>

    </vgg-section>

</vgg-repeat>
```

<tutorial-layout :showCombi="false" />

## Variable Specific Scales

Suppose that we want to expand the numerical scales such that they start from 0, i.e `domainMin: 0`. We cannot just add it to the axes or the point mark scale since the specification will be applied to all variables, which would throw an error when the variable is categorical, such as `species`.

```html
/* this throws an error */...

<vgg-point
	:x="{ val: row[x], scale: { val: x, domainMin: 0 } }"
	:y="{ val: row[y], scale: { val: y, domainMin: 0 } }"
	:radius="3"
/>
```

Instead, what we want to do is to define new scales using the `<vgg-scale>` component. This should be done before the `<vgg-repeat>` component is created.

```html{1-9}
<vgg-scales :scales="{ 'sepal length scale': { domain: 'sepal length',
											   domainMin: 0 } }" />
<vgg-scales :scales="{ 'sepal width scale': { domain: 'sepal width',
											  domainMin: 0 } }" />
<vgg-scales :scales="{ 'petal length scale': { domain: 'petal length',
											   domainMin: 0 } }" />
<vgg-scales :scales="{ 'petal width scale': { domain: 'petal width',
											  domainMin: 0 } }" />
<vgg-scales :scales="{ 'species scale': { domain: 'species' } }" />

<vgg-repeat
	v-slot="{ x, y }"
	:x="['sepal length', 'sepal width', 'species']"
	:y="['sepal length', 'sepal width', 'species']"
	:cell-padding="10"
	:sides="['right', 'bottom']"
>

	/* details omitted */...

</vgg-repeat>
```

Notice that the numerical scales are different from the `species` scale. Furthermore, all scales are named in the style of `variable name` + `'scale'`. This is to help the process of referencing the scales later within the `<vgg-repeat>` component.

It is now possible to use these custom scales with the appropriate use of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

```html{5,7,14-18}
/* vgg-repeat specification omitted */...

<vgg-section
	:axes="{
		right: { scale: `#${y} scale`, flip: true, tickCount: 5,
				 title: y, titleAngle: -90, titleHjust: 4.5 },
		bottom: { scale: `#${x} scale`, labelRotate: true, tickCount: 5,
				  title: x, titleVjust: -3 }
	}"
>

	<vgg-map v-slot="{ row }">

		<vgg-point
			:x="{ val: row[x], scale: `#${x} scale` }"
			:y="{ val: row[y], scale: `#${y} scale` }"
			:radius="3"
		/>

	</vgg-map>

</vgg-section>
```

<tutorial-layout :scaleSpecial="true" :showCombi="false" />

## Interactions

The graph looks pretty nice as is, but it is hard to identify which points are from the same data observation across different graphs. It would be nice to add some interactions such that hovering over a single point highlights the corresponding points on all other graphs.

In order to do this we can attach the `@hover` event to the `<vgg-point>` mark.

```html{4}
<vgg-map v-slot="{ row }">

	<vgg-point
		@hover="handleHover($event, row)"
		:x="{ val: row[x], scale: `#${x} scale` }"
		:y="{ val: row[y], scale: `#${y} scale` }"
		:radius="3"
	/>

</vgg-map>
```

The `@hover` event calls the `handleHover` function each time a point is being hovered over. Notice that we pass `($event, row)` to the `handleHover` function. This provides information about the event (such as screen coordinates) and allows us to keep track of the data row that corresponds to the point being hovered over.

In the script, we can thus create the `hovered` and `hoverRow` variables that keep track of whether a hover is taking place, and if so, which the data point that is triggering the hover.

This is not prescriptive, you can define and keep track of any number of variables relevant to the interaction event.

```js
data () {
	return {
		hovered: undefined,
		hoverRow: undefined
	}
},
```

We also want to create the `handleHover` event that changes these variables when hovering is taking place.

```js
methods: {
	handleHover(e, r) {
		this.hovered = e ? { r } : undefined
			if (this.hovered) {
			this.hoverRow = r
		} else {
			this.hovered = undefined
			this.hoverRow = undefined
		}
	}
}
```

Lastly, we want to add a `<vgg-point>` mark to the template that renders a single point only when `hoverRow !== undefined`. That is to say, when hovering is taking place, an extra point is rendered on each graph at the position of the corresponding point.

```html{21-27}
/* vgg-repeat specification omitted */...

<vgg-section
	:axes="{
		right: { scale: `#${y} scale`, flip: true, tickCount: 5,
				 title: y, titleAngle: -90, titleHjust: 4.5 },
		bottom: { scale: `#${x} scale`, labelRotate: true, tickCount: 5,
				  title: x, titleVjust: -3 }
	}"
>

	<vgg-map v-slot="{ row }">

		<vgg-point
			@hover="handleHover($event, row)"
			:x="{ val: row[x], scale: `#${x} scale` }"
			:y="{ val: row[y], scale: `#${y} scale` }"
			:radius="3"
		/>

		<vgg-point
			v-if="hoverRow"
			:x="{ val: hoverRow[x], scale: `#${x} scale` }"
			:y="{ val: hoverRow[y], scale: `#${y} scale` }"
			fill="red"
			:radius="3"
		/>

	</vgg-map>

</vgg-section>
```

<tutorial-interaction />