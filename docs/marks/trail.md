---
title: Trail Mark
---

# Component tag

`<vgg-trail>`

# Description

The Trail mark is used to plot point data with a line connecting all the points, and is particularly useful if you want to draw lines with variable width size as a third cha aside from position (x, y) color, and opacity. It is similar to `vgg-multi-line`, but does not support different interpolation methods. The Trail mark can have variable widths from point to point as inputted to `stroke-width`.

This mark does not use `stroke` (nor `strokeOpacity`), but `fill` and `fillOpacity` to manipulate its color and opacity respectively.

# Path Mark

The standard trail mark takes the following props.

### Positioning
| Prop | Required | Types                  | Default   | Description                            | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------------------------- | ----------------- |
| x    | true     | [Number, String, Date] | undefined | x-coordinates of center of each symbol | Local coordinates |
| y    | true     | [Number, String, Date] | undefined | y-coordinates of center of each symbol | Local coordinates |

### Aesthetics

| Prop | Required | Types                  | Default   | Description                            | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------------------------- | ----------------- |
| stroke-width   | false    | [Number, Array] | undefined | Stroke width in screen pixel of `trail` at the given point   | Screen pixel               |
| fill           | false    | String | 'black'   | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | undefined | Fill opacity   | Number between 0 and 1     |

# Usage

### Positioning

To render the Trail mark, you will need to provide the `x` and `y` props.
These can be of type `Number`, `String` and `Date`, depending what kind of domain type the parent Section has.

### Other Props

The `stroke-width` prop sets the stroke width of the `trail` mark at a given point. This may be given in screen pixels, or as a scaled value, as shown in the Example section.

# Example

```
<vgg-map
  v-slot="{ dataframe }"
  unit="dataframe"
>

  <vgg-multi-line
    :x="{ val: dataframe.time, scale: 'time' }"
    :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
    :stroke-width="{ val: dataframe.width, scale: 'width'}"
    :fillOpacity="0.8"
  />

</vgg-map>
```

This produces a black trail mark with varying stroke width based on and scaled to `dataframe.width`.
