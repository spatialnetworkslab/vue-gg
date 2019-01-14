---
title: Creating Custom Color Scales
---

# Creating Custom Color Scales

Suppose we want to color code each category of fruits from the [custom graph](../tutorials/custom2.html).

It is possible to do so by using one of the [convenience color scales](../scales/color.html) provided. Like so:

```vue{4}
<!-- Demo here -->
```

## Scale by Nominal Variable

## Legends

As usual, legends can be added for greater clarity.

## Scale by Numeric Variable

It is also possible to create a color scale to vary the color of the points according to some variable of type `ratio` or `count`.

In the following example, the color is scaled according to the `diameter` variable. The point appears dark blue if its diameter is greater than 8cm, and light blue if its diameter is smaller than 8cm.