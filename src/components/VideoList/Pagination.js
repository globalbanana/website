import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './Pagination.css'

import {PAGE_LIMIT} from '../../config/env'

class Pagination extends React.Component {
  render() {
    const {page, sort, totalVideo} = this.context
    const count = Math.ceil(totalVideo/PAGE_LIMIT)

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

Pagination.contextTypes = {
  sort: PropTypes.string,
  page: PropTypes.number,
  totalVideo: PropTypes.number
}

export default Pagination
