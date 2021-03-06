import filter from './filter.js'
import select from './select.js'
import arrange from './arrange.js'
import rename from './rename.js'
import { mutate, transmute } from './mutate.js'
import summarise from './summarise.js'
import mutarise from './mutarise.js'
import groupBy from './groupBy.js'
import binning from './binning.js'
import dropNA from './dropNA.js'
import reproject from './reproject.js'
import transform from './transform.js'
import scale from './scale.js'

export default {
  filter,
  select,
  arrange,
  rename,
  mutate,
  transmute,
  summarise,
  'summarize': summarise,
  mutarise,
  'mutarize': mutarise,
  groupBy,
  binning,
  dropNA,
  reproject,
  transform,
  scale
}
