import React from 'react';
import { baseURL } from '../../config';
import { httpService } from '../../data-access/httpService';
import { notification, Table } from 'antd';
import { Owner } from '../models';
import './searchRepos.scss';
import HeaderComponent from '../header/header';

class SearchRepos extends React.Component {
  state = {
    columns: [],
    getUserDetails: [],
    isSearchStringEmpty: false
  }

  componentDidMount(){
    this.setState({
    columns: [
      {
        title: 'Owner',
        dataIndex: '',
        render: (record: Owner) => <><img className="avatar" alt="avatar" src={record.owner.avatar_url}/> {record.owner.login}</>,
        width: 150
      },
      {
        title: 'Name',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a: any, b: any) => a.name.length - b.name.length
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Stars',
        dataIndex: 'stargazers_count',
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a: any, b: any) => a.stargazers_count - b.stargazers_count,
        width: 150
      },
      {
        title: 'Open Issues Count',
        dataIndex: 'open_issues_count',
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a: any, b: any) => a.open_issues_count - b.open_issues_count,
        width: 180
      },
      {
        title: 'Watchers',
        dataIndex: 'watchers',
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a: any, b: any) => a.watchers - b.watchers,
        width: 150
      }
    ]
  })
  }

    render() {
      return (
        <div className="wrapper" data-automation-id="searchComponent">
          <HeaderComponent setSearch={this.setSearch}/>
          <Table
          columns={this.state.columns}
          dataSource={this.state.getUserDetails}
          pagination={{ pageSize: 5 }}
        />
      </div>
      )
    }

    private openNotification = () => {
      notification["error"]({
        message: this.state.isSearchStringEmpty ? 'Please enter username' : 'Try with another username',
        description:
        this.state.isSearchStringEmpty ? 'Username cannot be empty' : 'No Record found for the given username.',
      });
    };

    private setSearch = (data: string) => {
      if(data){
        this.setState({ getUserDetails: [], isSearchStringEmpty: false})
        this._getUserDetails(data)
      } else{
        this.setState({isSearchStringEmpty: true}, () => this.openNotification())
      }
    }

    private _getUserDetails = (data: string) => {
      var url = baseURL + `/users/${data}/repos`
      httpService.getApi(url).then(response => {
        this.setState({
          getUserDetails: response.data
        })
      })
      .catch(error => {
        this.openNotification()
        if (error) console.log("Error: " + error)
      })
    }

  }

  export default SearchRepos