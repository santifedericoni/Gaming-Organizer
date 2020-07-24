import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import getJwt from "../helpers/getJwt";

const AuthBox = props => {
  const [user, setUser] = useState({});

  const getUser = () => {
    // build JWT
    const jwt = getJwt();
    if (!jwt) {
      setUser(null);
      return;
    }
    // check user JWT
    axios
      .get("/api/auth/getUser", { headers: { Authorization: jwt } })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        // remove JWT and redirect to /login
        localStorage.removeItem("jwt-token");
        props.history.push("/login");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  // render
  if (user === undefined) {
    return <div>user undefined</div>;
  }

  return <div>hello</div>;
};

export default withRouter(AuthBox);
