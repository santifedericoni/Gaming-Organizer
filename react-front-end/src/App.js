import React, { useEffect, useState } from 'react';
import './App.css';
import MainPage from './pages/home';
import Login from './pages/login'
import SignIn from './pages/signIn'
import Profile from './pages/profile'
import Platforms from './pages/platforms'
import Games from './pages/addGames'
import Search from './pages/search'
import Game from './pages/game'

import AppBar from './components/navbar'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

export default function App (){
  const [userState, setUserState] = useState({
    name: '',
    lastName:'',
    userId:0,
    login:false,
    mail:'',
  });

  const [gameState, setGameState] = useState({
    name: 'monkey-island-2-lechucks-revenge',
  });

    return (
      <Router>
      <AppBar userState={userState} setUserState={setUserState} />
      <body >
        <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login"> <Login userState={userState} setUserState={setUserState}/></Route>
        <Route exact path="/signIn"> <SignIn userState={userState} setUserState={setUserState}/></Route>
        <Route exact path="/profile"> <Profile userState={userState} setUserState={setUserState}/></Route>
        <Route exact path="/platforms"> <Platforms userState={userState} setUserState={setUserState}/></Route>
        <Route exact path="/games"> <Games userState={userState} setUserState={setUserState}/></Route>
        <Route exact path="/search"> <Search userState={userState} setUserState={setUserState} gameState={gameState} setGameState={setGameState}/></Route>
        <Route exact path="/game"> <Game userState={userState} setUserState={setUserState} gameState={gameState} setGameState={setGameState}/></Route>


      </Switch>
      </body>
    </Router>
  );
}
