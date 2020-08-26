import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyDVnDBLIWf0RXyE8_QjYkOAOpxLUnetAOw",
  authDomain: "woodlig-main.firebaseapp.com",
  databaseURL: "https://woodlig-main.firebaseio.com",
  projectId: "woodlig-main",
  storageBucket: "woodlig-main.appspot.com",
  messagingSenderId: "184301478703",
  appId: "1:184301478703:web:2dd4f77242cce3854877da",
  measurementId: "G-3HB356CBWB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
