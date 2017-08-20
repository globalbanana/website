import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './Pagination.css'

import {PAGE_LIMIT} from '../../config/env'

class Pagination extends React.Component {
  render() {
    const {page, sort, totalVideo} = this.props
    const count = Math.ceil(totalVideo/PAGE_LIMIT) +1

    const renderPage = (count, page) => {
      let returnData = []

      for (let i = 1; i < count; i++) {
        const url = `/videos?sort=${sort}&page=${i}`
        if (i === page) {
          returnData.push(<a href={url} key={i} className={classNames(style['active'])}>{i}</a>)
        } else {
          returnData.push(<a href={url} key={i}>{i}</a>)
        }
      }

      return returnData
    }


    return (
      <div className={classNames(style['pagination'])}>
        {(page !== (1) )?
          <a href={`/videos?sort=${sort}&page=${page - 1}`}> &laquo; </a>
          :null}

        {renderPage(count, page)}
        
        {(page !== (count-1) )
          ?<a href={`/videos?sort=${sort}&page=${page + 1}`}> &raquo; </a> 
          : null}
      </div>
    )
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  totalVideo: PropTypes.object
}

export default Pagination
