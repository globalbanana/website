import { connect } from 'react-redux'
import Hello from './../components/Hello'
import helloActionCreator from '../actions/hello'

import jsonAPIActionCreator from '../actions/jsonAPI'

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.hello.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(helloActionCreator.helloWorld());
    }
  }
}

const preloadHello = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)

preloadHello.initState = (store, req, res) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log('preload ......................')
      dispatch(helloActionCreator.helloWorld())
      dispatch(jsonAPIActionCreator.getJsonAPI());
      resolve(1)
    })
  }
}

export default preloadHello