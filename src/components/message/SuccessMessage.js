import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function SuccessMessage({ message }) {
  return (
    <Snackbar open={true} >
      <Alert severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}
