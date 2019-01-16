---
title: Section
---

# Component tag

`<vgg-section>`

# Description

The Section is one of the corner stones of `vue-gg`. Sections have many different
purposes, such as:

- Defining a local coordinate system
- Indicating coordinate ranges to map to
- Providing an entry point for new data
- Creating compositions of marks

All of these will be discussed below, under [Usage](#usage)

# Props

### Positioning

| Prop | Required | Regular types          | Types when mapping                       | Default   | Description          | Unit(s)             |
| ---- | -------- | ---------------------- | ---------------------------------------- | --------- | -------------------- | ------------------- |
| x1   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Left x coordinate    | Local coordinate(s) |
| x2   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Right x coordinate   | Local coordinate(s) |
| y1   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Bottom y coordinate  | Local coordinate(s) |
| y2   | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Top y coordinate     | Local coordinate(s) |
| x    | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Central x coordinate | Local coordinate(s) |
| y    | depends  | [Number, String, Date] | [Number, String, Date, Object, Function] | undefined | Central y coordinate | Local coordinate(s) |
| w    | depends  | Number                 | [Number, Object, Function]               | undefined | Width                | Local coordinate(s) |
| h    | depends  | Number                 | [Number, Object, Function]               | undefined | Height               | Local coordinate(s) |

### Other props

| Prop | Required | Regular types   | Types when mapping        | Default   | Description                   |
| ---- | -------- | --------------- | ------------------------- | --------- | ----------------------------- |
| data | false    | [Array, Object] | [Function, Array, Object] | undefined | Some supported data structure |

| Prop      | Required | Types                     | Default   | Description                     |
| --------- | -------- | ------------------------- | --------- | ------------------------------- |
| type      | false    | String                    | 'scale'   | Type of local coordinate system |
| scales    | false    | Object                    | undefined | Scaling of x and y dimensions   |
| data      | false    | [Function, Array, Object] | undefined | Some supported data structure   |
| format    | false    | String                    | undefined | Format of data structure        |
| transform | false    | [Array, Object]           | undefined | Transformation(s) to be applied |

# Usage

### Positioning

Positioning the Section component works exactly the same way as positioning the
Rectangle mark. See the [documentation for the Rectangle mark](../marks/rectangle.md)
for an in-depth explanation.

### Defining a local coordinate system

Perhaps the most powerful feature of the Section is its ability to define local
coordinate systems. Especially with complicated or nested graphics, it can become
tricky to keep track of what coordinates things have relative to each other.
The Section, with its local coordinate systems, simplifies this problem somewhat.

For example: let's say we want to plot the domain -1 < x < 1 for the function
f(x) = x ** 2, on a graphic of 500 by 500 pixels, with a 50 pixel margin. Using
the Section's local coordinate system, this is as easy as writing:

::: v-pre
```html
<vgg-graphic
  :width="500"
  :height="500"
/>

  <vgg-section
    :x1="50"
    :x2="450"
    :y1="50"
    :y2="450"
    :scales="{
      x: [-1, 1]
      y: [-1, 1]
    }"
  >

    <!-- Line of f(x) = x ** 2 -->
    <vgg-line
      :func="x => x ** 2"
      :stroke-width="3"
      stroke="#8b0000"
    />

    <!-- Point in the center of the Section -->
    <vgg-point :x="0" :y="0" />

</vgg-section>

</vgg-graphic>
```
:::

The `scales` prop takes an object that has a `x` and a `y` property. These properties
are optional- it is allowed to only specify `x`, or leave out the `scales` prop
altogether. If the `x` scaling is not specified explicitly, it will default to
whatever values constitute the left and right borders of the section (in this case:
`[50, 450]`). Same for scaling the `y` dimension.

The `x` and `y` scaling options can be specified in a number of ways. Besides
the method discussed above, where an Array of length 2 is used to specify the
domain of the dimension, it is also possible to use a String that corresponds
to the name of a column within the current [data scope](../concepts/data.md#data-scope).
For more on this, and on advanced scaling options like non-linear scaling, see the
[scaling](../concepts/scaling.md) documentation.

Besides 'rescaling' cartesian coordinate systems, the Section supports transforming
cartesian coordinates to a polar representation. This is a simple as setting
the `type` to `'polar'`. Polar coordinate systems are useful for creating
piecharts and doughnut charts, or for representing circular data, like a clock
(TODO: link to code):

<clock />

### Indicating coordinate ranges to map to

The [Map](./map.md) component can be used to conveniently map data to coordinates.
To do this, it has to be aware of the target ranges of the coordinates that the data
will be mapped to. When a Map component is inside of a Section component, it will
use the extents of the Section.

::: v-pre
```html
<vgg-graphic
  :width="500"
  :height="500">

  <vgg-section
    :x1="100"
    :x2="400"
    :y1="100"
    :y2="250"
    :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  >

    <vgg-map>

      <vgg-point :x="{ scale: 'a' }" :y="{ scale: 'b' }" />

    </vgg-map>

    <!-- The result of this mapping would be:

    <vgg-point :x="100" :y="100" />
    <vgg-point :x="200" :y="150" />
    <vgg-point :x="300" :y="200" />
    <vgg-point :x="400" :y="250" />

    -->

  </vgg-section>

</vgg-graphic>
```
:::

It is also possible to map data to marks within a Section that does have
a `scales` prop. In that case, the data will be mapped to the rescaled local
coordinate system:

::: v-pre
```html{10}
<vgg-graphic
  :width="500"
  :height="500">

  <vgg-section
    :x1="100"
    :x2="400"
    :y1="100"
    :y2="250"
    :scales="{ x: [2, 8], y: [4, 16] }"
    :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  >

    <vgg-map>

      <vgg-point :x="{ scale: 'a' }" :y="{ scale: 'b' }" />

    </vgg-map>

    <!-- The result of this mapping would be:

    <vgg-point :x="2" :y="4" />
    <vgg-point :x="4" :y="8" />
    <vgg-point :x="6" :y="12" />
    <vgg-point :x="8" :y="16" />

    -->

  </vgg-section>

</vgg-graphic>
```
:::

### Providing an entry point for new data

Like the [Graphic](./graphic.md) and the [Data](./data.md) components, the Section
allows you to add a new dataset and create a new data scope for its child components.
And like the Data component, it is also possible to perform transformations on the
data in the parent's data scope, and use that as data scope for its children:

::: v-pre
```html
<vgg-graphic
  :width="500"
  :height="500"
  :data="{ a: [1, 2, 3, 4] }"
>

  <vgg-section
    :x1="100"
    :x2="400"
    :y1="100"
    :y2="400"
    :transform="{ filter: row => row.a > 2 }"
  >

    <!-- Data scope: { a: [3, 4] } -->

  </vgg-section>

</vgg-graphic>
```
:::

But the Section has another way of creating a new data scope that the Graphic
and Map components lack: when placed within a [Map](./map.md) component and a
data scope that contains a nested dataframe, the nested data can be mapped to
the Section's `data` prop:

(TODO: do this when we have figured out how we want to do faceting/deal with
domains pre/post data transformation etc. Started on this in 
`.vuepress/components/SectionDegroup.vue`)


### Creating compositions of marks
