import React from "react";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
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
      main: "#1B4D3E",
    },
    secondary: {
      main: "#1B4D3E",
    },
  },
});

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let handleSubmit = e => {
    e.preventDefault();

    axios
      .get(`/auth/logout`)
      .then(res => {
        props.props.setUserState({
          userId: 0,
          login: false,
          mail: "",
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <FormGroup></FormGroup>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Game Organizer
            </Typography>
            <Link to='/platforms'>
              <Button className='button' color='inherit'>
                Add Platforms
              </Button>
            </Link>
            <Link to='/mygames'>
              <Button className='button' color='inherit'>
                MyGames
              </Button>
            </Link>
            <Link to='/search' className='button'>
              <Button color='inherit'>search</Button>
            </Link>
            {auth && (
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  {/* {props.props.userState.mail} */}
                  <AccountCircle />
                </IconButton>
                <Link to='/logout' className='button'>
                  <Button color='inherit' onClick={handleSubmit}>
                    Logout
                  </Button>
                </Link>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to='/profile'>Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}
