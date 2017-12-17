import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import Moment from 'vue-moment'

import * as config from '@/config'
import List from '@/components/List'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

Vue.use(Vuex)
Vue.use(BootstrapVue)

const mockStore = () => {
  const state = {
    data: null,
    dataLoading: false,
    dataLoadError: null,

    sidebarOpened: true,

    view: config.view.list.key,
    filter: config.filter.all.key,

    status: '',

    favorites: []
  }

  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
}

describe('List', () => {
  it('has a created hook', () => {
    expect(typeof List.mounted).toBe('function')
  })

  it('renders the correct message and state in loading', done => {
    const store = mockStore()
    expect(store.state.dataLoading).toBe(false)

    // remove mounted - it causes render problems
    List.mounted = undefined

    const vm = new Vue({
      render: h => h(List),
      store,
    }).$mount()

    // simulate loading from mounted
    store.state.dataLoading = true

    expect(store.state.dataLoading).toBe(true)
    expect(vm.$el.textContent.trim()).toBe('No data')

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent.trim()).toContain('Data loading...')
        done()
      })
      .catch(done)
  })

  it('renders the correct message and state in error', done => {
    const store = mockStore()

    const vm = new Vue({
      render: h => h(List),
      store,
    }).$mount()

    store.state.dataLoading = false
    store.state.dataLoadError = {
      response: {
        data: {
          message: 'error message'
        }
      }
    }

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Data loading error : error message')
        done()
      })
      .catch(done)
  })

  it('renders the correct message and state in data', done => {
    const store = mockStore()

    Vue.use(Moment)

    const vm = new Vue({
      render: h => h(List),
      store,
    }).$mount()

    store.state.dataLoading = false
    store.state.data = {
      count: 1,
      items: [
        { self: 'self', data: { title: 'title', created_at: new Date(), images: { thumbnails: [ { width: 256, height: 128, url: 'url'  } ] } } }
      ],
      next: ''
    }

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('title')
        expect(vm.$el.textContent).toContain('Add')
        expect(vm.$el.textContent).toContain('2017')

        done()
      })
      .catch(done)
  })

})
