import { storiesOf } from '@storybook/vue'

import Scatterplot from './charts/Scatterplot.vue'

import Scatterplot2 from './sandbox/Scatterplot.vue'
import BarChart from './sandbox/BarChart.vue'
import Heatmap from './sandbox/Heatmap.vue'
import HeatmapCombinatorial from './sandbox/HeatmapCombinatorial.vue'
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


// IDC Scatterplot Matrices
import IDCScatter40 from './idc/idcScatterplotMatrix40.vue'
import IDCScatter10 from './idc/idcScatterplotMatrix10.vue'
import IDCScatter5 from './idc/idcScatterplotMatrix5.vue'
import IDCScatterMono from './idc/idcScatterplotMono.vue'
import IDCScatterLabel from './idc/idcScatterplotLabel.vue'
import IDC100 from './idc/idcGraphs100.vue'

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

storiesOf('idcSandbox', module)
  .add('Scatterplot Matrix 40', () => (IDCScatter40))
  .add('Scatterplot Matrix 10', () => (IDCScatter10))
  .add('Scatterplot Matrix 5', () => (IDCScatter5))
  .add('Scatterplot Matrix Color 100', () => (IDC100))
  .add('Scatterplot Matrix Monochrome', () => (IDCScatterMono))
  .add('Scatterplot Labels', () => (IDCScatterLabel))
  .add('Heatmap', () => (Heatmap))
  .add('Heatmap All Combinations', () => (HeatmapCombinatorial))
