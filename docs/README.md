---
home: true
description: A Vue-based framework for componentized data visualizations
actionText: Get Started →
actionLink: /guide/intro
features:
- title: The Grammar of Graphics
  details: The library adapts the original grammar first proposed by Hadley Wickam and takes a componentized approach to creating Vue data visualizations.
- title: Templates
  details: To make it easy to start using the Vue Graphics Grammar library, we provide templates of common graphs that can be easily plugged into your Vue app.
- title: Components
  details: Flexible graph components can be combined in a variety of different ways to create custom graphs quickly and efficiently.
---

## Gallery

For a sense of the range of visualizations made possible using the library, check out these real-and-famous graphs below:

<vgg-graphic
:width="600"
:height="600"
:data="[
{ date: new Date('November 16, 2018') },
{ date: new Date('November 17, 2018') },
{ date: new Date('November 18, 2018') }
]"
>

<vgg-section
:x1="100"
:x2="500"
:y1="100"
:y2="500"
:scales="{
x: 'date',
y: [0, 100]
}"
>

<vgg-map>

<vgg-point
    :x="row => row.date"
    :y="50"
    :radius="7"
/>

</vgg-map>

<vgg-polygon
:points="[
[new Date('November 16, 2018'), 25],
[new Date('November 17, 2018'), 75],
[new Date('November 18, 2018'), 50]
]"
/>

</vgg-section>

<vgg-x-axis
:x1="100"
:x2="500"
:y1="50"
:y2="100"
:tick-count="3"
scale="date"
/>

</vgg-graphic>