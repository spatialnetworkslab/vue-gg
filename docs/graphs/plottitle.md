---
title: Plot Title
---

# Plot Title

Titles can be added to graphs using the `vgg-plot-title` component. The components takes the following props:

Prop      | Required | Type      | Default    |  Description 
----------|----------|-----------|------------|----------------------------
Text      | false    | String    | Plot Title | Text to put in plot title
vjust     | false    | [String, Number] | center     | Horizontal position of title
hjust     | false    | [String, Number]   |'t'         | Vertical position of title
margin    | false    | Number    | 50         | Margin of text
color     | false    | String    | black      | Font color
fontSize  | false    | Number    | 16         | Font size
fontFamily| false    | String    | Helvetica  | Font family
anchorPoint| false   | String    | center     | Anchor point of text

```
<vgg-plot-title
	text="Bar Chart"
	hjust="l"
	:vjust="0.25"
	anchorPoint="lt"
/>
```