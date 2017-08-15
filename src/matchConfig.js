
import HelloWorld from './containers/HelloWorld'
import PreloadHelloWorld from './containers/PreloadHelloWorld'
import JsonAPI from './containers/JsonAPI'
import VideoList from './containers/VideoList'

const matchConfig = [
  {
    path: '/videos',
    component: VideoList,
    initState: VideoList.initState,
    exact: false
  },
  {
    path: '/videos?sort=:sort&page=:page',
    component: VideoList,
    initState: VideoList.initState,
  }
  // {
  //   path: '/api',
  //   component: JsonAPI,
  //   initState: JsonAPI.initState
  // },
  // {
  //   path: '/videos',
  //   component: VideoList,
  //   initState: VideoList.initState
  // },
  // {
  //   path: '/preload',
  //   component: PreloadHelloWorld,
  //   initState: PreloadHelloWorld.initState
  // },
  // {
  //   path: '/',
  //   component: HelloWorld,
  //   initState: HelloWorld.initState,
  //   exact: false
  // }
]

export default matchConfig
