import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const port = process.env.PORT || 3000


const genSameOriginOption = (payload, isPut) => {
  return {
    method: (isPut)?'PUT' :'POST',
    credentials: 'same-origin',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  }
}

const actionCreator = {
  getVideoList: ({limit, skip, sort, field}) => {
    console.log('*_*_*_* getVideoList *_*_*_*_*')

    const params = { limit, skip, sort, field}

    return (
      fetch(`http://localhost:${port}/ajax/videos?${querystring.stringify(params)}`)
      .then(response => {
        return response.json()
      })
    )
  },
  getVideoCount: (status) => {
    return (
      fetch(`http://localhost:${port}/ajax/system?status=${status}`)
      .then(response => {
        return response.json()
      })
    )
  },
  updateVideo: (id, payload) => {
    return (dispatch, getState) => {

      const option = genSameOriginOption(payload, true)

      return fetch(`/ajax/videos/${id}`,option)
      .then(
        response => {
          return Promise.resolve
        }
      )
    }
  }
}

export default actionCreator
