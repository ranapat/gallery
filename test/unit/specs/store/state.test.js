import state from '@/store/state'
import * as config from '@/config'

describe('store.state', () => {

  it('check initial values', () => {
    expect(state.data).toEqual(null)
    expect(state.dataLoading).toEqual(false)
    expect(state.dataLoadError).toEqual(null)
    expect(state.sidebarOpened).toEqual(true)
    expect(state.view).toEqual(config.view.list.key)
    expect(state.filter).toEqual(config.filter.all.key)
    expect(state.status).toEqual('')
    expect(state.favorites).toEqual([])
  })

})
