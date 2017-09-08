import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './ListItem.css'
import {getFormattedTimeInfo} from '../../util/date'

class ListItem extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render() {
    const {video} = this.props
    const {s3Source, editedSource, description, originThumb, fbPageName, fbPageId, title, fbId, createdAt, likeCount, commentCount, originCreatedAt} = video
    const pageLink = `https://facebook.com/${fbId}`
    
    const renderEditedButton = () => {
      if(editedSource) {
        return (<a className={classNames(style['editedVideoButton'], 'pure-button')}
                  href = {editedSource}
                  target="_blank">
                  Edited Video
                </a>)
      }  
    }

    return (
            <div className={classNames(style['padding20px'])}>
              <header>
                <h2 className={classNames(style['h2Description'])}>
                  {title}
                </h2>

                <a className={classNames(style['pageButton'], 'pure-button')}
                  href = {pageLink}
                  target="_blank">
                  {fbPageName}
                </a>

                {
                  (likeCount)?
                    <div className={classNames(style['fbInfor'])}>
                      {'Like ' +likeCount}
                    </div>:
                    null
                }

                {
                  (commentCount)?
                    <div className={classNames(style['fbInfor'])}>
                      {'Comment ' +commentCount}
                    </div>:
                    null
                }

                {
                  (originCreatedAt)?
                    <div className={classNames(style['fbInfor'])}>
                        {'CreatedAt ' +getFormattedTimeInfo(new Date(originCreatedAt))}
                    </div>:
                    null
                }
              </header>

              <div>
                <video className={classNames(style['videoStyle'])} controls poster={originThumb} preload="none" autoPlay="" loop="" muted="" data-reactid=".0.1.0.0">
                  <source src={s3Source} type="video/mp4" />                  
                </video>
              </div>

              {renderEditedButton()}

            </div>
    )
  }
}


ListItem.propTypes = {
  video: PropTypes.object.isRequired,
}

export default ListItem
