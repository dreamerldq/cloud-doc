import React, {useState} from 'react';
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
const [files, setFiles] = useState([
 { id: 1,
  title: '文档一',
  body:'### Hello World'
}, {
  id: 2,
  title: '文档二',
  body: '### Hello World MarkDown'
}])
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
const handleEditMark = (id, value) => {
  console.log("EDIT",id, value)
  const newFiles = files.map((file) => {
    if(file.id === id){
      return {
        ...file,
        title: value
      }
    }
    return file
    
  })
  setFiles(newFiles)
}
const handleDeleteMark = (id) => {
   setFiles(files.filter((item) => item.id !== id))
   handleTabClose(id)
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
  console.log("file add")
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
  console.log("new value", value, id)
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
          />;
        </Content>
        
      </Layout>
    </Layout>
  );
}

export default App;
