import React, { useState } from "react";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles} from "@material-ui/core/styles";

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
  

  const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  const classes = useStyles();

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
      <Container component="main" maxWidth="md">
        <div>
          <CircularProgress />
          Game info
        </div>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="md">

      <div>
        <h1>{resultState.data.name}</h1><br/>
        <img
          width="100%"
          height="10%"
          src={`${resultState.data.background_image}`}
          alt="background"
        />
       <p> {resultState.data.description_raw}</p>
       <Container component="main" maxWidth="md">
       <Grid container spacing={3}>
      <Grid item xs={12}> 
        
        </Grid>
        <Grid item xs={2}/>

          <Grid item xs={4}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
          >
            add to list
        </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
            >
              add to wishlist
            </Button>  
          </Grid>
  </Grid>

      </Container>
     
                {/* {resultState.data.platforms.map(gameData => (
          <div key={gameData.id}>
            <p>
              <Checkbox /> {gameData.platform.name}
            </p>
            <br />
          </div>
        ))} */}
      </div>

      </Container>
    );
  }
};

export default MainPage;
