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

To render the Label mark, you will need to provide one of the following positioning props:
- `x` and `y` or
- `geometry`

`x` and `y` can be used with data of types Number, String or Date, while `geometry` should be used only for geographic data involving [GeoJSON Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) objects. 

Data is passed to the `x`, `y` and `geometry` props via row mapping, which renders one mark per data row. For a more in-depth explanation on how mapping works, see the [Map](../core/map.html#description) section under Core components. 

Recall that data provided (regardless of row or column format) -

```html
<vgg-data
  :data="{
    year: [2000, 2005, 2010, 2015],
    population: [100, 110, 130, 180]
  }"
>
</vgg-data>
```

is represented internally as
<table>
  <thead>
    <tr>
      <th>year</th>
      <th>population</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2000</td>
      <td>100</td>
    </tr>
    <tr>
      <td>2005</td>
      <td>110</td>
    </tr>
    <tr>
      <td>2010</td>
      <td>130</td>
    </tr>
    <tr>
      <td>2015</td>
      <td>180</td>
    </tr>
  </tbody>
</table>

To pass data into the `x` and `y` props, one needs simply to access each data row's column name: 

```html
<vgg-map v-slot="{ row }">
  <vgg-label
    :x="row.year"
    :y="row.population"
  />
</vgg-map>
```

</CodeDemoLayout>

To pass data to the `geometry` prop, one needs to supply the entire GeoJSON geometry object. Here it is useful to consider the makeup of geodata.

 GeoJSON data generally comprises two parts:
 - geographic coordinates (defined under geometry)
 - attributes (defined under properties)

```json{6,13}
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

 Geographic coordinates relate to [positional properties](#positioning) and *must* be accessed with `row.geometry`: 

```html{3}
<vgg-map v-slot="{ row }">
  <vgg-label
    :geometry="row.geometry"
    :text="row.name"
    :anchor-point="row.anchor"
    :fill="row.fill"
  />
</vgg-map>
```

Attributes relate to [aesthetic properties](#other-aesthetics) and are accessed through `row.someproperty`, where `someproperty` can refer to any user-defined attribute within a feature's properties object:

```html{4-6}
<vgg-map v-slot="{ row }">
  <vgg-label
    :geometry="row.geometry"
    :text="row.name"
    :anchor-point="row.anchor"
    :fill="row.fill"
  />
</vgg-map>
```

## Examples

The graphic below shows the 10 most populous cities on the African continent according to [World Atlas](https://www.worldatlas.com/articles/15-biggest-cities-in-africa.html) and demonstrates how `vgg-label` can be used to annotate cities on a map. 

<MarkLabelGeo />

First, we need geodata supplied as a json indicating the geographical coordinates of each city and their attributes. Here is a single data point describing the city of Lagos.

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
        "name": "Lagos", // text to be displayed
        "anchor": "rb", // position of coordinates with respect to text
        "fill": "#f2e5d7" // color of text
      }
    }
  ]
}
```

Next we will define the mark using the `vgg-label` component. Each prop serves to instruct the component on how the label should be rendered. Our coordinates tell us where the label would be anchored as though our text were a point, anchor at 'rb' that the anchor point will be to the right-bottom of the text, name that our label will display the text 'Lagos', and fill that it should be a light grayish orange color.

```vue
<vgg-data :data="points">

  <vgg-map v-slot="{ row }">

    <vgg-label
      :geometry="row.geometry"
      :text="row.name"
      :anchor-point="row.anchor"
      :fill="row.fill"
      :font-size="12"
      :font-family="'Verdana'"
    />

  </vgg-map>

</vgg-data>
```

Finally we are left with rendering the continent itself, which can be drawn with the [Polygon](polygon.md) mark. Here are the earlier code blocks in full context, with all other props required to generate the map:

<CodeDemoLayout>

<CodeLayout width="45%">

<<< @/docs/.vuepress/public/wealthiest_cities.json

</CodeLayout>

<CodeLayout width="45%">

<<< @/docs/.vuepress/components/MarkLabelGeo.vue

</CodeLayout>

</CodeDemoLayout>