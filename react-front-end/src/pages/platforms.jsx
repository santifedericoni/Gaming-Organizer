import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    PS4: "",
    Xbox_one: "",
    Switch: "",
    PC: "",
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { PS4, Xbox_one, Switch, PC } = state;
  // const error = [PS4, Xbox_one, Switch, PC].filter((v) => v).length !== 2;

  console.log("props platforms", state);
  if (props.userState) {
    if (props.userState.login === true) {
      return (
        <Container>
          <div className={classes.root}>
            <Grid item xs={3} />

            <Grid item xs={3}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select your Plarforms</FormLabel>
                <FormGroup>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={PS4}
                          onChange={handleChange}
                          name="PS4"
                        />
                      }
                      label="PS4"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Xbox_one}
                          onChange={handleChange}
                          name="Xbox_one"
                        />
                      }
                      label="Xbox one"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Switch}
                          onChange={handleChange}
                          name="Switch"
                        />
                      }
                      label="Switch"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={PC}
                          onChange={handleChange}
                          name="PC"
                        />
                      }
                      label="PC"
                    />
                  </Grid>
                </FormGroup>
              </FormControl>
            </Grid>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </Container>
      );
    } else {
      return <h1>you have to login</h1>;
    }
  } else {
    return <h1>you have to login</h1>;
  }
}
