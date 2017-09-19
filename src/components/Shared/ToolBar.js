import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import classNames from 'classnames'
import style from './ToolBar.css'
import DropDown from './DropDown'

class ToolBar extends React.Component {

  renderFilterButton () {
    const {sort, totalVideo, status, fbPageId=null} = this.context
    const LableValueTable = ['New','Editing','Ready','Published','Deleted']

    return LableValueTable.map( (lable, index) => {
      const params = {
        sort,
        page:1,
        fbPageId,
        status:lable.toUpperCase()
      }
      const _h = `/videos?${querystring.stringify(params)}`      

      const activeStyle = (lable.toUpperCase() === status)? 'active' : null

      return <span key={index} className={classNames(style['filterItem'], style[activeStyle])}> 
                <a href={_h}>
                  {lable  }
                </a>
              </span>
    })
  }

  render() {
    return (
      <div>
        {/* {JSON.stringify(pageIndex)} */}
        <div className={classNames(style['navHeader'], 'pure-menu', 'pure-menu-horizontal')} >
          <DropDown  />

          <ul className={classNames('pure-menu-list')}>
            <li className={classNames('pure-menu-item')}>
              <div className={classNames(style['filterContainer'])}>
                {this.renderFilterButton()}
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ToolBar.contextTypes = {
  pageIndex: PropTypes.array,
  sort: PropTypes.string,
  fbPageId: PropTypes.string,
  page: PropTypes.number,
  totalVideo: PropTypes.number,
  status: PropTypes.string
}

export default ToolBar
