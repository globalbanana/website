import React from 'react'
import PropTypes from 'prop-types'

// import classNames from 'classnames'
// import style from './S3Uploader.css'

class S3Uploader extends React.Component {

  constructor (props) {
    super(props)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  handleFileUpload( event ) {
    const removeStash = (str) => str.replace(new RegExp('/', 'g'), '')
    
    const files = event.target.files;
    const file = files[0]

    const {videoId, dateFormated, turnOnLoading, turnOffLoading, setAlertMessage} = this.props
    const name = removeStash(`${videoId}_${dateFormated}`)

    turnOnLoading()
    this.props.uploadDocumentRequest({
      file,
      name: name
    }).then(res => {
        const isAlertSuccess = true
        turnOffLoading()    
        setAlertMessage(res.success, isAlertSuccess)      
    })
  }

  render() {
    return (
      <div className="pure-control-group">
            <input type="file" onChange={this.handleFileUpload} />
      </div>
    )
  }
}

S3Uploader.propTypes = {
  uploadDocumentRequest: PropTypes.func.isRequired
}

export default S3Uploader
