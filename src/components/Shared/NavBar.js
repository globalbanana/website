import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './NavBar.css'

class NavBar extends React.Component {
    render() {
        const url = this.props.pathName
        
        const videoPath = '/videos'
        const pagePath = '/pages'
        const isPathActived = (path) => (url.indexOf(path) !== -1)
    
        const videoStyleName = isPathActived(videoPath)? classNames(style['actived']) : null
        const pageStyleName = isPathActived(pagePath)? classNames(style['actived']) : null
    
        return <div className={classNames("sidebar pure-u-1", style['navBar'])}>
            <a href={pagePath} className={pageStyleName}> Page</a>
            <a href={videoPath} className={videoStyleName} > Video</a>
        </div>
    }
}
  
NavBar.propTypes = {
    pathName: PropTypes.string.isRequired
}

export default NavBar
