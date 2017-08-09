import { VIDEO_LIST, VIDEO_DETAIL } from '../config/actionType'

const dataBase = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_LIST:
      return {
        ...state,
        videoList: action.list
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
