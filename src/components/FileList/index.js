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
    const newFile = files.find((file) => file.isNew)
    if(newFile){
      setEditState(newFile.id)
      setValue(newFile.title)
    }
    console.log('重置');
  }, [files])
  useEffect(() => {
     const editFile= files.find(file => file.id === editState)
     console.log("QWWW", files, editState)
    if (enterKeyPress && editState && value.trim() !== '') {
       editItem(editFile.id, value, editFile.isNew)
       setEditState(false)
    }
    if (escKeyPress && setEditState) {
      closeSearch(editFile)
    }
  })
  const handleClick = (file) => {
     clickItem(file)
  }
  const closeSearch = (editItem) => {
    console.log("取消")
    setEditState(false)
    setValue('')
    if(editItem.isNew){
      deleteItem(editItem.id)
    }
  }
  const handleValue = (e) => {
    setValue(e.target.value)
  }
  return(
    <div className="fileList">
     {
       files.map((file) => {
         return(
           
             (file.id !== editState && !file.isNew) ?
              <div key={file.id} onClick={() => {handleClick(file)}} className="markItem">
              <Icon type="file-markdown"/>
              <span>{file.title}</span>
              <Icon onClick={() => {deleteItem(file.id)}} type="delete"/>
              <Icon onClick={() => {setEditState(file.id); setValue(file.title)}} type="edit"/>
          </div>
          :
          <div key={file.id} className="searchInput">
              <Input value={value} onInput={handleValue} placeholder="请输入搜索内容"></Input>
              <Button icon="close" onClick={(e) => {e.preventDefault(); closeSearch(file)}}></Button>
           </div>
            
          
         )
       })
     }
    </div>
  )
}
export default FileList