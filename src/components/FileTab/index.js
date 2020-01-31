import React, {useState, useEffect } from 'react'
import './index.css'
const FileTab = ({file, closeFile, unSaves, activeTab}) => {
  return(
    <div className="fileTab">
        {file.title}
    </div>
  )
}
export default FileTab