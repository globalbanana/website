import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './Pagination.css'

class Pagination extends React.Component {
    render() {
       return (
            <div className={classNames(style['pagination'])}>
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#" className="active">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">&raquo;</a>
            </div>
       )
    }
}

Pagination.propTypes = {
    
}

export default Pagination
