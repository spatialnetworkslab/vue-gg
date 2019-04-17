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

To render the Polygon mark, you will need to provide one of the following props:
- `x` and `y` or
- `points` or
- `geometry` 

`geometry` accepts GeoJSON [Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) and [MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7) objects only. To render other geometry types, see documentation on the [Point](point.md) and [Multi-line](multi-line.md) marks.

## Example

The following graphic shows the total attention on Twitter paid to the fashion industry across the African continent.  

<MarkPolygonGeo />

Geotagged tweets are aggregated into hexagonal bins and their absolute counts recorded in a csv.

```csv
hex,total
ID621,0
ID622,0
ID649,0
ID820,9721
ID821,128
ID822,1725
ID823,1489
...
```

Each hexagonal bin is defined by a GeoJSON Polygon or Multipolygon object. Shown here is bin ID621 which has a total count of 0 (see corresponding hex in csv above).

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2971330.946649554,
              -5548087.999411765
            ],
            [
              2975532.7286153506,
              -5550513.899360795
            ],
            [
              2971511.3663789546,
              -5550055.0168350125
            ],
            [
              2971330.946649554,
              -5548087.999411765
            ]
          ]
        ]
      },
      "properties": {
        "hex": "ID621"
      }
    }
    ...
  ]
}
```

To load the data, we will use `d3.csv` and `d3.json` from the d3-fetch module. The `geo` function defined below returns a Promise object containing both the attributes (defined in the csv) and the geometries (defined in the json), which is then exported for use in a Vue component.

```js
import { csv, json } from 'd3-fetch'

export function geo () {
  let hexAttr = '/africa.csv'
  let hexGeom = '/hex-africa.json'

  let urls = [hexAttr, hexGeom]
  let promises = []

  urls.forEach(url => {
    let ext = url.replace(/^.*\./, '')

    return ext === 'csv' ? promises.push(csv(url))
      : ext === 'json' ? promises.push(json(url))
        : 'unsupported file type'
  })

  return Promise.all(promises).then(values => {
    let attr = Object.freeze(values[0].map(d => {
      return {
        hex: d.hex,
        value: +d['total'] // the 'total' column is here mutated to 'value'
      }
    }))

    let geom = Object.freeze(Object.assign({}, values[1]))

    return { attr: attr, geom: geom }
  })
}
```

In a Vue component, the `geo` function above is imported and the Promise object containing our attributes and geometries is loaded within the `loadData` method. Using a join utility, attribute data is merged into the properties section of the geometries and passed to the Vue component's `data` prop.

```vue
<script>
import { geo } from './geoData.js' // imports function containing the Promise object
import { equijoin } from './geoData.js' // imports the join utility

export default {
  name: 'GeoShape',

  data () {
    return {
      data: {} // result of the join is passed here
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      geo().then(data => {
        // joins attributes to geometries on the 'hex' column of each table
        let joinedData = equijoin(data.attr, data.geom, 'hex', 'hex',
          (attr, feat) => {
            let featCopy = JSON.parse(JSON.stringify(feat))

            // select attributes to retain in output
            featCopy.properties.value = attr.value
            return featCopy
          }
        )
        this.data = Object.freeze(joinedData)
      })
    }
  }
}
</script>
```

As a result of the join, the geodata acquires a new property `value` (total count).

**Before**
| geometry        	| hex     	|
|-----------------	|---------	|
| geometry Object 	| 'ID621' 	|
| ...             	| ...     	|

**After**
| geometry        	| hex     	| value 	|
|-----------------	|---------	|-------	|
| geometry Object 	| 'ID621' 	| 0     	|
| ...             	| ...     	| ...   	|


Finally, we define the mark using the `vgg-polygon` component. The color of the bins is scaled by the 'value' column according to the [blues](../scales/color.html#blues) scheme. Domain is capped at 5000, where `NA: 1` indicates that values greater than 5000 are mapped to the range's upper bound of 1.

```vue
<vgg-map v-slot="{ row }">
  <vgg-polygon
    :geometry="row.geometry"
    :fill="{
      val: row.value,
      scale: { type: 'blues', domain: 'value', domainMax: 5000, NA: 1 }
    }"
  />
</vgg-map>
```

Shown below is the Vue component in its entirety:

<CodeLayout width="100%">

<<< @/docs/.vuepress/components/MarkPolygonGeo.vue

</CodeLayout>
