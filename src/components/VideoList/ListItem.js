import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './ListItem.css'

class ListItem extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render() {
    const {s3Source, description} = this.props
    return (
      <div className={classNames(style['row'])}>
        <h1 className={classNames(style['content-subhead'])}> {description} </h1>
        <section>
          <header> 
            <h2> {description} </h2>
          </header>

          <div>
            <video className={classNames(style['videoStyle'])} controls autoPlay="" loop="" muted="" data-reactid=".0.1.0.0">
              <source src={s3Source} type="video/mp4" />
            </video>
          </div>
        </section>
      </div>
    )
  }
}


ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  s3Source: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ListItem
