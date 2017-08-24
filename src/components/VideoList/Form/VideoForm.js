import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './VideoForm.css'

import CheckBox from './CheckBox'
import FormTextInput from './FormTextInput'
import S3Uploader from './S3Uploader'

import {dateMDY} from '../../../util/date'

class VideoForm extends React.Component {

  constructor (props) {
    super(props)
    const isCheck = (props.video.status)?
                      (props.video.status === 'READY')? true :false
                    :false

    this.state = {
      changeTitle: false,
      changeDescription: false,
      changeVideo: false,
      changeIsCheck: false,
      newTitle: props.video.newTitle || '',
      isCheck:  isCheck,
      editedSource: props.video.editedSource || '',
      newDescription: props.video.newDescription || ''
    }

    this.updateTitle = this.updateTitle.bind(this)
    this.updateIsCheck = this.updateIsCheck.bind(this)
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
  updateIsCheck (val) {
    // console.log(' ------------- updateIsCheck: ', val)
    this.setState({
      isCheck: val,
      changeIsCheck: true
    })
  }

  payloadHandler () {
    const {changeTitle, changeIsCheck, changeVideo, changeDescription, newTitle, newDescription, editedSource, isCheck} = this.state

    let payload = {}
    if(changeTitle) payload['newTitle'] = newTitle
    if(changeVideo) payload['editedSource'] = editedSource
    if(changeDescription) payload['newDescription'] = newDescription

    if(changeIsCheck) {
      let status = ''
      if(isCheck) status = 'READY'
      else status = 'EDITING'
      
      payload['status'] = status
    }

    return payload
  }
  binClick () {
    const {updateVideoAction, video, turnOnLoading, turnOffLoading, setAlertMessage, deleteVideo} = this.props
    const {_id} = video
    const payload ={status: 'DELETED'}

    turnOnLoading()
    updateVideoAction(_id, payload).then(
      ()=> {
        console.log('update done: ', _id)
        var isAlertSuccess = true;
        var message = 'Video is deleted';
        turnOffLoading()    
        setAlertMessage(message, isAlertSuccess)     
        deleteVideo(_id) 
      }, 
      (err) => {
        turnOffLoading()    
        setAlertMessage(err)   
      }
    )

  }
  onSubmit (e) {
    e.preventDefault()
    const {changeTitle, changeIsCheck, changeVideo, changeDescription,} = this.state    
    const {updateVideoAction, video, turnOnLoading, turnOffLoading, setAlertMessage} = this.props
    const {_id} = video
    
    if(!changeVideo && !changeTitle && !changeDescription && !changeIsCheck){
      return
    }
    else {
      const payload = this.payloadHandler()
      turnOnLoading()

      updateVideoAction(_id, payload).then(
        ()=> {
          // console.log('update done: ', _id)
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
    const {newTitle, newDescription, isCheck} = this.state
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
                  <a onClick={this.binClick} style={{cursor: 'pointer'}}>
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

                <CheckBox 
                  label={'Ready to publish'}
                  onChange={this.updateIsCheck}
                  isCheck={isCheck}
                />
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
  deleteVideo: PropTypes.func.isRequired
}

export default VideoForm
