import { createStore, combineReducers } from 'redux'
import reducer from '../../src/reducers'

import {
    SET_LIMIT, SET_SKIP, SET_SORT 
} from '../../src/config/actionType'

let store = createStore(combineReducers({reducer}), {})

describe('setting reducer', () => {
  it('SET_LIMIT', (done) => {
    const _limit = 1;
    store.dispatch({
        type: SET_LIMIT,
        limit: _limit
    });    
    expect(store.getState().reducer.setting.limit).toBe(_limit)
    done()
  })

  it('SET_SKIP', (done) => {
    const _skip = 1;
    store.dispatch({
        type: SET_SKIP,
        skip: _skip
    });    
    expect(store.getState().reducer.setting.skip).toBe(_skip)
    done()
  })

  it('SET_SORT', (done) => {
    const _sort = 1;
    store.dispatch({
        type: SET_SORT,
        sort: _sort
    });    
    expect(store.getState().reducer.setting.sort).toBe(_sort)
    done()
  })
})