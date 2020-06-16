import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider
  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import green from '@material-ui/core/colors/green';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  greenAvatar: {
    margin: 10,
    color: '#1B4D3E',
    backgroundColor: green[200],
  },
}));
    const theme = createMuiTheme({
    palette: {
        primary: {
        main: '#1B4D3E',
        },
        secondary: {
        main: '#1B4D3E',
        },
    },
    });

export default function SignIn() {
  const classes = useStyles();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/user/login`, { form }).then((res) => {
      console.log(res)
      if (res.data.user.length > 0) {
        localStorage.setItem('login', true);
        localStorage.setItem('userName', res.data.user[0].nick_name);
        localStorage.setItem('userId', res.data.user[0].id);
        // window.location = `/ShowCharacterByUser/`;
      } else {
        alert('invalid data');
      }
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SportsEsportsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signIn" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </MuiThemeProvider>
  );
}