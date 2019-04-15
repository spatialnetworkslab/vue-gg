---
title: Point mark
---

# Point Mark

The `vgg-point` mark is used to plot simple point elements. It is a special case of the more general [Symbol mark](./symbol.md) that is made available on its own for convenience.

<CodeDemoLayout>

<MarkPointSimple />

<CodeLayout>

```html
<vgg-point
  :x="row.xValue"
  :y="row.yValue"
  fill="#c66366"
/>
```
</CodeLayout>

</CodeDemoLayout>

## Properties

### Positioning

| Prop     | Required | Types                  | Default   | Description                     | Unit(s)           |
| -------- | -------- | ---------------------- | --------- | ------------------------------- | ----------------- |
| x        | depends  | [Number, String, Date] | undefined | x-coordinate of center of point | Local coordinates |
| y        | depends  | [Number, String, Date] | undefined | y-coordinate of center of point | Local coordinates |
| geometry | depends  | Object                 | undefined | GeoJSON object of type Point    | Local coordinates |

### Other aesthetics

| Prop           | Required | Types  | Default   | Description    | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| radius         | false    | Number | 3         | Radius length  | Screen pixel               |
| stroke         | false    | String | 'none'    | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | 0         | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | 1         | Stroke opacity | Number between 0 and 1     |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | 1         | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | 1         | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other props

| Prop       | Required | Types  | Default | Description                                                   |
| ---------- | -------- | ------ | ------- | ------------------------------------------------------------- |
| transition | false    | Number | 0       | Time taken to animate changes to each point when data changes |

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

To render the Point mark, you will need to provide the `x` and `y` or the `geometry` props. The two uses are mutually exclusive. `x` and `y` can be of type `Number`, `String` and `Date`, depending on the domain type of the parent Section. `geometry` accepts GeoJSON Point objects only. To render other geometry types, see documentation on the [Multi-line](multi-line.md) and [Polygon](polygon.md) marks.


## Example

<MarkPointAdvanced/>