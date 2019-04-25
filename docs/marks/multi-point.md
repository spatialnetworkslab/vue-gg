---
title: Multi-point mark
---

# Multi-point mark

The `vgg-multi-point` mark is used to plot multiple points. While visually indistinct from the Point mark, it renders a series of points as a collective mark, as opposed to the Point mark which renders one point per mark.

<CodeDemoLayout>

<MarkMultiPointDemo />

<CodeLayout width="40%">

```vue
<vgg-multi-point
  :points="[
    [78, 44], [41, 43], [36, -37], [54, -17],
    [70, 29], [31, 0], [88, -50], [97, 15],
    [76, -34], [60, -47], [100, -24], [66, -2],
    [65, 4], [34, -10], [11, 50], [1, -11],
    [49, -49], [54, -40], [30, 49], [39, 39]
  ]"
/>
```

</CodeLayout>

</CodeDemoLayout>

## Properties

### Positioning

| Prop     | Input                             | Types  | Required                    |  Default  | Unit(s)            |
| -------- | --------------------------------- | ------ | --------------------------- | --------- |------------------- |
| points   | Array of coordinate pairs [x, y]  | Array  | see [Usage](#positioning-2) | undefined | Local coordinates  |
| geometry | GeoJSON object of type MultiPoint | Object | see [Usage](#positioning-2) | undefined | Local coordinates  |

### Other aesthetics

| Prop           | Required | Types  | Default   | Input          | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| radius         | false    | Number | 3         | Radius length  | Screen pixel               |
| stroke         | false    | String | 'none'    | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | 0         | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | 1         | Stroke opacity | Number between 0 and 1     |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | 1         | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | 1         | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other properties

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

The Multi-point mark can be rendered with either the `points` or `geometry` prop.

 `points` affords a quick way to plot a collection of circles. It may not be used with [`vgg-map`](../core/map.html#description) and can only be scaled with the `scale-x` and `scale-y` props of its parent [Section](../core/section.html#defining-a-local-coordinate-system).

 For instance, an input of

```vue
<vgg-section
  :x1="25"
  :x2="275"
  :y1="25"
  :y2="225"
  :scale-x="[0, 100]"
  :scale-y="[-50, 50]"
  >
  <!-- use the scale definitions above if scaling is desired -->

  <!-- vgg-map cannot be used here -->
  <vgg-multi-point
    :points="[
      [78, 44], [41, 43], [36, -37], [54, -17],
      [70, 29], [31, 0], [88, -50], [97, 15],
      [76, -34], [60, -47], [100, -24], [66, -2],
      [65, 4], [34, -10], [11, 50], [1, -11],
      [49, -49], [54, -40], [30, 49], [39, 39]
    ]"
  />

  <vgg-x-axis
    :scale="[0, 100]"
    :tickCount="5"
  />

  <vgg-y-axis
    :scale="[-50, 50]"
    :hjust="0"
    :tickCount="2"
  />

</vgg-section>
```

would result in

<MarkMultiPointDemo />

`geometry` should be used for geographic data containing GeoJSON [MultiPoint](https://tools.ietf.org/html/rfc7946#section-3.1.3) objects only. To render other geometry types, see the overview on [Geo marks](geomarks.md).

Like other graphics where each row of the dataframe renders one mark, it is mapped with `row`.

```vue
<vgg-map v-slot="{ row }">
  <vgg-multi-point
    :geometry="row.geometry"
  />
</vgg-map>
```

For a more in-depth explanation on how mapping works, see the [Map](../core/map.html#description) section under Core components.

## Example

The graphic below adapted from [Big Think](https://bigthink.com/strange-maps/richest-cities-in-africa) depicts the estimated total wealth of African cities in 2017 in USD billions, and demonstrates how `vgg-multi-point` can be used with GeoJSON MultiPoint objects.

<MarkMultiPointGeo />

Each MultiPoint object defines a collection of cities given by their coordinates. Shown below is one such object containing the four cities in the lowest wealth group (indicated by category 1 under `properties`), and rendered as the smallest four circles on the map:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            39.666667,
            -4.05
          ],
          [
            25.912222,
            -24.658056
          ],
          [
            32.583333,
            -25.966667
          ],
          [
            28.283333,
            -15.416667
          ]
        ]
      },
      "properties": {
        "wealth": "cat1" // there are 8 such categories
      }
    }
    ...
  ]
}
```

The `vgg-multi-point` mark definition then instructs the component to scale the radius of each collection of points according to their wealth category, and in order of increasing wealth:

```vue
<vgg-map v-slot="{ row }">
  <vgg-multi-point
    :geometry="row.geometry"
    :radius="{
      val: row.wealth,
      scale: {
        range: [6, 30],
        domain: 'wealth',
        order: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8' ]
      }
    }"
    fill="#bcd8b7"
    :opacity="0.5"
  />
</vgg-map>
```

Finally we are left with rendering the continent itself, which can be drawn with the [Polygon](polygon.md) mark. Here are the earlier code blocks in full context, with all other props required to generate the map:

<CodeDemoLayout>

<CodeLayout width="45%">

<<< @/docs/.vuepress/public/wealthiest_cities.json

</CodeLayout>

<CodeLayout width="45%">

<<< @/docs/.vuepress/components/MarkMultiPointGeo.vue

</CodeLayout>

</CodeDemoLayout>
