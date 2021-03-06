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

All of these will be discussed below, under [Usage](#usage).

# Props

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

Positioning the Section component works exactly the same way as positioning the
Rectangle mark. See the [documentation for the Rectangle mark](../marks/rectangle.md#usage)
for an in-depth explanation.

### Other props

| Prop       | Required | Types                   | Default   | Description                                                 |
| ---------- | -------- | ----------------------- | --------- | ----------------------------------------------------------- |
| data       | false    | [Array, Object]         | undefined | Some supported data structure                               |
| type       | false    | String                  | 'scale'   | Type of local coordinate system                             |
| scale-x    | false    | [String, Array, Object] | undefined | Scaling of x dimension                                      |
| scale-y    | false    | [String, Array, Object] | undefined | Scaling of y dimension                                      |
| format     | false    | String                  | undefined | Format of data structure                                    |
| transform  | false    | [Array, Object]         | undefined | Transformation(s) to be applied                             |
| dataID     | false    | String                  | undefined | ID for referencing from other data scope                    |
| allowEmpty | false    | Boolean                 | false     | When false, won't render children when receiving empty data |

The props passed to the `scale-x` and `scale-y` are [scaling options](../concepts/scaling.md) props.

### Axes and gridlines

| Prop       | Required | Types           | Default   | Description                           |
| ---------- | -------- | --------------- | --------- | ------------------------------------- |
| axes       | false    | [Array, Object] | undefined | Which axes to add to the Section      |
| grid-lines | false    | [Array, Object] | undefined | Which gridlines to add to the Section |

Besides using the [axes](../guides/cartesian.md) and [gridline](../guides/gridlines.md)
components, it is also possible to add axes and gridlines by just providing
a prop to the Section component. The axes and gridlines can be specified as an
Array or as an Object. When using an Array, the Array can only contain the values
`['left', 'right', 'top', 'bottom']` for the `axes` prop, and `['x', 'y']` for the
`grid-lines` prop. When using the Object, the Object can only have the keys `left`,
`right` etc. for the axes, and `x` and `y` for the gridlines, while the values
corresponding to those keys are the props that you would usually pass to the
axes or gridline components- see the following example:

::: v-pre
```html
<vgg-section
  :x1="50"
  :x2="450"
  :y1="50"
  :y2="450"
  :scale-x="[0, 10]"
  :scale-y="[50, 80]"
  :axes="{
    bottom: { h: 50 },
    left: { 'tick-color': 'blue' }
  }"
  :grid-lines="['x', 'y']"
>

</vgg-section>
```
:::

<section-axes-test />

One of the advantages using the `axes` and `grid-lines` props over the components
is that the axes and gridlines will automatically inherit the Section's `scale-x`
and `scale-y` values. Like with the components, the axes will by default be 1/8 of
the Section, unless you specify a `h` prop for the x-axes or a `w` prop for the
y-axes.

### Selection

| Prop            | Required | Types            | Default   | Description                     |
| --------------- | -------- | ---------------- | --------- | ------------------------------- |
| select          | false    | [String, Object] | undefined | Selection tool                  |
| selectionBounds | false    | Array            | undefined | Shape created by selection tool |

For more on making selections, see the [Interactivity](../concepts/interactivity.md)
documentation.

# Events

| Event         | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| selectionDone | Triggered when the user is done creating a selection (on mouseup). Emits bounding box selection |

For more on making selections, see the [Interactivity](../concepts/interactivity.md)
documentation.

# Usage

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
    :scale-x="[-1, 1]"
    :scale-y="[-1, 1]"
  >

    <!-- Plotted line of f(x) = x ** 2 -->
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

The `scale-x` and `scale-y` props are optional- it is allowed to only specify
`scale-x`, or leave out both `scale-x` and `scale-y` altogether.
If the `scale-x` scaling is not specified explicitly, it will default to
whatever values constitute the left and right borders of the section (in this case:
`[50, 450]`), which means that no transformation will take place.
The same goes the scaling of the y-dimension with `scale-y`.

The x and y scaling props can be specified in a number of ways. Besides
the method discussed above, where an Array of length 2 is used to specify the
domain of the dimension, it is also possible to use a String that corresponds
to the name of a column within the current [data scope](../concepts/data-loading.md#data-scope).
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

    <vgg-map v-slot="{ row }">

      <vgg-point :x="{ val: row.a, scale: 'a' }" :y="{ val: row.b, scale: 'b' }" />

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
`scale-x` or `scale-y` props. In that case, the data will be mapped to the scaled
local coordinate system:

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
    :scale-x="[2, 8]"
    :scale-y="[4, 16]"
    :data="{ a: [1, 2, 3, 4], b: [5, 6, 7, 8] }"
  >

    <vgg-map v-slot="{ row }">

      <vgg-point :x="{ val: row.a, scale: 'a' }" :y="{ val: row.b, scale: 'b' }" />

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

TODO: explain how to combine this with mapping once layout and stuff are worked out

### Creating compositions of marks

TODO
