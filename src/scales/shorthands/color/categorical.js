import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10, schemeAccent, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3 } from 'd3-scale-chromatic'

export default {
  custom,
  category10,
  accent,
  dark2,
  paired,
  pastel1,
  pastel2,
  schemePastel2,
  set1,
  set2,
  set3
}

function custom (type, domain, range) {
  return scaleOrdinal([[domain], range])
}

// Ordinal scales according to built-in d3 ordinal color scales
function category10 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemeCategory10)
}

function accent (domain, range) {
  return scaleOrdinal().domain(domain).range(schemeAccent)
}

function dark2 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemeDark2)
}

function paired (domain, range) {
  return scaleOrdinal().domain(domain).range(schemePaired)
}

function pastel1 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemePastel1)
}

function pastel2 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemePastel2)
}

function set1 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemeSet1)
}

function set2 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemeSet2)
}

function set3 (domain, range) {
  return scaleOrdinal().domain(domain).range(schemeSet3)
}
