import React from 'react'
import PropTypes from 'prop-types'

// import classNames from 'classnames'
// import style from './FormTextInput.css'

class FormTextInput extends React.Component {
    render(){
        const {label, value, error} = this.props

        return (            
            <div className="pure-control-group">
                <label for={value}>{label}</label>
                <input id={value} type="text" placeholder={label} />
                
                {
                    (error)? 
                        <span className="pure-form-message-inline">
                            {error}
                        </span>
                        : null
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
