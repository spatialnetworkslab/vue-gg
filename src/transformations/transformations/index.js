import filter from './filter.js'
import select from './select.js'
import arrange from './arrange.js'
import rename from './rename.js'
import { mutate, transmute } from './mutate.js'
import summarise from './summarise.js'
import groupBy from './groupBy.js'

export default {
  filter,
  select,
  arrange,
  rename,
  mutate,
  transmute,
  summarise,
  'summarize': summarise,
  groupBy
}
