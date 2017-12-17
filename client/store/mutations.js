/**
 * Store mutations
 */

import Vue from 'vue'

const types = {
  startLoadingData: 'START_LOADING_DATA',
  stopLoadingData: 'STOP_LOADING_DATA',
  populateData: 'POPULATE_DATA',
  setDataLoadError: 'SET_DATA_LOAD_ERROR',

  openSidebar: 'OPEN_SIDEBAR',
  closeSidebar: 'CLOSE_SIDEBAR',

  setView: 'SET_VIEW',
  setFilter: 'SET_FILTER',

  setStatus: 'SET_STATUS',

  loadLocalFavorites: 'LOAD_LOCAL_FAVORITES',
  addToFavorites: 'ADD_TO_FAVORITES',
  removeFromFavorites: 'REMOVE_FROM_FAVORITES'
}

const mutations = {
  [types.startLoadingData] (state) {
    state.dataLoading = true
  },
  [types.stopLoadingData] (state) {
    state.dataLoading = false
  },
  [types.populateData] (state, payload) {
    state.data = payload
  },
  [types.setDataLoadError] (state, payload) {
    state.dataLoadError = payload
  },

  [types.openSidebar] (state) {
    state.sidebarOpened = true
  },
  [types.closeSidebar] (state) {
    state.sidebarOpened = false
  },

  [types.setView] (state, payload) {
    state.view = payload
  },
  [types.setFilter] (state, payload) {
    state.filter = payload
  },

  [types.setStatus] (state, payload) {
    state.status = payload
    console.log('New status set', payload)
  },

  [types.loadLocalFavorites] (state) {
    state.favorites = Vue.$storage.get('favorites') || []
  },
  [types.addToFavorites] (state, payload) {
    if (state.favorites.indexOf(payload) === -1) {
      state.favorites.push(payload)

      Vue.$storage.set('favorites', state.favorites)
    }
  },
  [types.removeFromFavorites] (state, payload) {
    const index = state.favorites.indexOf(payload)
    if (index !== -1) {
      state.favorites.splice(index, 1)

      Vue.$storage.set('favorites', state.favorites)
    }
  }

}

export default mutations
export { types }
