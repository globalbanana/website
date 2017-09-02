import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import classNames from 'classnames'
import style from './Pagination.css'

import {PAGE_LIMIT} from '../../config/env'

class Pagination extends React.Component {
  renderPage(count){
    const {page, sort, status} = this.context    
    let returnData = []
    
    for (let i = 1; i < count; i++) {
      const params = {
        sort,
        page: i,
        status
      }
      const _h = `/videos?${querystring.stringify(params)}`      

      if (i === page) {
        returnData.push(<a href={_h} key={i} className={classNames(style['active'])}>{i}</a>)
      } else {
        returnData.push(<a href={_h} key={i}>{i}</a>)
      }
    }

    return returnData
  }

  render() {
    const {page, sort, totalVideo, field} = this.context
    const count = Math.ceil(totalVideo/PAGE_LIMIT)

    return (
      <div className={classNames(style['pagination'])}>
        {(page !== (1) )?
          <a href={`/videos?sort=${sort}&page=${page - 1}`}> &laquo; </a>
          :null}

        {this.renderPage(count)}
        
        {(page !== (count-1) )
          ?<a href={`/videos?sort=${sort}&page=${page + 1}`}> &raquo; </a> 
          : null}
      </div>
    )
  }
}

Pagination.contextTypes = {
  sort: PropTypes.string,
  status: PropTypes.string,
  page: PropTypes.number,
  totalVideo: PropTypes.number
}

export default Pagination
