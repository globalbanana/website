
import { connect } from 'react-redux'
import PageList from './../components/PageList'
import api from '../actions/api'
import globalStyle from '../styles/global.css'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const pList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageList)

pList.initState = (store, req, res) => {
  return (dispatch, getState) => {
    return Promise.resolve(1)
  }
}


export default pList