import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'

const SearchBar = ({ onInputChange}) => {
  const [searchStatus, setSearchStatus] = useState(false)
  useEffect(() => {
    document.addEventListener('keyup', handleKeyCode)
    return () => {
      document.removeEventListener('keyup', handleKeyCode)
    };
  })
  const handleKeyCode = (event) => {
    const {
      keycode
    } = event
    if (keycode === 13) {
      setSearchStatus(true)
    }
    if (keycode === 26) {
      setSearchStatus(false)
    }
  }
  const handleValue = (event) => {
    const {
      value
    } = event
    onInputChange(value)
  }
  return (
    <div>
      <div className="search_btn">
        {
          searchStatus ? 
            <Input onClick={handleValue} placeholder="请输入搜索内容"></Input>
            :
            <div>
              <span>MarkDown文本编译器</span>
              <Button onClick={() => setSearchStatus(true)} type="primary" icon="search">

              </Button>
            </div>

        }
        
     
      </div>
    </div>
  )
}
export default SearchBar