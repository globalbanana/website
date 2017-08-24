import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './index.css'
import ToolBar from './ToolBar'
import ListItem from './ListItem'
import Pagination from './Pagination'
import VideoForm from './Form/VideoForm'
import Loading from '../Shared/Loading'
import AlertBox from '../Shared/AlertBox'

import {PAGE_LIMIT} from '../../config/env'
// import style from './index.css'

class VideoList extends React.Component {

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
    const {page, sort, totalVideo, isLoading, alertMessage, isAlertSuccess} = setting
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

            <div className="sidebar pure-u-1 pure-u-md-1-4">
              <div className="header">
                <h1 className="brand-title">A Sample Blog</h1>
                <h2 className="brand-tagline">Creating a blog layout using Pure</h2>
              </div>
            </div>


            <div className="pure-u-1 pure-u-md-1" style={textAlignStyle} >
              <Pagination sort={sort} page={page} totalVideo={totalVideo}/>
            </div>

            <div className="pure-u-1 pure-u-md-1">
              <ToolBar />
            </div>

            <div className="pure-u-1 pure-u-md-1">
              {
                videoList.map((video, index) => {
                  if(video){
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
              <Pagination sort={sort} page={page} totalVideo={totalVideo}/>
            </div>
          </div>
      </div>
    )
  }
}



VideoList.propTypes = {
  updateVideoAction: PropTypes.func.isRequired,
  uploadDocumentRequest: PropTypes.func.isRequired,
  turnOnLoading: PropTypes.func.isRequired,
  turnOffLoading: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
  clearnAlertMessage: PropTypes.func.isRequired,
  isAlertSuccess: PropTypes.bool,
  alertMessage: PropTypes.string
  // videoList: PropTypes.object.isRequired,
//   products: PropTypes.array.isRequired
}

export default VideoList
