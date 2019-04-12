---
title: Label mark
---
# Label mark
The `vgg-label` mark is used to plot text elements.

<CodeDemoLayout>

<MarkLabelSimple />

<CodeLayout>

```html
 <vgg-label
    :x="row.year"
    :y="row.population"
    :text="row.population"
    :font-size="12"
    font-family="Comic Sans MS"
    fill="#c66366"
/>
```

</CodeLayout>

</CodeDemoLayout>

## Properties

### Positioning

| Prop     | Input                | Required            | Types                  | Default   | Unit(s)           |
|--------- | -------------------- | ------------------- | ---------------------- | --------- | ----------------- |
| x        | x coordinate         | see [Usage](#usage) | [Number, String, Date] | undefined | Local coordinates |
| y        | y coordinate         | see [Usage](#usage) | [Number, String, Date] | undefined | Local coordinates |
| geometry | GeoJSON Point object | see [Usage](#usage) | Object                 | undefined | Local coordinates |

### Other aesthetics

| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| text  | false  | [String, Number] | undefined | Text to display    | NA |
| font-size  | false  | Number | 16 | Font size    | Screen pixel |
| font-weight  | false  | [String, Number] | 'normal' | Font weight    | Either a number between 0 and 1000, or 'normal', 'bold', etc. |
| font-family  | false  | String | 'Helvetica' | Font family    | Name of font family |
| rotation  | false  | Number | 0 | Degrees with which to rotate the mark    | Degrees |
| anchor-point  | false  | String | 'center' | Anchor point for x/y coordinate    | One of ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'] |
| stroke         | false    | String | 'none'    | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | 0         | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | 1         | Stroke opacity | Number between 0 and 1     |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | 1         | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | 1         | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

## Usage

To render the Label mark, you will need to provide the `x` and `y` or the `geometry` prop.
`x` and `y` accept data of types Number, String or Date, depending on the parent Section's domain type. `geometry` should be used when working with geographic data involving [GeoJSON Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) objects. Both `x`/`y` and `geometry` are [mapped with row](../core/map.html#description), where each row of the dataframe outputs a single label. 

For the `x` and `y` props, `row` refers simply to a single data point in the dataset. For example, data defined in the format on the left would be accessed by its keys like in the format on the right:

<CodeDemoLayout>

<CodeLayout width="45%">

```html
<vgg-data
  :data="{
    year: [2000, 2005, 2010, 2015],
    population: [100, 110, 130, 180]
  }"
>
</vgg-data>
```

</CodeLayout>

<CodeLayout width="45%">

```html
<vgg-map v-slot="{ row }">
  <vgg-label
    :x="row.year"
    :y="row.population"
  />
</vgg-map>
```

</CodeLayout>

</CodeDemoLayout>

A row for the `geometry` prop on the other hand refers to a single GeoJSON feature. GeoJSON data generally comprises two parts - geographic coordinates (defined under geometry) and attributes (defined under properties). Geographic coordinates are passed into the `geometry` [positioning prop](#positioning), and *must* be accessed with `row.geometry`, while attributes are passed into various [aesthetic props](#other-aesthetics) and are accessed through `row.someproperty`, where `someproperty` can refer to any user-defined attribute within a feature's properties object:

<CodeDemoLayout>

<CodeLayout width="45%">

```html
<vgg-map v-slot="{ row }">
  <vgg-label
    :geometry="row.geometry"
    :text="row.name"
    :anchor-point="row.anchor"
    :fill="row.fill"
  />
</vgg-map>
```

</CodeLayout>

<CodeLayout width="45%">

```json{6-12,14-17}
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.384082,
          6.455027
        ]
      },
      "properties": {
        "name": "Lagos",
        "anchor": "rb",
        "fill": "#f2e5d7"
      }
    }
    ...
  ]
}
```

</CodeLayout>

</CodeDemoLayout>



## Examples

The graphic below shows the 10 most populous cities on the African continent according to [World Atlas](https://www.worldatlas.com/articles/15-biggest-cities-in-africa.html) and demonstrates how `vgg-label` can be used with GeoJSON Point objects. In the GeoJSON snippet below the graphic, each city coordinate is given the properties 'name', 'anchor' and 'fill', which are passed into the Label mark's `text`, `anchor-point` and `fill` properties in the Vue snippet to the right.

<MarkLabelGeo />

<CodeDemoLayout>

<CodeLayout width="45%">

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.384082,
          6.455027
        ]
      },
      "properties": {
        "name": "Lagos",
        "population": "21 million",
        "anchor": "rb",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          31.233333,
          30.033333
        ]
      },
      "properties": {
        "name": "Cairo",
        "population": "20.4 million",
        "anchor": "rt",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          15.322222,
          -4.325
        ]
      },
      "properties": {
        "name": "Kinshansa",
        "population": "13.3 million",
        "anchor": "lt",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          13.234444,
          -8.838333
        ]
      },
      "properties": {
        "name": "Luanda",
        "population": "6.5 million",
        "anchor": "lt",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          36.817222,
          -1.286389
        ]
      },
      "properties": {
        "name": "Nairobi",
        "population": "3.5 million",
        "anchor": "rt",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          45.333333,
          2.033333
        ]
      },
      "properties": {
        "name": "Mogadishu",
        "population": "2.1 million",
        "anchor": "rb",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -4.033333,
          5.316667
        ]
      },
      "properties": {
        "name": "Abidjan",
        "population": "4.707 million",
        "anchor": "t",
        "fill": "#335c67"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          29.916667,
          31.2
        ]
      },
      "properties": {
        "name": "Alexandria",
        "population": "4.7 million",
        "anchor": "b",
        "fill": "#335c67"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          38.74,
          9.03

        ]
      },
      "properties": {
        "name": "Addis Ababa",
        "population": "3.4 million",
        "anchor": "r",
        "fill": "#f2e5d7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          28.045556,
          -26.204444
        ]
      },
      "properties": {
        "name": "Johannesburg",
        "population": "4.4 million",
        "anchor": "r",
        "fill": "#f2e5d7"
      }
    }
  ]
}
```
</CodeLayout>

<CodeLayout width="45%">

```html{43-50}
<vgg-graphic
  v-if="dataLoaded"
  :width="600"
  :height="600"
  :data="polygons"
  :transform="{ reproject: {
    from: '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
    to: 'WGS84'
  } }"
>

  <vgg-section
    :x1="0"
    :x2="500"
    :y1="0"
    :y2="500"
    :scale-geo="{}"
  >

    <vgg-map v-slot="{ row, i }">

      <vgg-polygon
        :geometry="row.geometry"
        :fill="'#7f2704'"
        :opacity="0.9"
        stroke="#d3d3d3"
        :stroke-width="0.05"
      />

    </vgg-map>

    <vgg-data :data="points">

      <vgg-map v-slot="{ row, i }">

        <vgg-symbol
          :geometry="row.geometry"
          :shape="'star'"
          :size="15"
          :fill="'#e09f3e'"
        />

        <vgg-label
          :geometry="row.geometry"
          :text="row.name"
          :anchor-point="row.anchor"
          :fill="row.fill"
          :font-size="12"
          font-family="Verdana"
        />

      </vgg-map>

    </vgg-data>

  </vgg-section>

</vgg-graphic>
```

</CodeLayout>

</CodeDemoLayout>