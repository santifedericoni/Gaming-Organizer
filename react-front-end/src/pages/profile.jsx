import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import Profile from './profile'

import {
  BrowserRouter as Router,
  Link,
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  redAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[200],
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
export default function SignUp(props) {
  const classes = useStyles();
  console.log('profile props',props.props.userState)
  const [form, setForm] = React.useState({
    name: props.props.userState.name,
    lastName: props.props.userState.lastName,
    email: props.props.userState.mail,
    password: '',
  });

  let save = (e) => {
    e.preventDefault();
    axios.post(`/api/user/login`, { form }).then((res) => {
        if (form.name === '' || form.lastName === '' || form.email === '' || form.password === '' ){
          alert ('all values are requieres')
        }
        else {
        axios.post(`/api/user/${props.props.userState.userId}`, { form }).then((res) => {
          if (res.status === 500){
            alert ('error')
          }
          else {
            props.props.setUserState({
              userId: res.data.user[0].id,
              login:true,
              mail:res.data.user[0].email,
            })
          }
        });
      }
    })
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
              Edit Profile
            </Typography>
            <form className={classes.form} noValidate onSubmit={save}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </form>
          </div>

        </Container>
        </MuiThemeProvider>
      );
    }
