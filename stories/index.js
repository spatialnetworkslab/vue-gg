import { storiesOf } from '@storybook/vue'

import Scatterplot from './sandbox/Scatterplot.vue'
import BarChart from './sandbox/BarChart.vue'
import PlotLines from './sandbox/PlotLines.vue'
import TestCategoricalDomain from './sandbox/TestCategoricalDomain.vue'

// storiesOf('Charts', module)

storiesOf('Sandbox', module)
  .add('Scatterplot', () => (Scatterplot))
  .add('Bar chart', () => (BarChart))
  .add('Plot lines', () => (PlotLines))
  .add('Test: categorical domain', () => (TestCategoricalDomain))
