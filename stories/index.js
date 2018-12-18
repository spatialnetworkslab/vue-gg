import { storiesOf } from '@storybook/vue'

import Scatterplot from './charts/Scatterplot.vue'
import BarChart from './charts/BarChart.vue'
import PlotLines from './charts/PlotLines.vue'
import TestCategoricalDomain from './charts/TestCategoricalDomain.vue'

storiesOf('Charts', module)
  .add('Scatterplot', () => (Scatterplot))
  .add('Bar chart', () => (BarChart))
  .add('Plot lines', () => (PlotLines))
  .add('Test: categorical domain', () => (TestCategoricalDomain))
