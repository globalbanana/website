import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './VideoForm.css'

import FormTextInput from './FormTextInput'

class VideoForm extends React.Component {
    render () {
        let label1 = 'New Title'
        let label2 = 'New Description'
        let val1 = ''
        let val2 = ''

        return (
                <form className={classNames(style['videoForm'], "pure-form pure-form-aligned")}>
                    <fieldset>
                        <FormTextInput label={label1} value={val1} />
                        <FormTextInput label={label2} value={val2} />
                        <div className="pure-controls">
                            <label for="cb" className="pure-checkbox">
                                <input id="cb" type="checkbox" /> Ready to publish
                            </label>
                        </div>
                    </fieldset>
                    <button type="submit" className={classNames(style['videoFormButton'], "pure-button")}>Save</button>
                </form>
        )
    }
}

VideoForm.propTypes = {
    
}

export default VideoForm
