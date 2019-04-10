---
title: Multi-point mark
---

# Multi-point mark

The `vgg-multi-point` mark is used to plot multiple points. While visually indistinct from the Point mark, it renders a series of points as a collective mark, as opposed to the Point mark which renders one point per mark.

<CodeDemoLayout>

<MarkMultiPointDemo />

<CodeLayout width="40%">

```html
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

# Properties

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

### Other props

| Prop       | Required | Types  | Default | Description                                                   |
| ---------- | -------- | ------ | ------- | ------------------------------------------------------------- |
| transition | false    | Number | 0       | Time taken to animate changes to each point when data changes |

# Events

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

# Usage

### Positioning

The Multi-point mark can be rendered with either the `points` or `geometry` prop. `points` affords a quick way to plot a collection of circles. It may not be used with [`vgg-map`](../core/map.html#description) and can only be scaled with the `scale-x` and `scale-y` props of its parent [Section](../core/section.html#defining-a-local-coordinate-system). `geometry` should be used when working with geographic data involving [GeoJSON MultiPoint](https://tools.ietf.org/html/rfc7946#section-3.1.3) objects. Like other graphics where each row of the dataframe renders one mark, it is mapped with `row`:

```html
<vgg-map v-slot="{ row, i }">
  <vgg-multi-point
    :geometry="row.geometry"
  />
</vgg-map>
```

# Example

The graphic below adapted from [Big Think](https://bigthink.com/strange-maps/richest-cities-in-africa) depicts the estimated total wealth of African cities in 2017 in USD billions, and demonstrates how `vgg-multi-point` can be used with GeoJSON MultiPoint objects. Below the graphic, the GeoJSON snippet shows total wealth divided into 8 categories corresponding to 8 MultiPoint objects, while the Vue snippet shows the radius of each Multi-point mark scaled according to increasing wealth. 

<MarkMultiPointGeo />

<CodeDemoLayout>

<CodeLayout width="45%">


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
        "wealth": "cat1"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            -5.8,
            35.766667
          ],
          [
            -8.008889,
            31.63
          ], 
          [
            38.74,
            9.03
          ],
          [
            32.581111,
            0.313611
          ],
          [
            7.483333,
            9.066667
          ],
          [
            17.083611,
            -22.57
          ]
        ]
      },
      "properties": {
        "wealth": "cat2"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            39.283333,
            -6.8
          ],
          [
            -4.033333,
            5.316667
          ],
          [
            29.916667,
            31.2
          ]
        ]
      },
      "properties": {
        "wealth": "cat3"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            -0.2,
            5.55
          ]
        ]
      },
      "properties": {
        "wealth": "cat4"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            -7.583333,
            33.533333
          ],
          [
            36.817222, 
            -1.286389
          ],
          [
            13.234444,
            -8.838333
          ],
          [
            28.188056,
            -25.746111
          ],
          [
            31.05,
            -29.883333
          ]
        ]
      },
      "properties": {
        "wealth": "cat5"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            3.384082,
            6.455027
          ]
        ]
      },
      "properties": {
        "wealth": "cat6"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [ 
            18.423889,
            -33.925278
          ],
          [ 
            31.233333,
            30.033333
          ]
        ]
      },
      "properties": {
        "wealth": "cat7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [  
            28.045556,
            -26.204444
          ]
        ]
      },
      "properties": {
        "wealth": "cat8"
      }
    }
  ]
}
```
</CodeLayout>

<CodeLayout width="45%">

```html{31-47}
<vgg-graphic
  v-if="dataLoaded"
  :width="500"
  :height="600"
  :data="polygons"
  :transform="{ reproject: {
    from: '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
    to: 'WGS84'
  } }"
  >

  <vgg-section
    :x1="0"
    :x2="450"
    :y1="0"
    :y2="550"
    :scale-geo="{}"
  >

    <vgg-map v-slot="{ row, i }">

      <vgg-polygon
        :geometry="row.geometry"
        fill="6ba292"
        stroke="#d3d3d3"
        :strokeWidth="0.05"
      />

    </vgg-map>

    <vgg-data :data="multipoints">

      <vgg-map v-slot="{ row, i }">

        <vgg-multi-point
          :geometry="row.geometry"
          :radius="{ 
            val: row.wealth,
            scale: { range: [5, 30], domain: 'wealth' } 
          }"
          fill="#bcd8b7"
          :opacity="0.5"
        />

      </vgg-map>

    </vgg-data>

  </vgg-section>

</vgg-graphic>
```

</CodeLayout>

</CodeDemoLayout>
