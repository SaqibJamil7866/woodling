import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Sidebar from './components/common/sidebar.component';
import { Navigation } from './components/common/base.component';
import './App.css';
import LoginComponent from './components/authenticate/login.component';
import SecuredRoute from './components/authenticate/secure.component';
import Home from './components/home.component';
import ExploreHome from './components/explore_home.component';
import SearchTalent from './components/search_talent.component';
import history from './public/history';
import CastingCalls from './components/casting_calls.component';
import Profile from './components/profile.component';
import PostedCallsAndSubmissions from './components/posted_calls-and-my_submissions';
import PostingCallsForm from './components/posting-calls-form.component';
import MarketPlace from './components/market_place.component';
import Trending from './components/trending.component';
import Settings from './components/setting.component';
import Wallet from './components/wallet.component';
import paymentoptions from './components/payment_options.component';
import Search from './components/search.component';
import Chat from './components/chat.component';
import MyProfile from './components/my-profile.component';
import Terms from './components/terms.component';
import PromotionScreen from './components/promotion.component';
import InsightScreen from './components/insight.component';

function Main(props) {
  return (
    <div className="h100p" style={{ overflowY: 'hidden' }}>
      <Navigation />
      <aside className="left-side h90 float-left">
        <Sidebar />
      </aside>
      <aside className="right-side h90">
        <Switch>
          <SecuredRoute path="/explore_home" component={ExploreHome} />
          <SecuredRoute path="/home" component={Home} />
          <SecuredRoute exact path="/casting_calls" component={CastingCalls} />
          <SecuredRoute
            exact
            path={[
              '/casting_calls/posted_calls',
              '/casting_calls/my_submission',
            ]}
            component={PostedCallsAndSubmissions}
          />
          <SecuredRoute
            exact
            path="/casting_calls/post-a-casting-calls"
            component={PostingCallsForm}
          />
          <SecuredRoute path="/search_talent" component={SearchTalent} />
          <SecuredRoute path="/user_profile" component={Profile} />
          <SecuredRoute path="/market_place" component={MarketPlace} />
          <SecuredRoute path="/trending" component={Trending} />
          <SecuredRoute path="/settings" component={Settings} />
          <SecuredRoute path="/wallet" component={Wallet} />
          <SecuredRoute path="/paymentoptions" component={paymentoptions} />
          <SecuredRoute path="/search" component={Search} />
          <SecuredRoute path="/chat" component={Chat} />
          <SecuredRoute path="/my_profile" component={MyProfile} />
          <SecuredRoute path="/promotion/:id" component={PromotionScreen} />
          <SecuredRoute path="/insight/:id" component={InsightScreen} />
        </Switch>
      </aside>
    </div>
  );
}

function App() {
  axios.interceptors.request.use(
    function (config) {
      const token = cookie.load('token');
      // Do something before request is sent
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

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
          <Route path={['/', '/login']} exact component={LoginComponent} />
          {/* <Route path="/signup" exact component={Register} /> */}
          <Route component={Main} />
          <Route path="/terms" exact component={Terms} />
        </Switch>
      </Router>
      <ToastsContainer store={ToastsStore} />
    </>
  );
}

export default App;
