import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./adminsignup.css";
import { signup, databaseUploadStatus } from "../actions";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      alignItems: "center",
      justifyConetent: "center",
      color: "green",
    },
  },
}));

function LoginPage({ signUpData, databaseUploadStatus, signup }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email, password, name, isAdmin };
    console.log("data: ", data);
    signup(data);
    setEmail("");
    setPassword("");
    setName("");
  };
  const handleClose = () => {
    setTimeout(() => {
      databaseUploadStatus(null);
    }, 1000);
  };
  return (
    <div className="admin_form_wrapper" onSubmit={handleSubmit}>
      <h3>SIGNUP</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          label="Name"
          variant="standard"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          type="password"
          id="standard-basic"
          label="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          type="password"
          id="filled-basic"
          label="Pasword"
          variant="standard"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" className={classes.button} type="submit">
          SUBMIT
        </Button>
      </form>
      {signUpData && signUpData.upload === false && (
        <Snackbar open={true} onClose={handleClose} autoHideDuration={2000}>
          <Alert onClose={handleClose} severity="error">
            {signUpData.message_data}
          </Alert>
        </Snackbar>
      )}
      {signUpData && signUpData.upload === true && (
        <Snackbar
          message={signUpData.message_data}
          open={true}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert onClose={handleClose} severity="success">
            {signUpData.message_data}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    signUpData: state.getAuthenticationReducers,
  };
};

export default connect(mapStateToProps, { signup, databaseUploadStatus })(
  LoginPage
);
