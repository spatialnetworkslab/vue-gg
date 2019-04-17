---
title: Geo marks
---

# Geo Marks

 Certain marks have an added ability to parse geographic data. These are referred to as geo marks. There are a total of six such marks:

- [Label mark](label.md)
- [Multi-line mark](multi-line.md)
- [Point mark](point.md)
- [Multi-point mark](multi-point.md)
- [Polygon mark](polygon.md)
- [Symbol mark](symbol.md)

Here are some things you can do with them!
<MarkGeo />

The map above shows the continent of Africa and its most populous cities, coupled with a driving route from Kinshasa to Nairobi. The continent is rendered with `vgg-polygon`, city labels with `vgg-label`, city markers with `vgg-symbol` and driving route with `vgg-multi-line`.

## Properties

### Positioning

In addition to mark-specific positioning props, all geo marks possess the `geometry` prop, which confers the ability to render geographic elements. 

| Prop     | Required  |  Input                                | Unit(s)           |
| -------- | --------- | ------------------------------------- |  ---------------- |
| geometry | true      |  GeoJSON object(http://geojson.org/)  | Local coordinates |


The type of GeoJSON object accepted by `geometry` depends on the mark in which it is used:

| Mark              	| Allowed GeoJSON Geometry types                           	|
|-------------------	|-------------------------------------------------------  	|
| `vgg-polygon`     	| Polygon \| MultiPolygon \| LineString \| MultiLineString 	|
| `vgg-multi-line`  	| LineString \| MultiLineString \| Polygon \| MultiPolygon	|
| `vgg-multi-point` 	| MultiPoint                                            	  |
| `vgg-point`       	| Point                                                 	  |
| `vgg-symbol`      	| Point                                                 	  |
| `vgg-label`       	| Point                                                 	  |

### Aesthetics

All geo marks may use any of the aesthetics props contained in their respective marks.

## Events

All geo marks may use any of the event props contained in their respective marks.

## Usage

To render any geographic elements, data must first be loaded as a [GeoJSON](http://geojson.org/). GeoJSON is a format for encoding a variety of geographic data structures, and generally comprises two parts:
- Geometries (defined under `geometry`)
- Attributes (defined under `properties`)

Attributes are often supplied in a separate csv file, which must first be merged under the GeoJSON's properties (see [Polygon](polygon.md#example) for an example).

Input data

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [125.6, 10.1]
      },
      "properties": {
        "name": "Dinagat Islands",
        "population": 127152,
        "precipitation": "3716 mm"
      }
    }
    ...
  ]
}
```

is internally represented as:

| geometry        	| name              	| population 	| precipitation 	|
|-----------------	|-------------------	|------------	|---------------	|
| Geometry object 	| 'Dinagat Islands' 	| 127152     	| '3716 mm'     	|


### Positioning

Geometries are passed to the `geometry` prop, and are accessed with `row.geometry`:

```vue
<vgg-map v-slot="{ row }">
  <vgg-point
    :geometry="row.geometry"
  />
</vgg-map>
```

 Since we are rendering one mark per data row - here a single feature in the GeoJSON file - row mapping must be used. For a more in-depth explanation on how mapping works, see the [Map](../core/map.html#description) section under Core components. 

### Aesthetics

Attributes are passed to the relevant aesthetic props, for instance:

```vue
<vgg-map v-slot="{ row }">
  <vgg-point
    :geometry="row.geometry"
    :radius="row.population"
    :fill="row.precipitation"
  />
</vgg-map>
```