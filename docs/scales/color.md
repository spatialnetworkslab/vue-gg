---
title: Color
---

# Color Scales

We provide a few default color scales that can be used as-is. They are based off the color scales as implemented in [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

Color scales can be applied to any variable of type ```quantitative```, ```categorical```, ```interval```, .

### Prop definition

```
<vgg-symbol
	:stroke="{ val: value, scale: { type: 'category10', domain: 'categorical' } }">
```
`val` is set to the value that the color scale will be mapped against. `domain` is set to the domain of `val`.

## Categorical

### category10
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/category10.png" alt="10 categorical colors" height="50px"/>

This is the default set of colors for categorical data.

### accent
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Accent.png" alt="accent color scale" height="50px"/>

### dark2
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Dark2.png" alt="dark2 color scale" height="50px"/>

### paired
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Paired.png" alt="paired color scale" height="50px"/>

### pastel1
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel1.png" alt="pastel1 color scale" height="50px"/>

### pastel2
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel2.png" alt="pastel2 color scale" height="50px"/>

### set1
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set1.png" alt="set1 color scale" height="50px"/>

### set2
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set2.png" alt="set2 color scale" height="50px"/>

### set3
<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set3.png" alt="set3 color scale" height="50px"/>


## Continuous

### brownBlue

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BrBG.png" alt="brown blue color scale" height="50px"/>

### purpleGreen

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PRGn.png" alt="purple green color scale" height="50px"/>

### pinkGreen

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PiYG.png" alt="pink green color scale" height="50px"/>

### purpleOrange

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuOr.png" alt="purple orange color scale" height="50px"/>

### redBlue

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdBu.png" alt="red blue color scale" height="50px"/>

### redGray

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdGy.png" alt="red gray color scale" height="50px"/>

### redYellowBlue

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlBu.png" alt="red yellow blue color scale" height="50px"/>

### redYellowGreen

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png" alt="red yellow green color scale" height="50px"/>

### spectral

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Spectral.png" alt="spectral color scale" height="50px"/>

### blues

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Blues.png" alt="blues color scale" height="50px"/>

### greens

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greens.png" alt="greens color scale" height="50px"/>

### greys

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greys.png" alt="greys color scale" height="50px"/>

### oranges

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Oranges.png" alt="oranges color scale" height="50px"/>

### purples

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Purples.png" alt="purples color scale" height="50px"/>

### reds

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Reds.png" alt="reds color scale" height="50px"/>

### viridis

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/viridis.png" alt="viridis color scale" height="50px" width="100%"/>

### inferno

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/inferno.png" alt="inferno color scale" height="50px" width="100%"/>

### magma

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/magma.png" alt="magma color scale" height="50px" width="100%"/>

### plasma

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/plasma.png" alt="plasma color scale" height="50px" width="100%"/>

### warm

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/warm.png" alt="warm color scale" height="50px" width="100%"/>

### cool

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cool.png" alt="cool color scale" height="50px" width="100%"/>

### cubehelixDefault

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cubehelix.png" alt="cubehelix default color scale" height="50px" width="100%"/>

### rainbow

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/rainbow.png" alt="rainbow color scale" height="50px" width="100%"/>

### sinebow

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/sinebow.png" alt="sinebow color scale" height="50px"/>

# Custom Color Scales

It is possible to define a custom color scale by providing an array of `ranges` to the scaling options instead of `type`. Elements of the array can be hexadecimal codes, RGB codes or color names.

### Prop definition

```
<vgg-symbol
	:fill="{ val: value, scale: { ranges: ['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange'], domain: [ ... ] } }"
```
<ColorScale/>
