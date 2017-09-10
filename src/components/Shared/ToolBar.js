import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import classNames from 'classnames'
import style from './ToolBar.css'

class ToolBar extends React.Component {

  renderFilterButton () {
    const {sort, totalVideo, status} = this.context
    const LableValueTable = ['New','Editing','Ready','Published','Deleted']

    return LableValueTable.map( (lable, index) => {
      const params = {
        sort,
        page:1,
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
        <div className={classNames(style['navHeader'], 'pure-menu', 'pure-menu-horizontal')} >
          <ul className={classNames('pure-menu-list')}>
            <li className={classNames('pure-menu-item')}>
              <div className={classNames(style['filterContainer'])}>
                {this.renderFilterButton()}
              </div>
            </li>

            {/* <li className={classNames('pure-menu-item')}>
              <a href="/dashboard/create" className={classNames('pure-menu-link')}>Create</a>
            </li>
            <li className={classNames('pure-menu-item')}>
              <a href="/dashboard/contact" className={classNames('pure-menu-link')}>About</a>
            </li>
            <li className={classNames('pure-menu-item')}>
              <DropDown />
            </li> */}

          </ul>
        </div>
      </div>
    )
  }
}

ToolBar.contextTypes = {
  sort: PropTypes.string,
  page: PropTypes.number,
  totalVideo: PropTypes.number,
  status: PropTypes.string
}

export default ToolBar
