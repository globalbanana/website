


import { createStore, combineReducers } from 'redux'
import reducer from '../../src/reducers'

import {
  VIDEO_LIST, VIDEO_DETAIL
} from '../../src/config/actionType'

let store = createStore(combineReducers({reducer}), {})

describe('dataBase reducer', () => {
  it('VIDEO_LIST', (done) => {
    const _json = [{a: 'a'}];

    store.dispatch({
        type: VIDEO_LIST,
        list: _json
    });    
    expect(store.getState().reducer.dataBase.videoList).toBe(_json)
    done()
  })

  it('VIDEO_DETAIL', (done) => {
    const _json = [{a: 'a'}];

    store.dispatch({
        type: VIDEO_DETAIL,
        detail: _json
    });    
    expect(store.getState().reducer.dataBase.videoDetail).toBe(_json)
    done()
  })
})