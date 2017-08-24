import React from 'react'
import PropTypes from 'prop-types'

// import classNames from 'classnames'
// import style from './FormTextInput.css'

class FormTextInput extends React.Component {
  render() {    
    const {label, onChange, isCheck} = this.props

    const _onChange = e => onChange(e.target.checked)

    return (
        <div className="pure-controls">
          <label htmlFor="cb" className="pure-checkbox">
            <input 
                onChange={_onChange}
                type="checkbox" 
                checked={isCheck}
            /> {label}
          </label>
        </div>
    )
  }
}

FormTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isCheck: PropTypes.bool,
}

export default FormTextInput
