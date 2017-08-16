import React from 'react'
import PropTypes from 'prop-types'

// import classNames from 'classnames'
// import style from './FormTextInput.css'

class FormTextInput extends React.Component {
  render() {
    const {label, value, error, onChange} = this.props

    const _onChange = e => onChange(e.target.value)
    
    return (
      <div className="pure-control-group">
        <label htmlFor={value}>{label}</label>
        <input 
          type="text" 
          placeholder={label} 
          onChange={_onChange}
          value = {value}
        />

        {
          error ?
            <span className="pure-form-message-inline">
              {error}
            </span> :
            null
        }
      </div>
    )
  }
}

FormTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
}

export default FormTextInput
