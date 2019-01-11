---
title: XY
---

# XY Scales

We provide a few default scales for scaling the aesthetics `X`, `Y`, `X2` and `Y2`. These scales transform raw data values as input into output values that correspond to some visual distance on the plot.

Typically, the variables mapped to `X`, `Y`, `X2` and `Y2` need to be of type `ratio` or `count` for these scales to be applied.

### linear

The linear scale preserved proportional differences. The input value is scaled according to some linear function `input => input * m  + b` to produce the output value.

### log

The log scale transforms the input value according to some logarithmic function: `input => log2(input) * m  + b`.

Since the formula is logarithmic the domain cannot cross 0. If the domain lowerbound is 0, this value will be replaced by an artificially small value of 1e-6.

### square

The square scale transforms all input values by an exponential of 2: `input => input * input`.

### squareRoot

The squareRoot scale transforms all input value by an exponential of 0.5: `input => input ^ 0.5`.