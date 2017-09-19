import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import classNames from 'classnames'
import style from './DropDown.css'

class DropDown extends React.Component {  
  
  constructor (props, context) {      
    super(props, context)
    const {pageIndex, fbPageId = null} = context
    let defaultSelect = 'ALL'
    const itemList = [{name:'ALL', id: null}].concat(
      pageIndex.map( item => {
        const name = `(${item.videoCount.total}) ${item.fbName}`
        const id = item.fbPageId
        
        if(fbPageId === id) defaultSelect= name
        return {name, id}
      })
    )
    
    this.state = {
      itemList,defaultSelect
    }
    this._onChange = this._onChange.bind(this)
  }

    _onChange(e){
      const {itemList} = this.state
      
      const fbName = e.target.value
      const fbPageId = itemList.filter( _t => _t.name ===fbName)[0].id        
      const {page=1, sort='-createdAt', status='NEW'} = this.context 
      const params = {
        sort,
        page,
        status,
        fbPageId
      }
      window.location.href =  `/videos?${querystring.stringify(params)}`      

    }
      
    render() {
      const {itemList, defaultSelect} = this.state
  
       return (
        <div className={classNames(style['dropdown'])}>
            <select onChange={this._onChange} value={defaultSelect}>
              {
                itemList.map( (item,index) => 
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>)
              }
            </select>
        </div> 
       )
    }
}

DropDown.contextTypes = {
  pageIndex: PropTypes.array,
  sort: PropTypes.string,
  page: PropTypes.number,
  totalVideo: PropTypes.number,
  status: PropTypes.string,
  fbPageId: PropTypes.string
}
DropDown.propTypes = {
    
}

export default DropDown
