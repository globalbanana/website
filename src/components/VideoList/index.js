import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './index.css'
import ToolBar from '../Shared/ToolBar'
import ListItem from './ListItem'
import Pagination from '../Shared/Pagination'
import VideoForm from './Form/VideoForm'
import Loading from '../Shared/Loading'
import AlertBox from '../Shared/AlertBox'
import NavBar from '../Shared/NavBar'

import {PAGE_LIMIT} from '../../config/env'
// import style from './index.css'

class VideoList extends React.Component {

  constructor (props) {
    super(props)
    
    this.state = {
      deletedVideoIds: []
    }

    this.deleteVideo = this.deleteVideo.bind(this)
  }

  getChildContext(){
    const {
            page = '1',
            sort = '-createdAt',
            totalVideo,
            status = 'NEW',
            fbPageId = 'ALL',
            pageIndex = []
          } = this.props.setting

    return {
      pageIndex,
      page: JSON.parse(page),
      sort, 
      totalVideo, 
      fbPageId,
      status
    }
  }

  deleteVideo (id) {
    const _arr = this.state.deletedVideoIds.slice()
    _arr.push(id)
    
    this.setState({
      ...this.state,
      deletedVideoIds:_arr
    })
  }
  
  render() {
    const {
        videoList,
        updateVideoAction,
        turnOnLoading,
        turnOffLoading,
        setting,
        setAlertMessage,
        clearnAlertMessage,
        uploadDocumentRequest
      } = this.props
    const {page, sort, totalVideo, isLoading, alertMessage, isAlertSuccess, pageIndex} = setting
    const textAlignStyle = {textAlign: 'center'}

    const loadingControl = (isLoading) ? 'loading-overlay' : ''

    return (
      <div className={loadingControl}>
        <AlertBox
          alertMessage={alertMessage}
          clearnAlertMessage={clearnAlertMessage}
          isAlertSuccess={isAlertSuccess} />

        <Loading isLoading={isLoading} />
        <div className={`pure-g`}>

            <NavBar 
              pathName={this.props.location.pathname}
            />

            <div className="pure-u-1 pure-u-md-1">
              <ToolBar />
            </div>

            <div className="pure-u-1 pure-u-md-1" style={textAlignStyle} >
              <Pagination/>
            </div>

            <div className="pure-u-1 pure-u-md-1">
              {
                videoList.map((video, index) => {
                  const isVideoDelete = (this.state.deletedVideoIds.indexOf(video._id) === -1)?false:true

                  if(video && !isVideoDelete){
                    return (
                      <div className={classNames(style['row'])} key={index}>
                        <h1 className={classNames(style['content-subhead'])}> {video.description} </h1>
                        <div className="pure-g">
                            <div className="pure-u-1-2">
                              <ListItem
                                video={video}
                              />
                            </div>
                            <div className="pure-u-1-2">
                              <VideoForm 
                                video = {video}
                                updateVideoAction = {updateVideoAction}
                                uploadDocumentRequest= {uploadDocumentRequest}
                                turnOnLoading={turnOnLoading}
                                turnOffLoading={turnOffLoading}
                                setAlertMessage={setAlertMessage}
                                deleteVideo={this.deleteVideo}
                              />
                            </div>
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>

            <div className="pure-u-1 pure-u-md-1" style={textAlignStyle}>
              <Pagination/>
            </div>
          </div>
      </div>
    )
  }
}


VideoList.childContextTypes = {
  pageIndex: PropTypes.array,
  sort: PropTypes.string,
  status: PropTypes.string,
  page: PropTypes.number,
  fbPageId: PropTypes.string,
  totalVideo: PropTypes.number
}

VideoList.propTypes = {
  updateVideoAction: PropTypes.func.isRequired,
  uploadDocumentRequest: PropTypes.func.isRequired,
  turnOnLoading: PropTypes.func.isRequired,
  turnOffLoading: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
  clearnAlertMessage: PropTypes.func.isRequired,
  isAlertSuccess: PropTypes.bool,
  alertMessage: PropTypes.string,
  videoList: PropTypes.object.isRequired,
//   products: PropTypes.array.isRequired
}

export default VideoList
