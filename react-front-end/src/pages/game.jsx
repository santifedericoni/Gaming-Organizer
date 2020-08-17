import React, { useState } from "react";
import axios from "axios";
import EditGame from "./editGame"; 
import AddGames from "./addGames";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Container,
  Grid,
} from "@material-ui/core";
export default function MainPage(props) {

  const [loadingState, setLoadingState] = useState(
    {
      loading: true,
    },
    []
  );

  const [isNewState, setIsNew] = useState(
    {
      new: false,
    },
    []
  );
//here when i get if the game is new or not, i should get the platforms in case is an edit
  const isNew = () => {
    let gameData = props.gameState;
    let userId = props.userState.userId
    return axios
      .post(`/api/game/`, {gameData, userId})
      .then (res => {
        if (res.data.data.rows.length === 0){
          setIsNew({
            new:true
          })
        } else {
          setIsNew({
            new:false
          })
        }
        setLoadingState({
          loading: false,
        });
      })
  }
  if (loadingState === true){
    isNew()
  }
  if (loadingState === true){
    return (
      <Container component="main" maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <div>
            <CircularProgress />
            <br />
            Loading
          </div>
        </Grid>
      </Container>
    );

  } else if (isNewState.new === false){
    isNew()
        return (
          <EditGame game={props.gameState.name}
          userState={props.userState}
          setUserState={props.setUserState}
          />
        ) 
      } else {
        return (
          <AddGames game={props.gameState.name}
          userState={props.userState}
          setUserState={props.setUserState}/>
        )
      }
}
