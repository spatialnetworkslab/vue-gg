import { storiesOf } from '@storybook/vue'

import Scatterplot from './charts/Scatterplot.vue'
import BarChart from './charts/BarChart.vue'
import PlotLines from './charts/PlotLines.vue'

storiesOf('Charts', module)
  .add('Scatterplot', () => (Scatterplot))
  .add('Bar chart', () => (BarChart))
  .add('Plot lines', () => (PlotLines))
