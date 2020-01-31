import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd'
import MarkItem from './components/MarkItem'
import SearchBar from './components/SearchBar'
import FileTab from './components/FileTab'
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
}
const handleEditMark = (id) => {
 
}
const handleDeleteMark = (id) => {
   setFiles(files.filter((item) => item.id !== id))
}
const handleClick = (file) => {
  setFileTabs([...fileTabs, file])
}
  return (
    <Layout>
       <Sider theme="light">
        <SearchBar onInputChange={handleSearchValue}/>
        <div className="markList">
           {
             files.map((item) => {
               return(
                 <MarkItem clickItem={handleClick} key={item.id} file={item} title={item.title} editItem={handleEditMark} deleteItem={handleDeleteMark}></MarkItem>
               )
             })
           }
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
