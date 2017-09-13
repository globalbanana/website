import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import classNames from 'classnames'
import style from './ToolBar.css'

class ToolBarPage extends React.Component {

  renderFilterButton () {
    const {feq} = this.props
    const LableValueTable = ['ALL', 'SEARCH_LARGE', 'WEEK', 'DAY']

    return LableValueTable.map( (lable, index) => {
        const params = {feq: lable}
        const _h = `/pages?${querystring.stringify(params)}`      

      const activeStyle = (lable === feq)? 'active' : null

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
          </ul>
        </div>
      </div>
    )
  }
}

ToolBarPage.contextTypes = {
    feq: PropTypes.string
}
ToolBarPage.propTypes = {
}

export default ToolBarPage
