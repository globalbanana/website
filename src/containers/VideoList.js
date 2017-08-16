
import { connect } from 'react-redux'
import VideoList from './../components/VideoList'
import api from '../actions/api'
import globalStyle from '../styles/global.css'
import {SET_TOTAL_VIDEO, VIDEO_LIST, SET_LIMIT, SET_SKIP, SET_SORT, SET_PAGE} from '../config/actionType'

const mapStateToProps = (state, ownProps) => {
  return {
    videoList: state.dataBase.videoList,
    setting: state.setting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // onClick: () => {
    //   dispatch(helloActionCreator.helloWorld());
    // }
  }
}

const videoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList)

videoList.initState = (store, req, res) => {
  return (dispatch, getState) => {
    console.log('getVideoList ...................... 0')

    let {page, sort = '-createdAt'} = req.query

    page = page ? JSON.parse(page) : 1

    const PAGE_LIMIT = 10
    const limit = PAGE_LIMIT * page
    const skip = PAGE_LIMIT * (page - 1)

    return Promise.all([
      api.getVideoCount(),
      api.getVideoList({limit, skip, sort})
    ]).then(
      (result) => {
        const {count} = result[0]
        const list = result[1]
        dispatch({type: VIDEO_LIST, list})
        dispatch({type: SET_LIMIT, limit})
        dispatch({type: SET_SKIP, skip})
        dispatch({type: SET_SORT, sort})
        dispatch({type: SET_PAGE, page})
        dispatch({type: SET_TOTAL_VIDEO, totalVideo: count})
        return Promise.resolve()
      }
    )
  }
}


export default videoList