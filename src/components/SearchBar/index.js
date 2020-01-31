import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from 'antd'
import './style.css'
const SearchBar = ({ onInputChange}) => {
  const [searchValue, setSearchValue] = useState('')
  const [searchStatus, setSearchStatus] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    document.addEventListener('keyup', handleKeyCode)
    return () => {
      document.removeEventListener('keyup', handleKeyCode)
    };
  })
  const handleKeyCode = (event) => {
    const {
      keyCode
    } = event
    if (keyCode === 13) {
      setSearchStatus(false)
      onInputChange(searchValue)
      setSearchValue('')
    }
    if (keyCode === 27) {
      setSearchStatus(false)
      setSearchValue('')
    }
  }
  const handleSearch = () => {
    setSearchStatus(true)
    
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
            <Input ref={ref} onInput={handleValue} placeholder="请输入搜索内容"></Input>
            :
            <div className = "searchBtn" >
              <span>搜索</span>
              <Button onClick={handleSearch} type="primary" icon="search">
              </Button>
            </div>

        }
      </div>
    </div>
  )
}
export default SearchBar