import React, { useState } from "react";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const MainPage = props => {
  const [resultState, setResultState] = useState({
    description: "",
  });

  const [platformState, setPlatformState] = useState({

  });


  const [loadingState, setLoadingState] = useState(
    {
      loading: true,
    },[]);


  const useStyles = makeStyles(theme => ({
    submit: {
      background: '#1B4D3E',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    },
    title: {
      margin: '0 0 0 30%',
    }
  }));

  const classes = useStyles();


  const platformsSelected = (val) => {
    if (platformState[val.platform.name] === true) {
      setPlatformState({
        ...platformState,
        [val.platform.name]: false,
      })
    } else {

      setPlatformState({
        ...platformState,
        [val.platform.name]: true,
      })
    }
    console.log('test', platformState)
  }

  let handleSubmit = e => {
    console.log('list')
    const data = resultState.data;
    e.preventDefault();
    axios.post(`/api/game/addList`, { data, platformState }).then(res => {

    });
  };

  let handleSubmitWishList = e => {
    console.log('whislist')
    const data = resultState.data;
    e.preventDefault();
    axios.post(`/api/game/addWishList`, { data }).then(res => {

    });
  };

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
  }
  if (loadingState.loading === true) {
    return (
      <Container component="main" maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <div>
            <CircularProgress /><br />
          Loading
        </div>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="md">

        <div>
          <h1 className={classes.title}>{resultState.data.name}</h1><br />
          <img
            width="100%"
            height="10%"
            src={`${resultState.data.background_image}`}
            alt="background"
          />
          <p> {resultState.data.description_raw}</p> <br />
          <div>
            <h1 className={classes.title}>Select your platforms</h1>
          </div>
          <div>
            <Grid container spacing={1}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={2} />
              <Grid item xs={4}>
                {resultState.data.platforms.map(platform => <div key={platform.platform.id}><p> <Checkbox onClick={val => platformsSelected(platform)} /> {platform.platform.name}</p><br /> </div>)}
              </Grid>
            </Grid>
          </div> <br />
          <Container component="main" maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={2} />

              <Grid item xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="default"
                  className={classes.submit}
                  onClick={handleSubmit}
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
                  onClick={handleSubmitWishList}
                >
                  add to wishlist
            </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Container>
    );
  }
};

export default MainPage;
