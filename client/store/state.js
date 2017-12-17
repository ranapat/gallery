/**
 * Store states
 */

import { view, filter } from '../config'

const state = {
  data: null,
  dataLoading: false,
  dataLoadError: null,

  sidebarOpened: true,

  view: view.list.key,
  filter: filter.all.key,

  status: '',

  favorites: []
}

export default state
