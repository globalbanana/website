import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './VideoForm.css'

import FormTextInput from './FormTextInput'
import S3Uploader from './S3Uploader'

import {dateMDY} from '../../util/date'

class VideoForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      changeTitle: false,
      changeDescription: false,
      changeVideo: false,
      newTitle: props.video.newTitle || '',
      editedSource: props.video.editedSource || '',
      newDescription: props.video.newDescription || ''
    }

    this.updateTitle = this.updateTitle.bind(this)
    this.updateVideo = this.updateVideo.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.binClick = this.binClick.bind(this)
  }

  updateVideo (val) {
    // console.log(' ------------- updateVideo: ', val)
    this.setState({
      editedSource: val,
      changeVideo: true
    })
  }
  updateTitle (val) {
    // console.log(' ------------- updateTitle: ', val)
    this.setState({
      newTitle: val,
      changeTitle: true
    })
  }
  updateDescription (val) {
    // console.log(' ------------- updateDescription: ', val)
    this.setState({
      newDescription: val,
      changeDescription: true
    })
  }

  binClick () {
    console.log(' -------- bin click')
  }
  onSubmit (e) {
    e.preventDefault()
    
    const {updateVideoAction, video, turnOnLoading, turnOffLoading, setAlertMessage} = this.props
    const {changeTitle, changeVideo, changeDescription, newTitle, newDescription, editedSource} = this.state
    const {_id} = video
    
    if(!changeVideo && !changeTitle && !changeDescription){
      return
    }
    else {

      let payload = {}
      if(changeTitle) payload['newTitle'] = newTitle
      if(changeVideo) payload['editedSource'] = editedSource
      if(changeDescription) payload['newDescription'] = newDescription

      turnOnLoading()

      updateVideoAction(_id, payload).then(
        ()=> {
          console.log('update done: ', _id)
          var isAlertSuccess = true;
          var message = 'Video is updated';
          turnOffLoading()    
          setAlertMessage(message, isAlertSuccess)      
        }, 
        (err) => {
          turnOffLoading()    
          setAlertMessage(err)   
        }
      )
    }

  }
  
  render () {
    const {newTitle, newDescription} = this.state
    const {video, turnOnLoading, turnOffLoading, setAlertMessage, uploadDocumentRequest} = this.props
    
    const {createdAt, _id} = video
    const dateFormated = dateMDY(createdAt)
        
    return (
          <div className={classNames(style['margin20px'])}>

              <form onSubmit={this.onSubmit} className={classNames(style['videoForm'], 'pure-form pure-form-aligned')}>
              
              <div className={classNames(style['formTop'])}>
                <span className={classNames(style['createAtStyle'])} >
                  CreatedAt: {dateFormated}
                </span>
                <span className={classNames(style['inlineStyle'])} >
                  <a href='#' onClick={this.binClick}>
                    <img src="/bin.png" alt="Bin"  className={classNames(style['bin'])}/>
                  </a>
                </span>
              </div>
              
              <fieldset>
                <FormTextInput 
                  label={'New Title'} 
                  value={newTitle}
                  onChange={this.updateTitle}
                />

                <FormTextInput 
                  label={'New Description'} 
                  value={newDescription}
                  onChange={this.updateDescription}
                />

                <S3Uploader
                  uploadDocumentRequest={uploadDocumentRequest}
                  videoId = {_id}
                  dateFormated = {dateFormated}
                  turnOnLoading = {turnOnLoading}
                  turnOffLoading = {turnOffLoading}
                  setAlertMessage ={setAlertMessage}
                  onChange={this.updateVideo}
                />
                <div className="pure-controls">
                  <label htmlFor="cb" className="pure-checkbox">
                    <input id="cb" type="checkbox" /> Ready to publish
                  </label>
                </div>
              </fieldset>
              <input type='submit' value='Save' className={classNames(style['videoFormButton'], 'pure-button')}/>
            </form>
          </div>
    )
  }
}

VideoForm.propTypes = {
  updateVideoAction: PropTypes.func.isRequired,  
  uploadDocumentRequest: PropTypes.func.isRequired,
  turnOnLoading: PropTypes.func.isRequired,
  turnOffLoading: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
}

export default VideoForm
