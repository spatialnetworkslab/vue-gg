---
title: Polygon mark
---

# Polygon Mark

The `vgg-polygon` mark is used to plot polygonal elements. 

<CodeDemoLayout>

<MarkPolygonSimple />

<CodeLayout>

```html
<vgg-polygon
  :points="points"
  fill="008080"
  stroke="none"
/>
```

</CodeLayout>

</CodeDemoLayout>

## Properties

### Positioning

| Prop   | Required    | Types     | Default   | Description                                | Unit(s)           |
| ------ | ----------- | --------- | --------- | ------------------------------------------ | ----------------- |
| x      | depends  | Array | undefined | Array of x-coordinates for each polygon point           | Local coordinates |
| y      | depends  | Array | undefined | Array of y-coordinates for each polygon point           | Local coordinates |
| points | depends  | Array | undefined | Array of coordinate pairs [x, y] for each polygon point | Local coordinates |
| geometry | depends  | Object | undefined | GeoJSON object of type Polygon or MultiPolygon  | Local coordinates |

### Other aesthetics

| Prop           | Required    | Types  | Default   | Description    | Unit(s)                    |
| -------------- | ----------- | ------ | --------- | -------------- | -------------------------- |
| stroke         | false       | String | undefined | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false       | Number | undefined | Stroke width   | Screen pixel               |
| stroke-opacity | false       | Number | undefined | Stroke opacity | Number between 0 to 1      |
| fill           | false       | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false       | Number | undefined | Fill opacity   | Number between 0 and 1     |
| opacity        | false       | Number | undefined | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

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

The Polygon mark can be positioned in several mutually exclusive ways: by providing both `x` and `y` props, the `points` prop or the `geometry` prop. 

## Example

<MarkPolygonGeo />
