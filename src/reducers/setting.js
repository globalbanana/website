import { 
  SET_LIMIT,
   SET_SKIP,
   SET_SORT,
   SET_PAGE,
   SET_FEQ,
   SET_STATUS,
   SET_FIELD,
   SET_FB_PAGE_ID,
   SET_TOTAL_VIDEO,
   SET_PAGE_INDEX,
   TURN_OFF_LOADING,
   TURN_ON_LOADING,
   SET_ALERT_MESSAGE,
   CLEAN_ALERT_MESSAGE
} from '../config/actionType'

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
    case SET_TOTAL_VIDEO:
      return {
        ...state,
        totalVideo: action.totalVideo
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SET_FEQ:
      return {
        ...state,
        feq: action.feq
      }
    case SET_FIELD:
      return {
        ...state,
        field: action.field
      }
    case SET_FB_PAGE_ID:
      return {
        ...state,
        fbPageId: action.fbPageId
      }
    case TURN_ON_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case TURN_OFF_LOADING:
      return {
        ...state,
        isLoading: false
      }
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
        isAlertSuccess: action.isAlertSuccess
      }
    case CLEAN_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: null
      }
    case SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.pageIndex
      }
    default:
      return state
  }
}

export default setting
