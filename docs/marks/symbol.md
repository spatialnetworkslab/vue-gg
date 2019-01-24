---
title: Symbol Mark
---

# Component tag

`<vgg-symbol>`

# Description

The Symbol mark is used for plotting point data, with each data instance being represented as a symbol (or shape). The most common use for the Symbol mark is in a scatterplot with the shape set to `circle`.

# Props

### Positioning

| Prop | Required | Regular types   | Types when mapping                       | Default   | Description                              | Unit(s)           |
| ---- | -------- | --------------- | ---------------------------------------- | --------- | ---------------------------------------- | ----------------- |
| x    | true     | [Number, String]| [Number, String, Date, Object, Function] | undefined | x-coordinates of center of each symbol   | Local coordinates |
| y    | true     | [Number, String]| [Number, String, Date, Object, Function] | undefined | y-coordinates of center of each symbol   | Local coordinates |

### Other aesthetics

| Prop           | Required | Regular types | Types when mapping         | Default   | Description    | Unit(s)                    |
|----------------|----------|---------------|----------------------------|-----------|----------------|----------------------------|
| stroke         | false    | String        | [String, Object, Function] | undefined | Stroke color   | Named color, hex, rgb, hsl |
| stroke-width   | false    | Number        | [Number, Object, Function] | undefined | Stroke width   | Screen pixel               |
| stroke-opacity | false    | Number        | [Number, Object, Function] | undefined | Stroke opacity | Number between 0 to 1      |
| fill           | false    | String        | [String, Object, Function] | 'black'   | Fill color     | Named color, hex, rgb, hsl |
| fill-opacity   | false    | Number        | [Number, Object, Function] | undefined | Fill opacity   | Number between 0 and 1     |
| opacity        | false    | Number        | [Number, Object, Function] | undefined | Mark opacity   | Number between 0 and 1     |

These are analogous to the CSS properties of the same names.

### Other props

| Prop        | Required | Types   | Default | Description                                                              |
| ----------- | -------- | ------- | ------- | ------------------------------------------------------------------------ |
| shape       | false    | String  | 'circle'| Shape of the symbol                                                      |
| size        | false    | Number  | 10      | Length and width of the symbol                                           |
| transition  | false    | Number  | 0       | Time taken to animate changes to each symbol when data changes           |

# Usage

### Positioning

To render the Symbol mark, you will need the `x` and `y` props. These represent the coordinates of the center point of each shape.

All above props can be passed as an Array of `Numbers` or `Strings` (for categorical variables). They can also be passed as an entire column within the data scope. However, the length of the two variable sets must be the same.

### Other props

The `shape` prop sets the shape of the symbol mark. The value defaults to `circle` but can be set to any of the available options: `square`, `cross`, `diamond`, `triangle-up`, `triangle-down`, `triangle-left`, `triangle-right` and `star`. Additionally, it is also possible to provide a custom shape, specified as a SVG path string with coordinates scaled to [-1, 1] both horizontally and vertically.

`size` defaults to 10px. This same value refers to both the height and width of the shape. In order to improve the accuracy when reading off the (x, y) values of the center point of each symbol instance, we do not allow height and width of the symbol mark to take on different values.

`transition` is disabled by default. It can be set to take any arbitrary length of time in seconds.

# Example

<SymbolMarkDemo />