import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation } from '../src/components/common/base.component';
import './App.css';

function Main(props) {

  return <div>
      <Navigation />
      <div className="container content">
        This is home screen
        {/* <SecuredRoute path='/home'  component={Home} /> */}
      </div>
  </div>;
}

function App() {
  // axios.interceptors.request.use(function (config) {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   // Do something before request is sent
  //   if(token){
  //     config.headers.Authorization = token;      
  //   }

  //   return config;    
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

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
      <Router>
        <Switch>
          {/* <Route path={["/", "/login"]} exact component={Login} />
          <Route path="/signup" exact component={Register} /> */}
          <Route component={Main}/>
        </Switch>
      </Router>
      {/* <ToastsContainer store={ToastsStore}/> */}
    </>
  );
}

export default App;
