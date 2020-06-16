import React from 'react';
import '../App.css';
import Log_out_bar from './logOutBar'
import Log_in_bar from './logInBar'



export default function ButtonAppBar() {
  if (localStorage.getItem('login') !== 'true') {
  return (
    <Log_out_bar/>
  );
  }
  else {
    return (
      <Log_in_bar/>
    )
  }
}