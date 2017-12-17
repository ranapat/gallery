/**
 * Store actions
 *
 * o loads data with axios
 * o takes all api endpoints from config
 * o triggers all needed commits
 */

import axios from 'axios'
import { tf } from 'tasksf'

import { api, filter as filterConfig } from '../config'
import { types } from './mutations'

const actions = {
  loadData ({ commit }, url) {
    commit(types.startLoadingData)
    commit(types.populateData, [])
    commit(types.setDataLoadError, null)

    commit(types.setStatus, 'loading data...')

    return new Promise((resolve, reject) => {
      axios.get(url || api.data).then(
        response => {
          commit(types.populateData, response.data)
          commit(types.stopLoadingData)

          commit(types.setStatus, 'data loaded...')

          resolve()
        }, error => {
        commit(types.stopLoadingData)
        commit(types.setDataLoadError, error)

        commit(types.setStatus, 'data error...')
      })
    })
  },

  openSidebar ({ commit }) {
    commit(types.openSidebar)
  },
  closeSidebar ({ commit }) {
    commit(types.closeSidebar)
  },

  setView ({ commit }, view) {
    commit(types.setView, view)
  },
  setFilter ({ commit, dispatch, state }, filter) {
    commit(types.setFilter, filter)

    commit(types.setStatus, `setting filter to ${filter}`)
    if (filter === filterConfig.favorites.key) {
      commit(types.startLoadingData)
      commit(types.populateData, [])
      commit(types.setDataLoadError, null)

      commit(types.setStatus, 'loading remote favorites...')

      const favorites = state.favorites || []

      const data = {
        count: 0,
        items: [],
        next: undefined
      }

      const limiter = tf.limiter(3, () => {
        commit(types.setStatus, 'remote favorites loaded...')

        commit(types.populateData, data)
      })
      for (let i = 0; i < favorites.length; ++i) {
        limiter.push(tf.task(complete => {
          const url = favorites[i]

          axios.get(url).then(
            response => {
              data.items.push(response.data)
              data.count++

              commit(types.setStatus, 'remote favorite loaded...')
              commit(types.populateData, data)

              complete()
            }, error => {
            commit(types.setStatus, `remote favorite failed... ${error}`)

            complete()
          })
        }, 0))
      }

      limiter.run()
    } else if (filter === filterConfig.all.key) {
      dispatch('loadData')
    }
  },

  loadLocalFavorites ({ commit }) {
    commit(types.setStatus, 'loading local favorites...')
    commit(types.loadLocalFavorites)
  },
  addToFavorites ({ commit }, item) {
    commit(types.addToFavorites, item)
  },
  removeFromFavorites ({ commit }, item) {
    commit(types.removeFromFavorites, item)
  }

}

export default actions
