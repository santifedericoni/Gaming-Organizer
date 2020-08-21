import React, {useEffect , useState} from 'react';
import ExpansionPanel from '../components/panel';
import Button from '../components/addButton';
import { Container } from '@material-ui/core';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

const MyGames = (props) => {

  const [gameState , setGameState] = React.useState([])
  const getCharacterById = () => {
    axios.get(`/api/game/user` )
      .then((response) => {
        setGameState({
          ...gameState,
          ...[response.data.data.rows],
        });
      })
    }
    useEffect(() => {
      getCharacterById();
    }, []);
  return (
    <div className="App">
        <Container>
        <h4>View your Games, or create a new one! </h4>
          <ExpansionPanel gameState = {gameState} setGameState = {setGameState} />
         <Link to="/search" > <Button>Link</Button> </Link>
        </Container>
    </div>
  );
};

export default MyGames;