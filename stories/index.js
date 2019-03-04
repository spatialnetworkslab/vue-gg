import { storiesOf } from '@storybook/vue'

import Scatterplot from './charts/Scatterplot.vue'
import MultiLine from './charts/MultiLine.vue'

import Scatterplot2 from './sandbox/Scatterplot.vue'
import BarChart from './sandbox/BarChart.vue'
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

import SimpleGridLayout from './sandbox/SimpleGridLayout.vue'
import MappingGridLayout from './sandbox/MappingGridLayout.vue'
import RepeatLayout from './sandbox/RepeatLayout.vue'
import SectionAxesTest from './sandbox/SectionAxesTest.vue'

// IDC Scatterplot Matrices
import IDCScatter40 from './idc/idcScatterplotMatrix40.vue'
import IDCScatter10 from './idc/idcScatterplotMatrix10.vue'
import IDCScatter1010 from './idc/idcScatterplotMatrix10-10.vue'
import IDCScatter5 from './idc/idcScatterplotMatrix5.vue'
import IDCScatter510 from './idc/idcScatterplotMatrix5-10.vue'
import IDCScatter510motorbikes from './idc/idcScatterplotMatrix5-10_motorbikes.vue'
import IDCScatterMono from './idc/idcScatterplotMono.vue'
import IDCScatterLabel from './idc/idcScatterplotLabel.vue'
import IDC100 from './idc/idcGraphs100.vue'
import IDCScatterMotorbikes from './idc/idcScatterplotMatrixMotorbikes.vue'

// IDC Heatmaps
import Heatmap from './idc/Heatmap.vue'
import HeatmapCombinatorial from './idc//HeatmapCombinatorial.vue'

// Fun graphs
import Minard from './funGraphs/Minard.vue'

storiesOf('Charts', module)
  .add('Scatterplot', () => (Scatterplot))
  .add('MultiLine', () => (MultiLine))

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
  .add('Simple Grid layout', () => (SimpleGridLayout))
  .add('Mapping Grid layout', () => (MappingGridLayout))
  .add('Repeat Grid layout', () => (RepeatLayout))
  .add('Section axes', () => (SectionAxesTest))

storiesOf('idcSandbox', module)
  .add('Scatterplot Matrix 40', () => (IDCScatter40))
  .add('Scatterplot Matrix 10', () => (IDCScatter10))
  .add('Scatterplot Matrix 10 10', () => (IDCScatter1010))
  .add('Scatterplot Matrix 5', () => (IDCScatter5))
  .add('Scatterplot Matrix 5 10', () => (IDCScatter510))
  .add('Scatterplot Matrix Color 100', () => (IDC100))
  .add('Scatterplot Matrix Monochrome', () => (IDCScatterMono))
  .add('Scatterplot Labels', () => (IDCScatterLabel))
  .add('Scatterplot Matrix 5 10 Motorbikes', () => (IDCScatter510motorbikes))
  .add('Scatterplot Matrix General Motorbikes', () => (IDCScatterMotorbikes))
  .add('Single Heatmap', () => (Heatmap))
  .add('Combinatorial Heatmap', () => (HeatmapCombinatorial))

storiesOf('Fun Graphs', module)
  .add('Minard', () => (Minard))
