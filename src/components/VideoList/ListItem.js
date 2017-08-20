import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './ListItem.css'
import VideoForm from './VideoForm'

class ListItem extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render() {
    const {video} = this.props
    const {s3Source, description, originThumb, fbPageName, fbPageId, title, fbId, createdAt} = video
    const pageLink = `https://facebook.com/${fbId}`

    return (
            <div className={classNames(style['padding20px'])}>
              <header>
                <h2 className={classNames(style['h2Description'])}>
                  {title}
                </h2>

                <a className={classNames(style['pageButton'], 'pure-button')}
                  href = {pageLink}>
                  {fbPageName}
                </a>

              </header>

              <div>
                <video className={classNames(style['videoStyle'])} controls poster={originThumb} preload="none" autoPlay="" loop="" muted="" data-reactid=".0.1.0.0">
                  <source src={s3Source} type="video/mp4" />
                </video>
              </div>
            </div>
    )
  }
}


ListItem.propTypes = {
  video: PropTypes.object.isRequired,
}

export default ListItem
