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
import OtherGeoShapes from './sandbox/OtherGeoShapes.vue'
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
import SelectTest from './sandbox/SelectTest.vue'
import MultipleSelections from './sandbox/MultipleSelections.vue'
import NestedSelection from './sandbox/NestedSelection.vue'
import AteAxisScaleBug from './sandbox/AteAxisScaleBug.vue'
import Facets from './sandbox/Facets.vue'
<<<<<<< HEAD
import CurveExplorer from './sandbox/CurveExplorer.vue'
import RegressionExplorer from './sandbox/RegressionExplorer.vue'
=======
import DomainError from './sandbox/DomainError.vue'
import EmptyData from './sandbox/EmptyData.vue'
import DuplicateScales from './sandbox/DuplicateScales.vue'
import ClassificationTest from './sandbox/ClassificationTest.vue'
import ScaleTransformation from './sandbox/ScaleTransformation.vue'
>>>>>>> 1d8830604336471069d6859937511b447762b57b

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
  .add('Test: Error handling for invalid geometries', () => (OtherGeoShapes))
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
  .add('Selection test', () => (SelectTest))
  .add('Multiple selections', () => (MultipleSelections))
  .add('Nested selection', () => (NestedSelection))
  .add('Ate axis scale bug', () => (AteAxisScaleBug))
  .add('Facets', () => (Facets))
<<<<<<< HEAD
  .add('Curve Explorer', () => (CurveExplorer))
  .add('Regression Explorer', () => (RegressionExplorer))
=======
  .add('DomainError', () => (DomainError))
  .add('Empty data', () => (EmptyData))
  .add('Duplicate scales', () => (DuplicateScales))
  .add('Classification test', () => ClassificationTest)
  .add('Scale transformation', () => (ScaleTransformation))
>>>>>>> 1d8830604336471069d6859937511b447762b57b
