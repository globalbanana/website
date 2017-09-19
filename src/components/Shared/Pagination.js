import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import classNames from 'classnames'
import style from './Pagination.css'

import {PAGE_LIMIT} from '../../config/env'

const INTERVAL = 10

class Pagination extends React.Component {
  getMin(currentPage, MAX_PAGE){
    return (currentPage > INTERVAL) 
            ? currentPage - INTERVAL
            : 1
  }

  getMax(currentPage, MAX_PAGE){
    return ( (MAX_PAGE - currentPage) > INTERVAL) 
            ? currentPage + INTERVAL
            : MAX_PAGE
  }
    
  renderPage(MAX_PAGE){
    const {page, sort, status, fbPageId=null} = this.context    
    let returnData = []
    
    for (let i = this.getMin(page, MAX_PAGE); i < this.getMax(page, MAX_PAGE); i++) {
      const params = {
        sort,
        page: i,
        fbPageId,
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
  fbPageId: PropTypes.string,
  page: PropTypes.number,
  totalVideo: PropTypes.number
}

export default Pagination
