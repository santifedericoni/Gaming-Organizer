import React from "react";
import LogOutBar from "./logOutBar";
import LogInBar from "./logInBar";

import "../App.css";

export default function ButtonAppBar(props) {
  if (props.userState.login === false) {
    return <LogOutBar props={props} />;
  } else {
    return <LogInBar props={props} />;
  }
}
