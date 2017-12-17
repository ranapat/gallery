import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

//import Languages from '@/components/Languages'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

Vue.use(Vuex)
Vue.use(BootstrapVue)

const mockStore = () => {
  const state = {
    repositories: [],
    repositoriesLoading: false,
    repositoriesLoadError: null,

    languages: [],
    languagesLoading: false,
    languagesLoadError: null
  }

  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
}

describe('Languages', () => {

  /*
  it('has a created hook', () => {
    expect(typeof Languages.mounted).toBe('undefined')
  })

  it('renders the correct message and state in initialization', () => {
    const store = mockStore()
    expect(store.state.languagesLoading).toBe(false)

    const vm = new Vue({
      render: h => h(Languages),
      store,
    }).$mount()
    expect(store.state.languagesLoading).toBe(false)
    expect(vm.$el.textContent).toContain('No languages specified')
  })

  it('renders the correct message and state in loading', done => {
    const store = mockStore()
    expect(store.state.languagesLoading).toBe(false)

    const vm = new Vue({
      render: h => h(Languages),
      store,
    }).$mount()
    expect(store.state.languagesLoading).toBe(false)

    store.state.languagesLoading = true

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Languages loading...')
        done()
      })
      .catch(done)
  })

  it('renders the correct message and state in error', done => {
    const store = mockStore()

    const vm = new Vue({
      render: h => h(Languages),
      store,
    }).$mount()

    store.state.languagesLoading = false
    store.state.languagesLoadError = {
      response: {
        data: {
          message: 'error message'
        }
      }
    }

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Languages loading error : error message')
        done()
      })
      .catch(done)
  })

  it('renders the correct message and state in data', done => {
    const store = mockStore()

    const vm = new Vue({
      render: h => h(Languages),
      store,
    }).$mount()

    store.state.languagesLoading = false
    store.state.repositories = []
    store.state.languages = {
      'c': '123', 'd': '456'
    }

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.textContent).toContain('Name')
        expect(vm.$el.textContent).toContain('Lines Of Code')
        expect(vm.$el.textContent).toContain('c')
        expect(vm.$el.textContent).toContain('d')
        expect(vm.$el.textContent).toContain('123')
        expect(vm.$el.textContent).toContain('456')
        done()
      })
      .catch(done)
  })
  */

})
