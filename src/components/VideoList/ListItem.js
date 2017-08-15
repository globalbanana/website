import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './ListItem.css'

import VideoForm from'./VideoForm'

class ListItem extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render() {
    const {s3Source, description, originThumb, fbPageName, fbPageId, title} = this.props
    const pageLink = `https://facebook.com/${fbPageId}`

    return (
      <div className={classNames(style['row'])}>
        <h1 className={classNames(style['content-subhead'])}> {description} </h1>
        <section>
          <div className="pure-g">
              <div className="pure-u-1-2">
                  <header> 
                    <h2 className={classNames(style['h2Description'])}> 
                      {title} 
                    </h2>

                    <a className={classNames(style['pageButton'] ,"pure-button" )}
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
              <div className="pure-u-1-2">
                  <VideoForm />
              </div>
          </div>
        </section>
      </div>
    )
  }
}


ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  s3Source: PropTypes.string.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
}

export default ListItem
