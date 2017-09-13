import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './index.css'

import NavBar from '../Shared/NavBar'
import ToolBarPage from '../Shared/ToolBarPage'

import {PAGE_LIMIT} from '../../config/env'
// import style from './index.css'
import {getFormattedTimeInfo} from '../../util/date'

class PageList extends React.Component {
  
  constructor (props) {
    super(props)
    const _pl = this.props.pageList.map( item => {
      return {
        ...item,
        name: item.fbName,
        good: item.videoCount.ready + item.videoCount.published,
        total: item.videoCount.total,
        bad: item.videoCount.deleted
      }
    })

    this.state = {
      sortBy: 'Good',  //Name, FanCount, TalkAboutCount, Total, Good, Bad, CreatedAt
      isIncrease: true,
      pageList: _pl
    }
    this.clickSortBy = this.clickSortBy.bind(this)
  }

  clickSortBy (___by) {
    const __by = ___by
    return () => {
      const {sortBy, isIncrease} = this.state
      const _by = __by[0].toLowerCase() + __by.slice(1)
      let _isIncrease = (_by === sortBy)? !isIncrease : isIncrease

      const compare = (a, b) => {
        let _a, _b

        if(typeof a[_by] === 'string'){
          _a = a[_by].toUpperCase()
          _b = b[_by].toUpperCase()
        } else {
          _a = a[_by]
          _b = b[_by]
        }

        return (_isIncrease)? (_a-_b):(_b-_a)
      }
      
      
      const _pl = this.state.pageList
      
      // console.log('_pl: ', _pl)
      _pl.sort(compare)

      this.setState({
        isIncrease: _isIncrease,
        sortBy: _by,
        pageList: _pl
      })
    }
  }

  render() {
    const {feq} = this.props.setting
    const { pageList } = this.state
    const {clickSortBy} = this
    return (
      <div>
        <div className={`pure-g`}>
            <NavBar pathName={this.props.location.pathname}/>

            <div className="pure-u-1 pure-u-md-1">
              <ToolBarPage feq={feq}/>
            </div>

            <div className={classNames("pure-u-1", style['tableContainer'])}>

            <div className={classNames(style['row'],style['header'])}>
              <span className={classNames(style['s'])}> </span>
              <span className={classNames(style['s'])}> </span>
              <span className={classNames(style['name'])} onClick={clickSortBy('Name')}> Name </span>
              <span onClick={clickSortBy('FanCount')}> FanCount </span>
              <span onClick={clickSortBy('TalkAboutCount')}> TalkAboutCount </span>
              <span onClick={clickSortBy('Total')} className={classNames(style['xs'])}> Total </span>
              <span onClick={clickSortBy('Good')} className={classNames(style['xs'])}> Good </span>
              <span onClick={clickSortBy('Bad')} className={classNames(style['xs'])}> Bad </span>
              <span onClick={clickSortBy('CreatedAt')}> CreatedAt </span>
            </div>

            {
                pageList.map((pageItem, index) => {
                  return <div className={classNames(style['row'])} key={index}>
                      <span className={classNames(style['s'], style['feq'])}> {pageItem.feq} </span>
                      <span className={classNames(style['s'])}> <img src={pageItem.picture} /> </span>
                      <span className={classNames(style['name'])}> {pageItem.fbName} </span>
                      <span> {pageItem.fanCount}  </span>
                      <span> {pageItem.talkAboutCount}  </span>
                      <span className={classNames(style['xs'])}> {pageItem.total}  </span>
                      <span className={classNames(style['xs'])}> {pageItem.good}  </span>
                      <span className={classNames(style['xs'])}> {pageItem.bad}  </span>
                      <span> {getFormattedTimeInfo(new Date(pageItem.createdAt))}  </span>
                    </div>                  
                })
            }

            </div>
        </div>
      </div>
    )
  }
}

PageList.propTypes = {
  pageList: PropTypes.array.isRequired  
}

export default PageList
