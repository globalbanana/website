import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './ToolBar.css'

import DropDown from './DropDown'

class ToolBar extends React.Component {
  render() {
    return (
      <div>
        <div className={classNames(style['navHeader'], 'pure-menu', 'pure-menu-horizontal')} >
          <ul className={classNames('pure-menu-list')}>
            <li className={classNames('pure-menu-item')}>
              <div className={classNames(style['filterContainer'])}>
                <span className={classNames(style['filterItem'])}>New  </span>
                <span className={classNames(style['filterItem'])}>Editing </span>
                <span className={classNames(style['filterItem'])}>Ready </span>
                <span className={classNames(style['filterItem'])}>Published </span>
                <span className={classNames(style['filterItem'])}>Delete </span>
              </div>
            </li>
            <li className={classNames('pure-menu-item')}>
              <a href="/dashboard/create" className={classNames('pure-menu-link')}>Create</a>
            </li>
            <li className={classNames('pure-menu-item')}>
              <a href="/dashboard/contact" className={classNames('pure-menu-link')}>About</a>
            </li>
            <li className={classNames('pure-menu-item')}>
              <DropDown />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ToolBar.propTypes = {

}

export default ToolBar
