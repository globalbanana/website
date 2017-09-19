
import { connect } from 'react-redux'
import VideoList from './../components/VideoList'
import api from '../actions/api'
import {uploadDocumentRequest} from '../actions/fileUpload'
import globalStyle from '../styles/global.css'
import fulfillField from '../util/fulfillField'
import {
  SET_TOTAL_VIDEO, 
  VIDEO_LIST, 
  SET_LIMIT, 
  SET_SKIP, 
  SET_SORT, 
  SET_PAGE,
  SET_STATUS,
  SET_FB_PAGE_ID,
  SET_PAGE_INDEX,
  TURN_ON_LOADING,
  TURN_OFF_LOADING,
  CLEAN_ALERT_MESSAGE,
  SET_ALERT_MESSAGE
} from '../config/actionType'

import {PAGE_LIMIT} from '../config/env'

const mapStateToProps = (state, ownProps) => {
  return {
    videoList: state.dataBase.videoList,
    setting: state.setting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateVideoAction: (id, payload) => {      
      return dispatch(api.updateVideo(id, payload));
    },
    turnOnLoading: () => {
      return dispatch({ type: TURN_ON_LOADING })
    },
    turnOffLoading: () => {
      return dispatch({ type: TURN_OFF_LOADING })
    },
    setAlertMessage: (alertMessage, isAlertSuccess = false) => {
      return dispatch({
        type: SET_ALERT_MESSAGE,
        alertMessage,
        isAlertSuccess
      })
    },
    uploadDocumentRequest: ({ file, name }) => {
      return dispatch(uploadDocumentRequest({ file, name }))      
    },
    clearnAlertMessage: () => {
      return dispatch({ type: CLEAN_ALERT_MESSAGE })
    }
  }
}

const videoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList)

videoList.initState = (store, req, res) => {
  return (dispatch, getState) => {
    console.log('getVideoList ...................... 0')

    const filterALL = _id => (_id==='ALL') ? undefined : _id
    let {page, sort = '-createdAt', status, fbPageId} = req.query
    page = page ? JSON.parse(page) : 1

    const limit = PAGE_LIMIT
    const skip = (PAGE_LIMIT * (page - 1))
    const field = fulfillField({status, fbPageId: filterALL(fbPageId)})
    
    return Promise.all([
      api.getVideoCount(field),
      api.getVideoList({limit, skip, sort, field}),
      api.getPageList({limit:1000})
    ]).then(
      (result) => {
        const {count} = result[0]
        const list = result[1]
        const pageIndex = result[2].map( pageItem => {
          const {fbPageId, fbName, videoCount} = pageItem
          return {fbPageId, fbName, videoCount}
        })        
        
        dispatch({type: SET_PAGE_INDEX, pageIndex})
        dispatch({type: VIDEO_LIST, list})
        dispatch({type: SET_LIMIT, limit})
        dispatch({type: SET_SKIP, skip})
        dispatch({type: SET_SORT, sort})
        dispatch({type: SET_PAGE, page})
        dispatch({type: SET_STATUS, status})
        dispatch({type: SET_FB_PAGE_ID, fbPageId})
        dispatch({type: SET_TOTAL_VIDEO, totalVideo: count})
        return Promise.resolve()
      }
    )
  }
}


export default videoList