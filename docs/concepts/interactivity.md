---
title: Interactivity
---

# Interactivity

Adding interactivity to graphics can greatly aid the discovery of patterns in
data. Below, some ways to interact with graphics are described.

## Hovering and clicking

The first and most straightforward way of interacting with data is clicking
or hovering over the marks that data has been mapped to. All marks, except for
the Label (for now), can be made interactive by adding a `click`, `hover`,
`mouseover` or `mouseout` event. Hovering or clicking is often used as a way
to request more (detailed) information about a certain data point. For example,
take this bar chart, where more information is shown about each fruit by hovering
over a bar:

::: v-pre
```html
<template>
  <div>
    <div v-if="hoverRow" style="float: right;">
      <h3>{{ hoverRow.fruit }}</h3>
      <h5>quantity: {{ hoverRow.quantity }}</h5>
      <p>
        {{ metadata.description[hoverRow.fruit] }}
      </p>
    </div>

    <vgg-graphic
      :width="300"
      :height="300"
      :data="{
        fruit: ['apple', 'banana', 'coconut', 'durian'],
        quantity: [5, 20, 10, 8]
      }"
    >

      <vgg-section
        :x1="0"
        :x2="300"
        :y1="0"
        :y2="275"
        :axes="{
          right: { scale: { domain: 'quantity', domainMin: 0 } },
          bottom: { scale: 'fruit' }
        }"
      >

        <vgg-map v-slot="{ row, i }">

          <vgg-rectangle
            :x="{ val: row.fruit, scale: 'fruit' }"
            :w="{ band: { domain: 'fruit', padding: 0.2 } }"
            :y1="0"
            :y2="{ val: row.quantity, scale: { domain: 'quantity', domainMin: 0 } }"
            :fill="hoverI === i ? 'green' : 'black'"
            @hover="handleHover($event, row, i)"
          />

        </vgg-map>

      </vgg-section>

    </vgg-graphic>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hoverI: null,
      hoverRow: null,

      metadata: {
        description: {
          apple: 'The natural enemy of the doctor',
          banana: 'Watch out: slippery after consumption',
          coconut: 'An indispensable ingredient in Indonesian cuisine',
          durian: 'The rich person\'s jackfruit'
        }
        }
      }
    }
  },

  methods: {
    handleHover (e, row, i) {
      if (e) {
        this.hoverI = i
        this.hoverRow = row
      } else {
        this.hoverI = null
        this.hoverRow = null
      }
    }
  }
}
</script>
```
:::

<hover-bar-chart />

## Selecting

If hovering and clicking are ways to interact with individual marks, selecting
is a way to interact with multiple marks at the same time. To enable selections:

1. Enable the desired selection tool on the appropriate Section
2. Add listeners for `select` and `deselect` events on the desired marks
3. Synchronise the outlines (`selectionBounds`) of the selection tool with a
polygon or other mark, to make the shape created with the selection tool visible.

Four selection tools are currently supported: the `rectangle`, `swipeX`, `swipeY`,
and `polygon`, where the `swipeX` and `swipeY` tools are just the rectangle with
respectively the y and x dimensions fixed to the entire span of the Section.

::: v-pre
```html
<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="data"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :axes="{
        left: { scale: 'b' },
        bottom: { scale: 'a' }
      }"
      :select="'rectangle'"
      :selection-bounds.sync="selectionBounds"
    >

      <vgg-map v-slot="{ row, i }">
        <vgg-point
          :x="{ val: row.a, scale: 'a' }"
          :y="{ val: row.b, scale: 'b' }"
          :fill="selectedPoints[i] ? 'blue' : 'black'"
          @select="handleSelect(i, true)"
          @deselect="handleSelect(i, false)"
        />
      </vgg-map>

    </vgg-section>

    <vgg-polygon
      v-if="selectionBounds.length > 1"
      :points="selectionBounds"
      :fill="'red'"
      :opacity="0.2"
    />

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      selectionBounds: [],
      selectedPoints: {},

      data: {
        a: new Array(50).fill(0).map((_, i) => Math.random() * i),
        b: new Array(50).fill(0).map((_, i) => Math.random() * i)
      }
    }
  },

  methods: {
    handleSelect (i, add) {
      if (add) {
        this.$set(this.selectedPoints, i, true)
      } else {
        this.$delete(this.selectedPoints, i)
      }
    }
  }
}
</script>
```
:::

<select-test />

## Zooming

TODO

## Brushing

TODO

## An Important Note

Generally, if rendering an additional mark when an interaction is performed, it is best to place the new mark component outside of any `<vgg-map>` components.

This is because in most cases only a single new mark is needed for a single row of data, there is thus no need to map all the rows. Placing the new mark within the map component may cause significant lagging.

This is fast:

```html
<vgg-map v-slot="{ row }">

  <vgg-point
    @hover="handleHover($event, row)"
    :x="row[x]"
    :y="row[y]"
    :radius="3"
  />

</vgg-map>

<vgg-point
  v-if="hoverRow"
  :x="hoverRow[x]"
  :y="hoverRow[y]"
  fill="red"
  :radius="3"
/>
```

But this is slow:

```html
<vgg-map v-slot="{ row }">

  <vgg-point
    @hover="handleHover($event, row)"
    :x="row[x]"
    :y="row[y]"
    :radius="3"
  />

  <vgg-point
    v-if="hoverRow"
    :x="hoverRow[x]"
    :y="hoverRow[y]"
    fill="red"
    :radius="3"
  />

</vgg-map>
```
