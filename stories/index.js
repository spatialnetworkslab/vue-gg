import { storiesOf } from '@storybook/vue'

import Scatterplot from './charts/Scatterplot.vue'

import Scatterplot2 from './sandbox/Scatterplot.vue'
import BarChart from './sandbox/BarChart.vue'
import Heatmap from './sandbox/Heatmap.vue'
import PlotLines from './sandbox/PlotLines.vue'
import TestCategoricalDomain from './sandbox/TestCategoricalDomain.vue'
import NestedCoordinateSystem from './sandbox/NestedCoordinateSystem.vue'
import TestAbsolute from './sandbox/TestAbsolute.vue'
import TransformTest from './sandbox/TransformTest.vue'
import BinningTest from './sandbox/BinningTest.vue'
import GeoShape from './sandbox/GeoShape.vue'
import MissingInvalidData from './sandbox/MissingInvalidData.vue'
import MultiLines from './sandbox/MultiLines.vue'
import Areas from './sandbox/Areas.vue'
import TestSymbol from './sandbox/TestSymbol.vue'
import TrailMark from './sandbox/TrailMark.vue'
import SingleMultiLine from './sandbox/SingleMultiLine.vue'
import ScaleComponent from './sandbox/ScaleComponent.vue'
import GlobalDataScope from './sandbox/GlobalDataScope.vue'
import IDC from './sandbox/idcGraphs.vue'
import IDC2 from './sandbox/idcGraphs2.vue'
import IDC3 from './sandbox/idcGraphs3.vue'

storiesOf('Charts', module)
  .add('Scatterplot', () => (Scatterplot))

storiesOf('Sandbox', module)
  .add('Scatterplot2', () => (Scatterplot2))
  .add('Bar chart', () => (BarChart))
  .add('Plot lines', () => (PlotLines))
  .add('Test: categorical domain', () => (TestCategoricalDomain))
  .add('Test: nested coordinate system', () => (NestedCoordinateSystem))
  .add('Test: absolute', () => (TestAbsolute))
  .add('Test: transform', () => (TransformTest))
  .add('Test: binning', () => (BinningTest))
  .add('Test: GeoShape', () => (GeoShape))
  .add('Test: missing', () => (MissingInvalidData))
  .add('Test: Area Mark', () => (Areas))
  .add('MultiLines', () => (MultiLines))
  .add('TestSymbol', () => (TestSymbol))
  .add('Single MultiLine', () => (SingleMultiLine))
  .add('Trail', () => (TrailMark))
  .add('Scale component', () => (ScaleComponent))
  .add('Global data scope', () => (GlobalDataScope))
  .add('Scatterplot Matrix Color', () => (IDC))
  .add('Scatterplot Matrix Monochrome', () => (IDC2))
  .add('Scatterplot Labels', () => (IDC3))
  .add('Heatmap', () => (Heatmap))
