import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Router, Route, Switch } from 'react-router-dom';
import { Navigation } from '../src/components/common/base.component';
import Sidebar from '../src/components/common/sidebar.component';
import './App.css';
import LoginComponent from './components/authenticate/login.component';
import SecuredRoute from './components/authenticate/secure.component';
import Home from './components/home.component';
import SearchTalent from './components/search_talent.component';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import history from './public/history';

function Main(props) {

  return(
    <div className='h100' style={{overflowY: 'hidden'}}>
      <Navigation />
      <aside className="left-side">
        <Sidebar />
      </aside>
      <aside className="right-side h90">
        <SecuredRoute path='/home' component={Home} />
        <SecuredRoute path='/search_talent' component={SearchTalent} />
      </aside>
    </div>
  )
}

function App() {
  axios.interceptors.request.use(function (config) {
    const token = cookie.load('token');
    // Do something before request is sent
    if(token){
      config.headers.Authorization = 'Bearer '+token;      
    }

    return config;    
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // axios.interceptors.response.use(function(response) {
  //   if(response.data.status === 301){
  //     ToastsStore.error("Token expired. You are going to logout.");
  //     setTimeout(() => {
  //       localStorage.clear();
  //       history.push('/login');
  //     }, 3000);
  //     return Promise.reject(response);
  //   }

  //   return response;
  // }, function (error) {
  //   console.log("error: ", error);
  //   return Promise.reject(error);
  // });

  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path={["/", "/login"]} exact component={LoginComponent} />
          {/* <Route path="/signup" exact component={Register} /> */}
          <Route component={Main}/>
        </Switch>
      </Router>
      <ToastsContainer store={ToastsStore}/>
    </>
  );
}

export default App;