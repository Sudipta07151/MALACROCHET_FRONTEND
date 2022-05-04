import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorMessage({ message }) {

  return (
    <Snackbar open={true} >
      <Alert severity="error" >
        {message}
      </Alert>
    </Snackbar>
  );
}
