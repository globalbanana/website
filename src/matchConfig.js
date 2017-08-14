
import HelloWorld from './containers/HelloWorld'
import PreloadHelloWorld from './containers/PreloadHelloWorld'
import JsonAPI from './containers/JsonAPI'
import VideoList from './containers/VideoList'

const matchConfig = [
  {
    path: '/api',
    component: JsonAPI,
    initState: JsonAPI.initState
  },
  {
    path: '/videos?sort=:sort&page=:page',
    component: VideoList,
    initState: VideoList.initState
  },
  {
    path: '/videos',
    component: VideoList,
    initState: VideoList.initState
  },
  {
    path: '/preload',
    component: PreloadHelloWorld,
    initState: PreloadHelloWorld.initState
  },
  {
    path: '/',
    component: HelloWorld,
    initState: HelloWorld.initState,
    exact: false
  }
]

export default matchConfig
