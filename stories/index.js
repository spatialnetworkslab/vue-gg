import { storiesOf } from '@storybook/vue'

import Scatterplot from './charts/Scatterplot.vue'

import Scatterplot2 from './sandbox/Scatterplot.vue'
import BarChart from './sandbox/BarChart.vue'
import PlotLines from './sandbox/PlotLines.vue'
import TestCategoricalDomain from './sandbox/TestCategoricalDomain.vue'
import NestedCoordinateSystem from './sandbox/NestedCoordinateSystem.vue'

storiesOf('Charts', module)
  .add('Scatterplot', () => (Scatterplot))

storiesOf('Sandbox', module)
  .add('Scatterplot2', () => (Scatterplot2))
  .add('Bar chart', () => (BarChart))
  .add('Plot lines', () => (PlotLines))
  .add('Test: categorical domain', () => (TestCategoricalDomain))
  .add('Test: nested coordinate system', () => (NestedCoordinateSystem))
