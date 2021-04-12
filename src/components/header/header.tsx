import  { useState } from 'react';
import './header.scss';
import { Input } from 'antd';

const { Search } = Input;

type IHeaderProps = {setSearch: (str: string) => void}

const HeaderComponent = (props: IHeaderProps) => {
  const [value, setValue] = useState("");

 const _handleChange = (e: any) => {
   setValue(e.target.value)  
}

const _onSearch = (value: any) => {
  props.setSearch(value)
}

  return (
    <header data-automation-id="headerComponent">
      <div className="headerBg"></div>
      <h1 className="heading">Search Github Repositories</h1>
      <Search data-automation-id="searchButton" className="searchInput" value={value} placeholder="Search by username" onChange={_handleChange} onSearch={_onSearch} enterButton="Search" size="large" loading={false} /> 
    </header>
  );
}

export default HeaderComponent;
