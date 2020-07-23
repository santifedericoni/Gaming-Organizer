import React, { useState, useEffect, Component } from "react";
import axios from "axios";

export default function AuthComponent(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt-token");
    if (!jwt) {
      props.history.push("/login");
    }

    axios
      .get("/getUser", { headers: { Authorization: `Bearer ${jwt}` } })
      .then(res => setUser(res.data))
      .catch(err => props.history.push("/login"));
  }, []);

  return (
    <Component>Successfully Authenticated</Component>
  );
}
