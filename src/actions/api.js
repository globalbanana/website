import fetch from 'isomorphic-fetch'

const actionCreator = {
  getVideoList: () => {
    console.log('*_*_*_* getVideoList *_*_*_*_*')
    const port = process.env.PORT || 3000
    return (
      // fetch(`https://jsonplaceholder.typicode.com/posts`)
      fetch(`http://localhost:${port}/ajax/videos`)
      .then(response => {
        return response.json()
      })
    )
  }
}

export default actionCreator
