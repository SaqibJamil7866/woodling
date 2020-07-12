import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { Route, Redirect } from 'react-router';
 import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce'; 
import  {SearchServices} from '../services/SearchServices'; 
import "antd/dist/antd.css"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

 const { Option } = Select;
class TagePeopleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
   state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });

    try{   
          
          SearchServices.getSearchPeoples(value).then(async (result) => {
             if(result.status == 'success'){
              //localStorage.setItem('user', JSON.stringify(result));
                  var data = result.people;
                  var followingOptions = [];
                  data.map(function(following){
                      var temp = {
                           value:following.id,
                           text:"@"+following.username               
                      };
                      followingOptions.push(temp);
                  }); 
                   this.setState({ data:followingOptions,fetching: false });  

                  console.log(result);
                }else {
                    console.log(result); 
                  toast.error(result.message,{ autoClose: 15000 }); 
                } 
          }); 
      
        }catch(e){
             console.log('error', e);
      } 



 /*   fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });*/
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    console.log(value);
    return ( 
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
        className="tag-people post-image-tag"
      >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select> 
    );
  } 
}
 
export default TagePeopleComponent