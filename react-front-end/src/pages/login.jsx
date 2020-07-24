import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import green from "@material-ui/core/colors/green";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Profile from "./profile";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#064E40",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  greenAvatar: {
    margin: 10,
    color: "#1B4D3E",
    backgroundColor: green[200],
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1B4D3E",
    },
    secondary: {
      main: "#1B4D3E",
    },
  },
});

const SignIn = props => {
  const classes = useStyles();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = e => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      return alert("please enter your email and password");
    }

    axios
      .post(`/api/auth/getToken`, form)
      .then(res => {
        localStorage.setItem("jwt-token", res.data);
        props.history.push("/protected");
      })
      .catch(err => {
        alert(err, "invalid email or password");
        localStorage.removeItem("jwt-token");
        props.history.push("/login");
      });
  };

  if (props.userState) {
    if (props.userState.login === false) {
      return (
        <MuiThemeProvider theme={theme}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <SportsEsportsIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to='/signIn' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </MuiThemeProvider>
      );
    } else {
      return <Profile props={props} />;
    }
  } else {
    return <h1>loading</h1>;
  }
};

export default withRouter(SignIn);
