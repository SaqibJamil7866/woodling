import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link,withRouter,Redirect } from 'react-router-dom';
 
import  Header from './layouts/Header';  

import  HomeScreen from './screens/homeScreen';  
import  LoginScreen from './screens/auth/LoginScreen';  
import  RegisterScreen from './screens/auth/RegisterScreen'; 
import  WalletScreen from './screens/WalletScreen'; 
import  PromotePost from './screens/PromotePost'; 
import  SummaryPromote from './component/SummaryPromote'; 
import  promotionsInsights from './screens/promotionsInsights'; 
import  CastingCalls from './screens/CastingCalls'; 
import  SettingScreen from './screens/SettingScreen'; 

import  {AuthServices} from './services/AuthServices';


import './assets/css/style.css';   
import './assets/css/style2.css';   
    
import { createBrowserHistory } from 'history'; 

const history = createBrowserHistory(); 
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthServices.isLogedIn() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)
class App extends  React.Component  {  
  constructor(props) {
    super(props)  
  }  
  componentDidMount() {  
  /* alert(this.props.location);*/
     console.log("UserId="+AuthServices.isLogedIn());     
     /*window.location.pathname != '/register' && window.location.pathname != '/login'*/ 
  }  

 
   render() { 
        return (
           <div> 
                <Router history={history}> 
                  <div> 
                    
                      <Header history={history}/> 
                      <Switch> 
                          <Route exact path='/login' component={LoginScreen} /> 
                          <Route exact path='/register' component={RegisterScreen} /> 
                          <PrivateRoute exact path='/' component={HomeScreen} /> 
                          <PrivateRoute exact path='/wallet' component={WalletScreen} /> 
                          <PrivateRoute exact path='/promote-post' component={PromotePost} /> 
                          <PrivateRoute exact path='/promote-post-summary' component={SummaryPromote} /> 
                          <PrivateRoute exact path='/promotions-insights' component={promotionsInsights} /> 
                          <PrivateRoute exact path='/casting-calls' component={CastingCalls} />  
                          <PrivateRoute path='/settings' component={SettingScreen} />

                      </Switch> 
                  </div> 
                </Router> 
            </div>
        );
    }
    
} 
export default App
 
/*function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}*/
