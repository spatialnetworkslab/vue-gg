---
title: Label Mark
---
# Label Mark
The `vgg-label` mark is used to plot text elements.

<div style="display: flex;
	justify-content: space-around;
	align-items: center"
>

<div>

<MarkLabelSimple />

</div>

<div style='width: 40%; height: 100%;'>

```html
 <vgg-label
    :x="row.year"
    :y="row.population"
    :text="row.population"
    :font-size="12"
    font-family="Comic Sans MS"
    fill="#c66366"
/>
```

</div>

</div>

## Properties
A `vgg-label` can contain the following position properties.

### Positioning
| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| x   | true  | [Number, String, Date] | undefined | x coordinate    | Local coordinates |
| y   | true  | [Number, String, Date] | undefined | y coordinate   | Local coordinates |

### Other aesthetics
| Prop | Required | Types                  | Default   | Description          | Unit(s)           |
| ---- | -------- | ---------------------- | --------- | -------------------- | ----------------- |
| text  | false  | [String, Number] | undefined | Text to display    | NA |
| font-size  | false  | Number | 16 | Font size    | Screen pixel |
| font-weight  | false  | [String, Number] | 'normal' | Font weight    | Either a number between 0 and 1000, or 'normal', 'bold', etc. |
| font-family  | false  | String | 'Helvetica' | Font family    | Name of font family |
| rotation  | false  | Number | 0 | Degrees with which to rotate the mark    | Degrees |
| anchor-point  | false  | String | 'center' | Anchor point for x/y coordinate    | One of ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'] |
| stroke         | false    | String | 'none'    | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number | 0         | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number | 1         | Stroke opacity | Number between 0 and 1     |
| fill           | false    | String | '#000000' | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number | 1         | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number | 1         | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

## Usage

## Examples