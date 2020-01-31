import React, {useState, useEffect} from 'react'
import { Icon } from 'antd'
import './index.css'
const MarkItem = ({
    deleteItem,
    editItem,
   file,
   clickItem
  }) => {
  const handleClick = (e) => {
    e.preventDefault()
     clickItem(file)
  }
  return(
    <div onClick={handleClick} className="markItem">
        <span>{file.title}</span>
        <Icon onClick={() => {deleteItem(file.id)}} type="delete"/>
        <Icon onClick={() => {editItem(file.id)}} type="edit"/>
    </div>
  )
}
export default MarkItem