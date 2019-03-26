---
title: Plot Title
---

# Component Tag

`<vgg-plot-title>`

# Description

As its name suggests, the plot title component adds a title to the overall graphic. It is also possible to use this component to label separate sections as well.

Although similar to the Label Mark, the plot title component assumes there will only be one title component per section or graphic. As such, the plot title component is not mappable. In situations where a mappable text component is needed, it is recommended that you use the Label Mark instead.

# Plot Title

Titles can be added to graphs using the `vgg-plot-title` component. The component takes the following props:

| Prop        | Required | Type             | Default    | Description                  |
| ----------- | -------- | ---------------- | ---------- | ---------------------------- |
| Text        | false    | String           | Plot Title | Text to put in plot title    |
| vjust       | false    | [String, Number] | center     | Horizontal position of title |
| hjust       | false    | [String, Number] | 't'        | Vertical position of title   |
| margin      | false    | Number           | 50         | Margin of text               |
| color       | false    | String           | black      | Font color                   |
| fontSize    | false    | Number           | 16         | Font size                    |
| fontFamily  | false    | String           | Helvetica  | Font family                  |
| anchorPoint | false    | String           | center     | Anchor point of text         |

 The `vjust` and `hjust` props are used to position the title relative to a
 section or the overall graphic. It is centered at the top by default.

```
<vgg-plot-title
	text="Bar Chart"
	hjust="l"
	:vjust="0.25"
/>
```

### Styling props

Prop      | Required | Type      | Default    |  Description               | Unit(s)                    |
----------|----------|-----------|------------|----------------------------|----------------------------|
Text      | false    | String    | Plot Title | Text in plot title         | NA                         |
color     | false    | String    | black      | Font color                 | Named color, hex, rgb, hsl |
fontSize  | false    | Number    | 16         | Font size                  | Number, font size in px    |
fontFamily| false    | String    | Helvetica  | Font family                | NA                         |
anchorPoint| false   | String    | center     | Anchor point of text       | NA                         |
