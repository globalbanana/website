import { combineReducers } from 'redux'
import dataBase from './dataBase'
import setting from './setting'

const reducer = combineReducers({
  dataBase,
  setting
})

export default reducer
