import fetch from 'isomorphic-fetch'
import querystring from'querystring'

const actionCreator = {
  getVideoList: ({limit, skip, sort}) => {
    console.log('*_*_*_* getVideoList *_*_*_*_*')
    const port = process.env.PORT || 3000

    const params = { limit, skip, sort }

    return (
      fetch(`http://localhost:${port}/ajax/videos?${querystring.stringify(params)}`)
      .then(response => {
        return response.json()
      })
    )
  }
}

export default actionCreator
