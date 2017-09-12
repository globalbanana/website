
import { connect } from 'react-redux'
import PageList from './../components/PageList'
import api from '../actions/api'
import globalStyle from '../styles/global.css'
import {TABLE_PAGE_LIMIT} from '../config/env'

import {
  SET_PAGE_LIST
} from '../config/actionType'

const mapStateToProps = (state, ownProps) => {
  return {
    pageList: state.dataBase.pageList
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
    console.log('getPageList ...................... 0')
    let {page, sort = '-createdAt', status} = req.query
    page = page ? JSON.parse(page) : 1
    const limit = TABLE_PAGE_LIMIT
    const skip = (TABLE_PAGE_LIMIT * (page - 1))
    const field = JSON.stringify({status})


    return Promise.all([
      api.getPageList({limit, skip, sort, field})
    ]).then(
      (result) => {
        const list = result[0]

        dispatch({type: SET_PAGE_LIST, list})

        return Promise.resolve()
      }
    )
    
  }
}


export default pList