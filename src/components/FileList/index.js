import React, {useState, useEffect} from 'react'
import { Icon, Input, Button } from 'antd'
import useKeyPress from '../../hooks/useKeyPress'
import './index.css'
const FileList = ({
    deleteItem,
    editItem,
   files,
   clickItem
  }) => {
  const [editState, setEditState] = useState(false)
  const [value, setValue] = useState('')
  const enterKeyPress = useKeyPress(13)
  const escKeyPress = useKeyPress(27)
  useEffect(() => {
    if (enterKeyPress && setEditState) {
       editItem(editState, value)
       setEditState(false)
    }
    if (escKeyPress && setEditState) {
      closeSearch()
    }
  })
  const handleClick = (file) => {
     clickItem(file)
  }
  const closeSearch = () => {
    setEditState(false)
    setValue('')
  }
  const handleValue = (e) => {
    setValue(e.target.value)
  }
  return(
    <div className="fileList">
     {
       files.map((file) => {
         return(
           
             (file.id !== editState) ?
              <div key={file.id} onClick={() => {handleClick(file)}} className="markItem">
              <Icon type="file-markdown"/>
              <span>{file.title}</span>
              <Icon onClick={() => {deleteItem(file.id)}} type="delete"/>
              <Icon onClick={() => {setEditState(file.id); setValue(file.title)}} type="edit"/>
          </div>
          :
          <div className="searchInput">
              <Input value={value} onInput={handleValue} placeholder="请输入搜索内容"></Input>
              <Button icon="close" onClick={closeSearch}></Button>
           </div>
           
          
         )
       })
     }
    </div>
  )
}
export default FileList