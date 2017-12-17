import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import * as config from '@/config'
import Topbar from '@/components/Topbar'
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

describe('Topbar', () => {
  it('renders the correct buttons for hide / show', done => {
    const store = mockStore()
    expect(store.state.sidebarOpened).toBe(true)

    const vm = new Vue({
      render: h => h(Topbar),
      store,
    }).$mount()

    // simulate side close
    store.state.sidebarOpened = false

    expect(store.state.sidebarOpened).toBe(false)
    expect(vm.$el.textContent.trim()).toBe('Favorite 360 Example...')

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Open')
        done()
      })
      .catch(done)
  })

  it('renders the correct status', done => {
    const store = mockStore()
    expect(store.state.status).toBe('')

    const vm = new Vue({
      render: h => h(Topbar),
      store,
    }).$mount()

    // simulate status change
    store.state.status = 'something'

    expect(store.state.status).toBe('something')
    expect(vm.$el.textContent.trim()).toBe('Favorite 360 Example...')

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('something')
        done()
      })
      .catch(done)
  })

})
