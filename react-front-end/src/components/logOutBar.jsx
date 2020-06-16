import React from 'react';
import { makeStyles,  createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1B4D3E'
    },
    secondary: {
      main: '#1B4D3E',
    },
  },
});

export default function ButtonAppBar(props) {
  const classes = useStyles();
  console.log(props)

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
            <Link to ='/login' className = 'button'>
              Game Organizer 
            </Link>
            </Typography>
            <Button color="inherit" >
              <Link to ='/login' className = 'button'>
                Login
              </Link>
            </Button>
            <Button color="inherit" >
              <Link to ='/signin' className = 'button'>
                Create an account
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}