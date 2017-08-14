

import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './DropDown.css'

class DropDown extends React.Component {
    render() {
        const title = 'SortBy'
        const links = [
            {title: 'createdAt', link: '/'}
        ]

        console.log('this.props.match: ', this.props.match)

       return (
        <div className={classNames(style['dropdown'])}>
            <button className={classNames(style['dropbtn'])}>
                {title}
            </button>
            <div className={classNames(style['dropdownContent'])}>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </div> 
       )
    }
}

DropDown.propTypes = {
    
}

export default DropDown