import React from 'react';
import cookie from 'react-cookies';
import {Route, Redirect} from 'react-router-dom';

export default function SecuredRoute(props) {
    const { component: Component, path } = props;
    return (
      <Route
        path={path}
        render={() => {
          // document.cookie = 'loggedInUser=';

          // console.log(document.cookie.split('=')[1]);
          const token = cookie.load('token') || '';

          // if(token) {
            return <Component />;
          // } else {
          //   return <Redirect to="/login" />;
          // }
        }}
      />
    );
}