import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar'
const [searchValue, setSearchValue] = useState('')
const handleSearchValue = (value) => {
    setSearchValue(value)
}
const App = () => {
  return (
    <div className="App">
      <SearchBar onInputChange={handleSearchValue}/>
    </div>
  );
}

export default App;
