import React from 'react'
import PropTypes from 'prop-types'
import ToolBar from './ToolBar'
import ListItem from './ListItem'
import Pagination from './Pagination'
// import style from './index.css'

class VideoList extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render() {
    const {videoList} = this.props
    const {page, sort, totalVideo} = this.props.setting
    const textAlignStyle = {textAlign: 'center'}

    return (
      <div className="pure-g">
        <div className="sidebar pure-u-1 pure-u-md-1-4">
          <div className="header">
            <h1 className="brand-title">A Sample Blog</h1>
            <h2 className="brand-tagline">Creating a blog layout using Pure</h2>
          </div>
        </div>


        <div className="pure-u-1 pure-u-md-1" style={textAlignStyle} >
          <Pagination sort={sort} page={page} totalVideo={totalVideo}/>
        </div>

        <div className="pure-u-1 pure-u-md-1">
          <ToolBar />
        </div>

        <div className="pure-u-1 pure-u-md-1">
          {
            videoList.map((video, index) => {
              const {_id, title, s3Source, description, originThumb, fbPageName, fbPageId} = video
              return <ListItem
                key={index}
                _id={_id}
                s3Source={s3Source}
                title={title}
                originThumb={originThumb}
                description={description}
                fbPageName={fbPageName}
                fbPageId={fbPageId}
              />
            })
          }
        </div>

        <div className="pure-u-1 pure-u-md-1" style={textAlignStyle}>
          <Pagination sort={sort} page={page} totalVideo={totalVideo}/>
        </div>
      </div>
    )
  }
}



VideoList.propTypes = {
  // videoList: PropTypes.object.isRequired,
//   products: PropTypes.array.isRequired
}

export default VideoList
