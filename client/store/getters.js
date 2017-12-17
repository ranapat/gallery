/**
 * Store getters
 */

import { view, filter } from '../config'

const getters = {
  data (state) {
    return state.data
  },
  dataLoadError (state) {
    return state.dataLoadError
  },
  dataLoading (state) {
    return state.dataLoading
  },

  sidebarOpened (state) {
    return state.sidebarOpened
  },

  views () {
    return view.default
  },

  filters () {
    return filter.default
  },

  view (state) {
    return state.view
  },
  filter (state) {
    return state.filter
  },

  status (state) {
    return state.status
  },

  favorites (state) {
    return state.favorites
  }
}

export default getters
