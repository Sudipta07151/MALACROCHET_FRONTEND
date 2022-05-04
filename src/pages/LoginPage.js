import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./adminsignup.css";
import { login, databaseUploadStatus } from "../actions";
import { connect } from "react-redux";
import SignUpComponent from "../components/SignUpComponent";
import ErrorMessage from "../components/message/ErrorMessage";
import SuccessMessage from "../components/message/SuccessMessage";

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

function LoginPage({ signUpData, databaseUploadStatus, login, user }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email, password };
    console.log("data: ", data);
    login(data);
    setEmail("");
    setPassword("");
  };
  
  // useEffect(() => {
  //   const email = localStorage.getItem("email");
  //   const password = localStorage.getItem("password");
  //   if (email === null && password === null){
  //     return;
  //   }else{
  //     login({ email, password });
  //   }
  // }, [login]);

  return (
    <div className="admin_form_wrapper" onSubmit={handleSubmit}>
      <h3>LOGIN</h3>
      <form className={classes.root} noValidate autoComplete="off">
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
          LOGIN
        </Button>
      </form>
      {user && user.login === false && (
        <ErrorMessage
          message={user && user.login === false ? user.message_data : ""}
          handleClose={user && user.login === false ? true : false}
        />
      )}
      {user && user.login === true && (
        <SuccessMessage
          message={user && user.login === true ? user.message_data : ""}
        />
      )}
      <SignUpComponent />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    signUpData: state.getAuthenticationReducers,
    user: state.getLoginReducers,
  };
};

export default connect(mapStateToProps, { login, databaseUploadStatus })(
  LoginPage
);
