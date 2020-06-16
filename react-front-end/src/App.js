import React from 'react';
import './App.css';
import MainPage from './pages/home';
import Login from './pages/login'
import SignIn from './pages/signIn'
import Profile from './pages/profile'

import AppBar from './components/navbar'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

export default function App (){


    return (
      <Router>
      <AppBar />
      <body >
        <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login"> <Login /></Route>
        <Route exact path="/signIn"> <SignIn /></Route>
        <Route exact path="/profile"> <Profile /></Route>
      </Switch>
      </body>
    </Router>
  );
}
