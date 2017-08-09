import { combineReducers } from 'redux'
import hello from './hello'
import jsonAPI from './jsonAPI'
import dataBase from './dataBase'

const reducer = combineReducers({
  dataBase,
  jsonAPI,
  hello
})

export default reducer
