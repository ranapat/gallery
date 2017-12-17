import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import * as config from '@/config'
import Sidebar from '@/components/Sidebar'
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

describe('Sidebar', () => {
  it('renders the correct default values for filter and view', () => {
    const store = mockStore()
    expect(store.state.view).toBe('list')
    expect(store.state.filter).toBe('all')
    expect(store.state.sidebarOpened).toBe(true)

    const vm = new Vue({
      render: h => h(Sidebar),
      store,
    }).$mount()

    expect(store.state.view).toBe('list')
    expect(store.state.filter).toBe('all')
    expect(store.state.sidebarOpened).toBe(true)
    expect(vm.$el.textContent).toContain('Hide')
  })

  it('renders the correct default valus for hide', done => {
    const store = mockStore()
    expect(store.state.sidebarOpened).toBe(true)

    const vm = new Vue({
      render: h => h(Sidebar),
      store,
    }).$mount()

    // simulate side close
    store.state.sidebarOpened = false

    expect(store.state.sidebarOpened).toBe(false)

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Hide')
        done()
      })
      .catch(done)
  })

})
