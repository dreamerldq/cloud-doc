import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd'
import FileList from './components/FileList'
import SearchBar from './components/SearchBar'
import FileTab from './components/FileTab'
import BottomBtn from './components/BottomBtn'
const {
  Header,
  Footer,
  Sider,
  Content
} = Layout;

const App = () => {

const [searchValue, setSearchValue] = useState('')
const [fileTabs, setFileTabs]  = useState([])
const [files, setFiles] = useState([
 { id: 1,
  title: '文档一'
}, {
  id: 2,
  title: '文档二'
}])
const handleSearchValue = (value) => {
  setSearchValue(value)
  console.log('searchValue',value);
}
const handleEditMark = (id, value) => {
  console.log("EDIT",id, value)
}
const handleDeleteMark = (id) => {
   setFiles(files.filter((item) => item.id !== id))
}
const handleClick = (file) => {
  setFileTabs([...fileTabs, file])
}
const handleFileAdd = () => {
  console.log("file add")
}
const handleFileImport = () => {
  console.log("file import ")
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
          <div className="fileTabs">
            {
              fileTabs.map((item) => {
                return(
                  <FileTab file={item} key={item.id}></FileTab>
                )
              })
            }
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
}

export default App;
