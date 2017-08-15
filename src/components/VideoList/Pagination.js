import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import style from './Pagination.css'

class Pagination extends React.Component {
    render() {
        const {page, sort} = this.props
        const count = 20
        
        const renderPage = (count, page) => {
            let returnData = []

            for(let i =1 ;i<count; i++){
                const url = `/videos?sort=${sort}&page=${i}`
                if(i === page)
                    returnData.push(<a href={url} key={i} className={classNames(style['active'])}>{i}</a>)
                else 
                    returnData.push(<a href={url} key={i}>{i}</a>)
            }

            return returnData
        }
        

       return (
            <div className={classNames(style['pagination'])}>
                <a href={`/videos?sort=${sort}&page=${page-1}`}> &laquo; </a>
                {renderPage (count, page)}
                <a href={`/videos?sort=${sort}&page=${page+1}`}> &raquo; </a>
            </div>
       )
    }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  count: PropTypes.object
}

export default Pagination
