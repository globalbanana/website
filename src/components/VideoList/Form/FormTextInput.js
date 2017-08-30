import React from 'react'
import PropTypes from 'prop-types'

// import classNames from 'classnames'
// import style from './FormTextInput.css'

class FormTextInput extends React.Component {
  render() {
    const {label, value, error, onChange, isMultiLines} = this.props

    const _onChange = e => onChange(e.target.value)
    
    const textAreaStyle = {
      fontSize: 'small',
      width: '50%', 
    }

    return (
      <div className="pure-control-group">
        <label htmlFor={value}>{label}</label>

        {
          (isMultiLines)?(
            <textarea rows="10"
              placeholder={label} 
              onChange={_onChange}
              value = {value} 
              style={textAreaStyle}
              />
          ):(
            <input 
              type="text" 
              placeholder={label} 
              onChange={_onChange}
              value = {value}
            />
          )
        }


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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  isMultiLines: PropTypes.bool,
}

export default FormTextInput
