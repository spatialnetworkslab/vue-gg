---
title: Symbol mark
---
# Symbol mark
The Symbol mark is used for plotting point data, with each data instance being represented as a symbol (or shape) element. The most common use for the Symbol mark is for creating points such as used in a scatterplot.

<CodeDemoLayout>

<MarkSymbolSimple />

<CodeLayout width="40%">

```html
<vgg-map v-slot="{ row }">

	<vgg-symbol
	    :x="row.xValues"
	    :y="row.yValues"
	    shape="circle"
	    fill="#c66366"
	/>

</vgg-map>
```

</CodeLayout>

</CodeDemoLayout>

## Properties

### Positioning

| Prop     | Input                        | Required            | Types                  | Default   | Unit(s)           |
|--------- | ---------------------------- | ------------------- | ---------------------- | --------- | ----------------- |
| x        | x coordinate                 | see [Usage](#usage) | [Number, String, Date] | undefined | Local coordinates |
| y        | y coordinate                 | see [Usage](#usage) | [Number, String, Date] | undefined | Local coordinates |
| geometry | GeoJSON object of type Point | see [Usage](#usage) | Object                 | undefined | Local coordinates |

### Other aesthetics

| Prop           | Required | Types  | Default   | Description    | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| stroke         | false    | String | undefined | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | undefined | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | undefined | Stroke opacity | Number between 0 to 1      |
| fill           | false    | String | 'black'   | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | undefined | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | undefined | Mark opacity   | Number between 0 and 1     |
| shape          | false    | String | 'circle'  | Shape of the symbol           |             |
| size           | false    | Number | 10        | Length and width of the symbol| Screen pixel|

Most of these are analogous to the CSS properties of the same names.

### Other properties

| Prop        | Required | Types   | Default | Description                                                              |
| ----------- | -------- | ------- | ------- | ------------------------------------------------------------------------ |
| transition  | false    | Number  | 0       | Time taken to animate changes to each symbol when data changes           |

## Events

| Event     | Description                                   |
| --------- | --------------------------------------------- |
| click     | Triggered when user clicks on mark            |
| hover     | Triggered when user hovers over mark          |
| mouseover | Triggered when user's mouse is above mark     |
| mouseout  | Triggered when user's mouse leaves mark       |
| select    | Triggered when mark is selected               |
| deselect  | Triggered when mark is removed from selection |

For more information on these events, see the [Interactivity](../concepts/interactivity.md)
documentation.

## Usage

### Positioning

To render the Symbol mark, you will need to provide the `x` and `y` props or the `geometry` mark.

`x` and `y` can be used with data types `Number`, `String` and `Date`, depending on the parent Section's domain type. `geometry` should be used for geographic data containing GeoJSON [Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) objects only. To render other geometry types, see the overview on [Geo marks](geomarks.md).

Data is passed to the `x`, `y` and `geometry` props via row mapping, which renders one mark per data row. For a more in-depth explanation on how mapping works, see the [Map](../core/map.html#description) section under Core components. 

### Other aesthetics

The `shape` prop sets the shape of the symbol mark. The value defaults to `circle`
but can be set to any of the available options. Some pre-defined shapes include `square`, `cross`, `diamond`, `triangle-up`, `triangle-down`, `triangle-left`, `triangle-right` and `star`.

For a full list of options, refer to [shape](../scales/shape.md) documentation. Additionally, it is possible to provide a custom shape, specified as a SVG path string with coordinates scaled to [-1, 1] both horizontally and vertically.

`size` defaults to 10px. This same value refers to both the height and width of
the shape. In order to improve the accuracy when reading off the (x, y) values
of the center point of each symbol instance, the height and width of the symbol
mark are not allowed to take on different values.

### Other properties

`transition` is disabled by default. It can be set to take an arbitrary length
of time in seconds.

## Example

<MarkSymbolDemo />
