import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const port = process.env.PORT || 3000

const actionCreator = {
  getVideoList: ({limit, skip, sort}) => {
    console.log('*_*_*_* getVideoList *_*_*_*_*')

    const params = { limit, skip, sort }

    return (
      fetch(`http://localhost:${port}/ajax/videos?${querystring.stringify(params)}`)
      .then(response => {
        return response.json()
      })
    )
  },
  getVideoCount: () => {
    return (
      fetch(`http://localhost:${port}/ajax/system`)
      .then(response => {
        return response.json()
      })
    )
  },
  updateVideo: (id, payload) => {
    return (
      fetch(`http://localhost:${port}/ajax/videos/${id}`,{
        method: 'PUT',
        body: payload
      })
      .then(response => {
        return response.json()
      })
    )
  }
}

export default actionCreator
