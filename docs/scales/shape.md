---
title: Shape
---

# Shape Schemes

We provide a few default shape schemes that can be used as scales for categorical variables.

### prop definition

```
<vgg-symbol
	:shape = "{ val: row.x, scale: { type: 'shape8', domain: 'row.x' } }">
```

### shape8

This is the default scale for shapes. It provides 8 distinct shapes that can be assigned to different categories.

<ShapeScale />

### triangles

This scale provides 4 distinct triangles that can be assigned to different categories.

<ShapeScale scheme="triangles" />

### stars

This scale provides 4 distinct stars that can be assigned to different categories.

<ShapeScale scheme="stars" />

### polygons

This scale provides 6 distinct polygons that can be assigned to different categories.

<ShapeScale scheme="polygons" />

# Custom Shape Schemes

It is possible to define a custom shape scheme by providing an array of `ranges` to the scaling options instead of `type`. Elements of the array can be pre-defined shape names or custom shape paths.

### prop definition

```
<vgg-symbol
	:shape = "{
		val: row.x,
		scale: { ranges: ['circle', 'star', 'M-1,-1H1V1H-1Z', 'diamond'],
				 domain: 'row.x' }
	}" >
```

<ShapeScale scheme="custom" />
