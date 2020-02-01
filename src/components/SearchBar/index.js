import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from 'antd'
import useKeyPress from '../../hooks/useKeyPress'
import './style.css'
const SearchBar = ({ onInputChange}) => {
  const [searchValue, setSearchValue] = useState('')
  const [searchStatus, setSearchStatus] = useState(false)
  const ref = useRef(null)
  const enterKeyPress = useKeyPress(13)
  const escKeyPress = useKeyPress(27)
  useEffect(() => {
    if(enterKeyPress && searchStatus){
      onInputChange(searchValue)
    }
    if(escKeyPress && searchStatus){
      closeSearch()
    }
  })
  useEffect(() => {
    if(searchStatus){
      ref.current.focus()
    }
  },[searchStatus])
  const closeSearch = () => {
  setSearchStatus(false)
  setSearchValue('')
  }

  const handleValue = (event) => {
    const {
      value
    } = event.target
    setSearchValue(value)
  }
  return (
    <div>
      <div>
        {
          searchStatus ? 
           <div className="searchInput">
              <Input ref={ref} onInput={handleValue} placeholder="请输入搜索内容"></Input>
              <Button icon="close" onClick={closeSearch}></Button>
           </div>
            :
            <div className = "searchBtn" >
              <span>我的云文档</span>
              <Button onClick={() => { setSearchStatus(true)}} type="primary" icon="search">
              </Button>
            </div>

        }
      </div>
    </div>
  )
}
export default SearchBar