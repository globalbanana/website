import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './index.css'

import NavBar from '../Shared/NavBar'

import {PAGE_LIMIT} from '../../config/env'
// import style from './index.css'

class PageList extends React.Component {
  
  render() {
    return (
      <div>
          
        <div className={`pure-g`}>

            <NavBar pathName={this.props.location.pathname}/>

        </div>
      </div>
    )
  }
}


PageList.childContextTypes = {
}

PageList.propTypes = {
}

export default PageList
