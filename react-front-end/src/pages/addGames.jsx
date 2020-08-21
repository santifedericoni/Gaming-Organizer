import React, { useState } from "react";
import {
  Container,
  Checkbox,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainPage(props) {
  const [resultState, setResultState] = useState({
    description: "",
  });
  const [platforms, setPlatforms] = useState([]);
  const [isValid, setValid] = useState(false);
  const [loadingState, setLoadingState] = useState(
    {
      loading: true,
    },
    []
  );

  const useStyles = makeStyles(theme => ({
    submit: {
      background: "#1B4D3E",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
    },
    title: {
      margin: "0 0 0 30%",
    },
  }));

  const classes = useStyles();

  const handleCheck = e => {
    const platformName = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setPlatforms([...platforms, platformName]);
      setValid(true);
    } else {
      for (const name of platforms) {
        if (platformName === name) {
          const index = platforms.indexOf(platformName);
          if (index > -1) {
            platforms.splice(index, 1);
          }
          if (platforms.length === 0) {
            setValid(false);
          }
          break;
        }
      }
    }
  };

  const handleSubmit = e => {
    const data = resultState.data;
    const userId = props.userState.userId
    e.preventDefault();

    if (!isValid) {
      alert("Please select at least one platform to be added.");
    } else {
      axios.post(`/api/game/addList`, { data, platforms, userId }).then(res => {});
    }
  };


  const getGame = () => {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api.rawg.io/api/games/${props.game}`;
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
          <Grid item xs={12}></Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <div>
            <CircularProgress />
            <br />
            Loading
          </div>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="md">
        <div>
          <h1 className={classes.title}>{resultState.data.name}</h1>
          <br />
          <img
            width="100%"
            height="10%"
            src={`${resultState.data.background_image}`}
            alt="background"
          />
          <p> {resultState.data.description_raw}</p> <br />
          <div>
            <h1 className={classes.title}>Select your platform</h1>
          </div>
          <div>
            <Grid container spacing={1}>
              <Grid item xs={12}></Grid>
              <Grid item xs={2} />
              <Grid item xs={2} />
              <Grid item xs={4}>
                {resultState.data.platforms.map(platform => (
                  <div key={platform.platform.id}>
                    <p>
                      <Checkbox
                        onChange={handleCheck}
                        name={platform.platform.name}
                      />
                      {platform.platform.name}
                    </p>
                    <br />
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
          <br />
          <Container component="main" maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={2} />

              <Grid item xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="default"
                  className={classes.submit}
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Add Game
                </Button>
              </Grid>
              <Link to='/search'>
              <Button className='button' color='inherit'>
                Back to Search
              </Button>
            </Link>
            </Grid>
          </Container>
        </div>
      </Container>
    );
  }
}
