import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import FileList from './components/FileList'
import SearchBar from './components/SearchBar'
import TabList from './components/TabList'
import BottomBtn from './components/BottomBtn'
import fileHelper from './utils/fileHelper'
const uuidv4 = require('uuid/v4');
const { join } = window.require('path')
const path = window.require('path')
const fs = window.require('fs')


const { remote } = window.require('electron')
const Store = window.require('electron-store')
const fileStore = new Store({'name': 'Files Date'})
console.log("qqq", fileStore.get('files'))
const {
  Header,
  Footer,
  Sider,
  Content
} = Layout;

const App = () => {

const [searchValue, setSearchValue] = useState('')
const [activeFileId, setActiveFileId] = useState('');
const [openFileIds, setOpenFileIds] = useState([]);
const [unSaveIds, setUnSaveIds] = useState([])
const savedLocation = remote.app.getPath('documents')
const [files, setFiles] = useState(fileStore.get('files')|| [])

useEffect(() => {
  let markdowns = fs.readdirSync(savedLocation).map((file) => {
    if (path.extname(file) === '.md') {
      return file.split('.')[0]
    }
  }).filter((item) => item)
  let newFiles = []
  markdowns.forEach(title => {
    files.forEach(file => {
      if (file.title === title) {
        newFiles.push(file)
      }
    });
  });
  setFiles(newFiles)
  fileStore.set('files', handleFilesData(newFiles))
}, [])
const opendFiles = openFileIds.map((openId) => {
  return files.find((file) => file.id === openId)
})
const activeFile = files.find(file => file.id === activeFileId)

const handleSearchValue = (title) => {
  const searchFiles = files.filter((file) => file.title.includes(title) )
  // setSearchValue(value)
  // console.log('searchValue',value);
  setFiles(searchFiles)
}
const handleFilesData = (files) => {
  return files.map((file) => {
    return{
      title: file.title,
      path: file.path,
      id: file.id
    }
  })
}
const handleEditMark = (id, title, isNew) => {
  const newFiles = files.map((file) => {
    if(file.id === id){
      return {
        ...file,
        title,
        isNew: false
      }
    }
    return file
  })
   const fileItem = files.find((item) => item.id === id)
  if(isNew){
   
    console.log('新建的markdown', fileItem);
    const newPath = join(savedLocation, `${title}.md`)
    
    fileHelper.writeFile(newPath, fileItem.body).then(() => {
       const newFiles = files.map((file) => {
         if (file.id === id) {
           return {
             ...file,
             title,
             isNew: false,
             path: newPath
           }
         }
         return file
       })
       setFiles(newFiles)
       fileStore.set('files', handleFilesData(newFiles))

    })
  }else{
    const oldPath = join(savedLocation, `${fileItem.title}.md`)
    const newPath = join(savedLocation, `${title}.md`)
    fileHelper.renameFile(oldPath, newPath).then(() => {
        setFiles(newFiles)
        fileStore.set('files', handleFilesData(newFiles))
    })
  }
}
const handleSaveMarkDown = () => {
  fileHelper.writeFile(join(savedLocation, `${activeFile.title}.md`), activeFile.body).then(() => console.log('保存成功'))
  setUnSaveIds(unSaveIds.filter((id) => id !== activeFile.id))
}
const handleDeleteMark = (id) => {
   const fileItem = files.find((item) => item.id === id)
   fileHelper.deleteFile(join(savedLocation, `${fileItem.title}.md`)).then(()=> {
      setFiles(handleFilesData(files.filter((item) => item.id !== id)))
       handleTabClose(id)
   })
  
}
const handleClick = (file) => {
  // 将file.id push 到openFileIds
  // 将 activeId 设置为file.id
  if(!openFileIds.includes(file.id)){
      setActiveFileId(file.id)
      setOpenFileIds([...openFileIds, file.id])
  }

}
const handleFileAdd = () => {
  const newFile = {
    title: '',
    body: '## 请输入· MarkDown',
    id: uuidv4(),
    isNew: true
  }
  setFiles([...files, newFile])
  
}
const handleFileImport = () => {
  console.log("file import ")
}
const handleTabClick = (id) => {
  console.log("tab clicked", id)
  // 设置activeId
  setActiveFileId(id)
}
const handleTabClose = (id) => {
  console.log('tab closed', id)
  // 从openFilesId中移除id
  const newOpenFileIds = openFileIds.filter((openId) => openId !== id)
  setOpenFileIds(newOpenFileIds)
  if(newOpenFileIds.length> 0){
    setActiveFileId(newOpenFileIds[0])
  }
}
const fileChange = (id, value) => {
  const newFiles = files.map((file) => {
    if(file.id === id){
      return{
        ...file,
        body: value
      }
    }
    return file
  })
  setFiles(newFiles)
  if(!unSaveIds.includes(id)){
  setUnSaveIds([...unSaveIds, id])
  }
}
  return (
    <Layout>
       <Sider theme="light">
        <SearchBar onInputChange={handleSearchValue}/>
        <FileList files={files} editItem={handleEditMark} deleteItem={handleDeleteMark} clickItem={handleClick}></FileList>
        <div className="bottomBtns">
          <BottomBtn 
          clickButton={handleFileAdd}
          iconName="file-add"
          title="新建"
          colorType = "primary" >
          </BottomBtn>
           
           <BottomBtn 
          clickButton={handleFileImport}
          iconName="folder"
          title="导入"
           > 
          </BottomBtn>
        </div>
       </Sider>
      <Layout>
        
        <Content>
         <TabList unsavedIds={unSaveIds} activeId={activeFileId} files={opendFiles} onCloseTab={handleTabClose} onTabClick ={handleTabClick}></TabList>

         <SimpleMDE
            id={activeFile && activeFile.id}
            onChange={(value) => {fileChange(activeFile.id, value)}}
            value={activeFile && activeFile.body}
          />
           <BottomBtn 
            clickButton={handleSaveMarkDown}
            iconName="save"
            title="保存"
            colorType="primary" >
          </BottomBtn>
        </Content>
        
      </Layout>
    </Layout>
  );
}

export default App;
