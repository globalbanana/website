import { SET_LIMIT, SET_SKIP, SET_SORT, SET_PAGE } from '../config/actionType'

const setting = (state = {}, action) => {
  switch (action.type) {
    case SET_LIMIT:
      return {
        ...state,
        limit: action.limit
      }
    case SET_SKIP:
      return {
        ...state,
        skip: action.skip
      }
    case SET_SORT:
        return {
        ...state,
        sort: action.sort
        }
    case SET_PAGE:
        return {
        ...state,
        page: action.page
        }
    default:
      return state
  }
}

export default setting
