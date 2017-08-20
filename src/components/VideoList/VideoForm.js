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
      newTitle: props.video.newTitle || '',
      newDescription: props.video.newDescription || ''
    }

    this.updateTitle = this.updateTitle.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit (e) {
    e.preventDefault()
    
    const {updateVideo, video, turnOnLoading, turnOffLoading, setAlertMessage} = this.props
    const {changeTitle, changeDescription, newTitle, newDescription} = this.state
    const {_id} = video

    if(!changeTitle && !changeDescription){
      return
    }
    else {
      let payload = {}
      if(changeTitle) payload['newTitle'] = newTitle
      if(changeDescription) payload['newDescription'] = newDescription

      turnOnLoading()

      updateVideo(_id, payload).then(
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
    const {newTitle, newDescription, id} = this.state
    const {video, setAlertMessage} = this.props
    
    const {createdAt} = video
    
    return (
          <div className={classNames(style['margin20px'])}>

              <form onSubmit={this.onSubmit} className={classNames(style['videoForm'], 'pure-form pure-form-aligned')}>
              
              <div className={classNames(style['formTop'])}>
                <span className={classNames(style['createAtStyle'])} >
                  CreatedAt: {dateMDY(createdAt)}
                </span>
                <span className={classNames(style['inlineStyle'])} >
                  <img src="/bin.png" alt="Bin"  className={classNames(style['bin'])}/>
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
  updateVideo: PropTypes.func.isRequired,  
  turnOnLoading: PropTypes.func.isRequired,
  turnOffLoading: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
}

export default VideoForm
