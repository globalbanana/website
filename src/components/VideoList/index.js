import React from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

class VideoList extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render() {
    const {videoList} = this.props

    return (
      <div className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-1-4">
              <div className="header">
                  <h1 className="brand-title">A Sample Blog</h1>
                  <h2 className="brand-tagline">Creating a blog layout using Pure</h2>
              </div>
          </div>


        <div className="pure-u-1 pure-u-md-1">
            {
              videoList.map((video, index) => {
                const {_id, s3Source, description} = video
                return <ListItem
                  key={index}
                  _id={_id}
                  s3Source={s3Source}
                  description={description}/>
              })
            }
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
