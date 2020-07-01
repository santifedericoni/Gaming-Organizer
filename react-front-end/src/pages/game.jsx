import React, { useState } from "react";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";

const MainPage = props => {
  const [resultState, setResultState] = useState({
    description: "",
  });

  const [loadingState, setLoadingState] = useState(
    {
      loading: true,
    },
    []
  );
  const getGame = () => {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api.rawg.io/api/games/${props.gameState.name}`;
    fetch(proxyUrl + targetUrl)
      .then(blob => blob.json())
      .then(data => {
        setResultState({
          data: data,
        });
        setLoadingState({
          loading: false,
        });
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  };
  if (loadingState.loading === true) {
    getGame();
  } else {
  }

  if (loadingState.loading === true) {
    return (
      <Container>
        <div>
          <CircularProgress />
          Game info
        </div>
      </Container>
    );
  } else {
    return (
      <div>
        <img
          width="10%"
          height="10%"
          src={`${resultState.data.background_image}`}
          alt="background"
        />
        <br />
        {resultState.data.description}
        {resultState.data.platforms.map(gameData => (
          <div key={gameData.id}>
            <p>
              {" "}
              <Checkbox /> {gameData.platform.name}
            </p>
            <br />{" "}
          </div>
        ))}
      </div>
    );
  }
};

export default MainPage;
