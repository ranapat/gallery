import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from '@/config'
import actions from '@/store/actions'

const mock = new MockAdapter(axios)

const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0

  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(mutation.type).toEqual(type)
      if (payload) {
        expect(mutation.payload).toEqual(payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  const dispatch = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(mutation.mode).toEqual('dispatch')
      expect(mutation.type).toEqual(type)
      if (payload) {
        expect(mutation.payload).toEqual(payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  action({ commit, dispatch, state }, payload)

  if (expectedMutations.length === 0) {
    expect(count).toEqual(0)
    done()
  }
}

describe('actions', () => {
  it('load data with success', done => {
    const data = {
      data: {
        count: 1,
        items: [
          { self: 'self', data: { title: 'title' } }
        ],
        next: 'next'
      }
    }
    mock.onGet(api.data).replyOnce(200, data)

    testAction(actions.loadData, null, {}, [
      { type: 'START_LOADING_DATA', payload: undefined },
      { type: 'POPULATE_DATA', payload: [] },
      { type: 'SET_DATA_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading data...' },
      { type: 'POPULATE_DATA', payload: data },
      { type: 'STOP_LOADING_DATA', payload: undefined },
      { type: 'SET_STATUS', payload: 'data loaded...' }
    ], done)
  })

  it('load repositories with error', done => {
    mock.onGet(api.data).replyOnce(404, {})

    testAction(actions.loadData, null, {}, [
      { type: 'START_LOADING_DATA', payload: undefined },
      { type: 'POPULATE_DATA', payload: [] },
      { type: 'SET_DATA_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading data...' },
      { type: 'STOP_LOADING_DATA', payload: undefined },
      { type: 'SET_DATA_LOAD_ERROR', payload: new Error('Request failed with status code 404') },
      { type: 'SET_STATUS', payload: 'data error...' }
    ], done)
  })

  it('load data from default url', done => {
    const data = {
      data: {
        count: 1,
        items: [
          { self: 'self', data: { title: 'title' } }
        ],
        next: 'next'
      }
    }
    mock.onGet(api.data).replyOnce(200, data)

    testAction(actions.loadData, null, {}, [
      { type: 'START_LOADING_DATA', payload: undefined },
      { type: 'POPULATE_DATA', payload: [] },
      { type: 'SET_DATA_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading data...' },
      { type: 'POPULATE_DATA', payload: data },
      { type: 'STOP_LOADING_DATA', payload: undefined },
      { type: 'SET_STATUS', payload: 'data loaded...' }
    ], done)
  })

  it('load data from specific url', done => {
    const data1 = {
      data: {
        count: 1,
        items: [
          { self: 'self', data: { title: 'title' } }
        ],
        next: 'next'
      }
    }
    const data2 = {
      data: {
        count: 2,
        items: [
          { self: 'self', data: { title: 'title' } },
          { self: 'self', data: { title: 'title' } }
        ],
        next: 'next'
      }
    }
    mock.onGet(api.data).replyOnce(200, data1)
    mock.onGet('specific').replyOnce(200, data2)

    testAction(actions.loadData, 'specific', {}, [
      { type: 'START_LOADING_DATA', payload: undefined },
      { type: 'POPULATE_DATA', payload: [] },
      { type: 'SET_DATA_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading data...' },
      { type: 'POPULATE_DATA', payload: data2 },
      { type: 'STOP_LOADING_DATA', payload: undefined },
      { type: 'SET_STATUS', payload: 'data loaded...' }
    ], done)
  })

  it('open sidebar', done => {
    testAction(actions.openSidebar, null, {}, [
      { type: 'OPEN_SIDEBAR', payload: null }
    ], done)
  })

  it('close sidebar', done => {
    testAction(actions.closeSidebar, null, {}, [
      { type: 'CLOSE_SIDEBAR', payload: null }
    ], done)
  })

  it('set view', done => {
    testAction(actions.setView, 'list', {}, [
      { type: 'SET_VIEW', payload: 'list' }
    ], done)
  })

  it('set filter to all', done => {
    testAction(actions.setFilter, 'all', {}, [
      { type: 'SET_FILTER', payload: 'all' },
      { type: 'SET_STATUS', payload: 'setting filter to all' },
      { mode: 'dispatch', type: 'loadData', payload: undefined }
    ], done)
  })

  it('set filter to favorites', done => {
    testAction(actions.setFilter, 'favorites', {}, [
      { type: 'SET_FILTER', payload: 'favorites' },
      { type: 'SET_STATUS', payload: 'setting filter to favorites' },
      { type: 'START_LOADING_DATA', payload: undefined },
      { type: 'POPULATE_DATA', payload: [] },
      { type: 'SET_DATA_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading remote favorites...' }
    ], done)
  })

  it('load local favorites', done => {
    testAction(actions.loadLocalFavorites, null, {}, [
      { type: 'SET_STATUS', payload: 'loading local favorites...' },
      { type: 'LOAD_LOCAL_FAVORITES', payload: undefined }
    ], done)
  })

  it('add to favorites', done => {
    testAction(actions.addToFavorites, 'something', {}, [
      { type: 'ADD_TO_FAVORITES', payload: 'something' }
    ], done)
  })

  it('remove from favorites', done => {
    testAction(actions.removeFromFavorites, 'something', {}, [
      { type: 'REMOVE_FROM_FAVORITES', payload: 'something' }
    ], done)
  })
})
