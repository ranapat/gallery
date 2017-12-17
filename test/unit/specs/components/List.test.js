import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

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

    view: view.list.key,
    filter: filter.all.key,

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

  /*
  it('renders the correct message and state in loading', done => {
    const store = mockStore()
    expect(store.state.repositoriesLoading).toBe(false)

    // remove mounted - it causes render problems
    Repositories.mounted = undefined

    const vm = new Vue({
      render: h => h(Repositories),
      store,
    }).$mount()

    // simulate loading from mounted
    store.state.repositoriesLoading = true

    expect(store.state.repositoriesLoading).toBe(true)
    expect(vm.$el.textContent.trim()).toBe('')

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Repositories loading...')
        done()
      })
      .catch(done)
  })

  it('renders the correct message and state in error', done => {
    const store = mockStore()

    const vm = new Vue({
      render: h => h(Repositories),
      store,
    }).$mount()

    store.state.repositoriesLoading = false
    store.state.repositoriesLoadError = {
      response: {
        data: {
          message: 'error message'
        }
      }
    }

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Repositories loading error : error message')
        done()
      })
      .catch(done)
  })

  it('renders the correct message and state in data', done => {
    const store = mockStore()

    const vm = new Vue({
      render: h => h(Repositories),
      store,
    }).$mount()

    store.state.repositoriesLoading = false
    store.state.repositories = [
      {
        'id': 'test id', 'name': 'test name', 'homepage': 'test homepage', 'private': 'test private', 'open_issues': 'test open issues', 'watchers': 'test watchers'
      }
    ]

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('id')
        expect(vm.$el.textContent).toContain('name')
        expect(vm.$el.textContent).toContain('homepage')
        expect(vm.$el.textContent).toContain('private')
        expect(vm.$el.textContent).toContain('open issues')
        expect(vm.$el.textContent).toContain('watchers')
        expect(vm.$el.textContent).toContain('test id')
        expect(vm.$el.textContent).toContain('test name')
        expect(vm.$el.textContent).toContain('test homepage')
        expect(vm.$el.textContent).toContain('test private')
        expect(vm.$el.textContent).toContain('test open issues')
        expect(vm.$el.textContent).toContain('test watchers')

        done()
      })
      .catch(done)
  })
  */

})
