import React from 'react';
import '../App.css';
import Log_out_bar from './logOutBar'
import Log_in_bar from './logInBar'



export default function ButtonAppBar(props) {
  if (props.userState.login === false) {
  return (
    <Log_out_bar props={props}/>
  );
  }
  else {
    return (
      <Log_in_bar props={props}/>
    )
  }
}