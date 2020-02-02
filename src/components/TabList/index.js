import React, {useState, useEffect } from 'react'
import './index.scss'
import { Icon } from 'antd'
import classnames from 'classnames'
const TabList = ({files, activeId, unsavedIds, onTabClick, onCloseTab}) => {
  return(
    <div className="tabList">
       {
         files.map((file) => {
           const withUnsaveMark = unsavedIds.includes(file.id)
           const tabClassName = classnames({
             'normalTab': true,
             'activeTab': file.id == activeId,
             'withUnsave': withUnsaveMark
           })
           return(
             <div className={tabClassName} onClick={(e) => {e.preventDefault(); onTabClick(file.id)}} key={file.id}>
              <span>{file.title}</span>
              <Icon onClick={(e) => {onCloseTab(file.id); e.stopPropagation();}
              } className="closeBtn"  type="close-circle" />
              {
                withUnsaveMark && 
                <div className="cicle"></div>
              }
              </div>
           )
         })
       }
    </div>
  )
}
export default TabList