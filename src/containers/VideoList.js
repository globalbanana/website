
import { connect } from 'react-redux'
import VideoList from './../components/VideoList'
import api from '../actions/api'
import globalStyle from '../styles/global.css'
import {VIDEO_LIST} from '../config/actionType'

const mapStateToProps = (state, ownProps) => {
  return {
    videoList: state.dataBase.videoList
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
      console.log('getVideoList ......................')

      const {page, sort} = req.query

      const PAGE_LIMIT = 10
      const limit = PAGE_LIMIT * page
      const skip = PAGE_LIMIT * (page-1)
      const _sort = sort || '-createdAt'

      return api.getVideoList({limit, skip, _sort}).then(
        (list) => {
          dispatch({type: VIDEO_LIST, list})
          return Promise.resolve()
        }
      )
  }
}


export default videoList

// import { connect } from 'react-redux'
// import VideoList from './../components/VideoList'
// import dataBaseActionCreator from '../actions/dataBase'
// import globalStyle from '../styles/global.css'

// const mapStateToProps = (state, ownProps) => {
//   console.log('state: ', state)
//   return {
//     videoList: state.dataBase
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onclick: function() {
//       console.log('click')
//     }
//   }
// }

// const videoList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(VideoList)

// videoList.initState = (store, req, res) => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       console.log('getVideoList ......................')
//       const limit = 20
//       const skip = 0
//       return dispatch(dataBaseActionCreator.getVideoList({limit, skip}))
//       resolve()
//     })
//   }
// }


// export default videoList