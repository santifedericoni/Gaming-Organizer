import React, { useState } from "react";
import axios from "axios";
import EditGame from "./editGame"; 
import AddGames from "./addGames";

export default function MainPage(props) {


let loading = true
  const isNew = () => {
    let gameData = props.gameState;
    let userId = props.userState.userId
    return axios
      .post(`/api/game/`, {gameData, userId})
      .then (res => {
        if (res.data.data.rows.length == 0){
          loading = false
          return false
        } else {
          loading = false
          return true
        }
      })
  }
console.log(loading, 'loading')
isNew()
  if (loading === true){
    isNew()
    return (
    <p>loading </p>
    )
  }else if (!isNew()){
        return (
          <EditGame game={props.gameState.name}/>
        ) 
      } else {
        return (
          <AddGames game={props.gameState.name}/>
        )
      }
}
