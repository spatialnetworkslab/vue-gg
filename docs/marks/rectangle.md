---
title: Rectangle mark
---
# Rectangle mark
The `vgg-rectangle` mark is used to plot rectangular elements.

<CodeDemoLayout>

<MarkRectangleSimple />

<CodeLayout>

```html
<vgg-rectangle
  :x="row.year"
  :y1="row.population"
  :y2="0"
  :w="2.5"
  fill="#c66366"
/>
```

</CodeLayout>

</CodeDemoLayout>

## Properties
A `vgg-rectangle` can contain the following position properties.
### Positioning

| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| x1   | depends  | [Number, String, Date] | undefined | Left x coordinate    | Local coordinates |
| x2   | depends  | [Number, String, Date] | undefined | Right x coordinate   | Local coordinates |
| y1   | depends  | [Number, String, Date] | undefined | Bottom y coordinate  | Local coordinates |
| y2   | depends  | [Number, String, Date] | undefined | Top y coordinate     | Local coordinates |
| x    | depends  | [Number, String, Date] | undefined | Central x coordinate | Local coordinates |
| y    | depends  | [Number, String, Date] | undefined | Central y coordinate | Local coordinates |
| w    | depends  | Number                 | undefined | Width                | Local coordinates |
| h    | depends  | Number                 | undefined | Height               | Local coordinates |

#### Allowed combinations of positioning props
The positioning properties of the Rectangle can only be used in certain combinations.

| Combination | Explanation                                                                                                                    |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| `x1` + `x2` | `x1` refers to x-coordinate of the left side of the rectangle, `x2` refers to x-coordinate of the right side of the rectangle. |
| `x` + `w`   | `x` is the center of the rectangle in the x-dimension, `w` is the width. Here, `x1 = x - w / 2`, and `x2 = x + w / 2`.         |
| `x1` + `w`  | `x2 = x1 + w`                                                                                                                  |
| `x2` + `w`  | `x1 = x2 - w`                                                                                                                  |
| `y1` + `y2` | `y1` refers to y-coordinate of the bottom side of the rectangle, `y2` refers to y-coordinate of the top side of the rectangle. |
| `y` + `h`   | `y` is the center of the rectangle in the x-dimension, `h` is the width. Here, `y1 = y - h / 2`, and `y2 = y + h / 2`.         |
| `y1` + `h`  | `y2 = y1 + h`                                                                                                                  |
| `y2` + `h`  | `y1 = y2 - h`                                                                                                                  |

### Other aesthetics

| Prop           | Required | Types  | Default   | Description    | Unit(s)                    |
| -------------- | -------- | ------ | --------- | -------------- | -------------------------- |
| stroke         | false    | String | undefined | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | undefined | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | undefined | Stroke opacity | Number between 0 to 1      |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | undefined | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | undefined | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other properties

| Prop        | Required | Types   | Default   | Description                                                              |
| ----------- | -------- | ------- | --------- | ------------------------------------------------------------------------ |
| interpolate | false    | Boolean | undefined | Interpolate between points (when using non-cartesian coordinate systems) |
| transition  | false    | Number  | 0         | Time taken to animate changes to each line when data changes             |

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
There is one caveat related to `w` (and `h`). `x1`, `x2` and `x` can
be specified in the parent Section's coordinate system, even if those coordinates are
categorical or temporal. `w`, however, does not take categorical or temporal data.
Instead, the coordinate system of the first parent component that has a quantitative
coordinate system will be used. For example:

::: v-pre
```html{14}
<vgg-graphic :width="500" :height="500">
  <vgg-section
    :x1="50"
    :x2="450"
    :y1="50"
    :y2="450"
    :scale-x="['a', 'b', 'c', 'd']"
    :scale-y="[0, 100]"
  >

    <vgg-rectangle
      :x="'b'"
      :w="100"
      :y1="20"
      :y2="80"
    />

  </vgg-section>
</vgg-graphic>
```
:::

The `w` value of `100` here is in the coordinate system of the `vgg-graphic`,
which is the first parent that has a quantitative coordinate system.

## Examples
