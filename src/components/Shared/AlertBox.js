import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './AlertBox.css'

const renderAlertBox = (alertMessage, isAlertSuccess, clickCloseHandle) => (
  <div className={classNames(style['alertBox'])}>
    <div className={(isAlertSuccess) ? classNames(style['alertBoxContentSuccess']) : classNames(style['alertBoxContent'])}>
      <span
        className={classNames(style['closebtn'])}
        onClick={clickCloseHandle}>×</span>
      <span className={classNames(style['alertBoxText'])}>{alertMessage}</span>
    </div>
  </div>)

class AlertBox extends Component {
  render () {
    const { alertMessage, isAlertSuccess, clearnAlertMessage } = this.props
    return (alertMessage) ? renderAlertBox(alertMessage, isAlertSuccess, clearnAlertMessage) : null
  }
}

AlertBox.propTypes = {
  alertMessage: PropTypes.string,
  isAlertSuccess: PropTypes.bool,
  clearnAlertMessage: PropTypes.func.isRequired
}

export default AlertBox
