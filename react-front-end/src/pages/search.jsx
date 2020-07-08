import React, { useState, useEffect } from 'react';
import useDebounce from './use-debounce';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Container, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import green from '@material-ui/core/colors/green';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#064E40',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1B4D3E',
    },
    secondary: {
      main: '#7986cb',
    },
  },
});


export default function app(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
    

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchGame(debouncedSearchTerm).then(results => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );
  return (
  <Container component="main" maxWidth="md">
       <Grid container spacing={3}>
      <Grid item xs={12}> 
        
        </Grid>
        <Grid item xs={2}/>
      <div>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="findgame"
          label="Find a Game"
          name="findGame"
          autoComplete="fGame"
          onChange={e => setSearchTerm(e.target.value)}
        />
        {isSearching && <div> <CircularProgress /></div>}
        {results.map(result => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            <Link to = '/game'>
            <img width="100%" height="55%"
              src={`${result.background_image}`}
              onClick={() => props.setGameState({name:result.slug})}
            />
            </Link><br/>
          </div>
        ))}
      </div>
    </Grid>
  </Container>
  );
}

function searchGame(search) {
  const queryString = `${search}`;
  return fetch(
    `https://api.rawg.io/api/games?search=${queryString}`,
    {
      method: 'GET'
    }
  )
    .then(r => r.json())
    .then(r => r.results)
    .catch(error => {
      console.error(error);
      return [];
    });
}
