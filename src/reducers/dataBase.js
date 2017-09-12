import { VIDEO_LIST, VIDEO_DETAIL, SET_PAGE_LIST } from '../config/actionType'

const dataBase = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_LIST:
      return {
        ...state,
        videoList: action.list
      }
    case SET_PAGE_LIST:
      return {
        ...state,
        pageList: action.list
      }
    case VIDEO_DETAIL:
      return {
        ...state,
        videoDetail: action.detail
      }
    default:
      return state
  }
}

export default dataBase
