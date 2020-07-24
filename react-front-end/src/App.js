import React, { useState } from "react";
import "./App.css";
import MainPage from "./pages/home";
import Login from "./pages/login";
import SignIn from "./pages/signIn";
import Profile from "./pages/profile";
import Platforms from "./pages/platforms";
import Games from "./pages/addGames";
import Search from "./pages/search";
import Game from "./pages/game";
import Protected from "./components/Protected";

import AppBar from "./components/navbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthBox from "./components/Authbox";

export default function App() {
  const [userState, setUserState] = useState({
    name: "",
    lastName: "",
    userId: 0,
    login: false,
    mail: "",
  });

  const [gameState, setGameState] = useState({
    name: "",
  });

  const [gameSearch, setGameSearch] = useState({
    name: "",
  });

  return (
    <Router>
      <AppBar userState={userState} setUserState={setUserState} />
      {/* <body > */}
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/login'>
          <Login userState={userState} setUserState={setUserState} />
        </Route>
        <Route exact path='/signIn'>
          <SignIn userState={userState} setUserState={setUserState} />
        </Route>
        <Route exact path='/profile'>
          <Profile userState={userState} setUserState={setUserState} />
        </Route>
        <Route exact path='/platforms'>
          <Platforms userState={userState} setUserState={setUserState} />
        </Route>
        <Route exact path='/games'>
          <Games userState={userState} setUserState={setUserState} />
        </Route>
        <Route exact path='/search'>
          <Search
            userState={userState}
            setUserState={setUserState}
            gameState={gameState}
            setGameState={setGameState}
            gameSearch={gameSearch}
            setGameSearch={setGameSearch}
          />
        </Route>
        <Route exact path='/game'>
          <Game
            userState={userState}
            setUserState={setUserState}
            gameState={gameState}
            setGameState={setGameState}
            gameSearch={gameSearch}
            setGameSearch={setGameSearch}
          />
        </Route>
        <AuthBox>
          <Route path='/protected' component={Protected} />
        </AuthBox>
      </Switch>
      {/* </body> */}
    </Router>
  );
}
