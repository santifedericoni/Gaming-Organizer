import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import getJwt from "../helpers/getJwt";

const AuthBox = props => {
  const [user, setUser] = useState({});

  const getUser = () => {
    const jwt = getJwt();
    console.log("jwt Authbox: ", jwt);
    if (!jwt) {
      setUser(null);
      return;
    }
    axios
      .get("/api/auth/getUser", { headers: { Authorization: jwt } })
      .then(res => {
        console.log("getUser: ", res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.log("err, ", err);
        localStorage.removeItem("jwt-token");
        props.history.push("/login");
      });
  };

  useEffect(() => {
    getUser();
  }, []);


  if (user === undefined) {
    return (<div>user undefined</div>);
  }

  return <div>hello</div>;
}

export default withRouter(AuthBox);
