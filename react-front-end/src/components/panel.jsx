import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: 700,
  },
}));

export default function SimpleExpansionPanel(props) {
  const deleteGame = (val) => {

    axios.post(`/api/game/delete`, { val })
    .then((res) => {
  });
  window.location = `/ShowCharacterByUser`
  }
  const classes = useStyles();
  if (props.gameState[0]){
    return (
      <div className={classes.root}>
        {props.gameState[0].map((row) => (
              <ExpansionPanel key= {row.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
          {/* <img src={row.photo} width="10%" height="3%"></img> */}
          <Avatar alt="Remy Sharp" src={row.photo} />
          <Typography className={classes.heading}>{row.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid item xs={2}>
            </Grid>
            <p>Description: {row.description}</p><br/>
            <Grid item xs={3}>
            <Typography variant="body2" color="textSecondary" align="center">
              <Button>
                <Link color="inherit" to={'/editGame/'}>
                  Edit Game
                </Link>
              </Button>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              <Button onClick ={(event) => deleteGame(row.id)}>
                Delete
              </Button>
            </Typography>
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        ))}
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <p>Loading</p>
        <CircularProgress />
       </div>
    )
  }
}