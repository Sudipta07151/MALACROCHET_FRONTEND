import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import uploadEndpoint from "../api/uploadEndpoint";

import { dataUploadAction } from "../actions";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import Button from "@material-ui/core/Button";
import "./inputComponent.css";

import Loader from "./Loader";
import SelectComponent from "./SelectComponent";

import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
    backgroundColor: "yellowgreen",
    color: "white",
    fontWeight: 700,
  },
  buttonsigninadmin: {
    display: "block",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "yellow",
    color: "black",
    fontWeight: 700,
  },
}));

function InputComponent() {
  const classes = useStyles();
  const [uploadFile, setUploadFile] = useState(null);
  //const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSelectedFile = (event) => {
    setUploadFile(event.target.files[0]);
  };

  // const handleNameInput = (event) => {
  //   setName(event.target.value);
  // };

  // const handleTagInput = (event) => {
  //   setTag(event.target.value);
  // };

  const selectFieldDataHandle = (value_passed) => {
    console.log("value_passed: ", value_passed);
    value_passed = value_passed.substr(1);
    setTag(value_passed);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    console.log(uploadFile);
    formData.append("file", uploadFile);
    // formData.append("name", name);
    formData.append("tag", tag);
    setError(false);
    setSuccess(false);
    setLoader(true);
    try {
      setError(false);
      const response = await uploadEndpoint.post("/upload", formData);
      setSuccess(true);
      setLoader(false);
      console.log("Upload Response:", response);
      dataUploadAction({ url: response.data.data, tag: tag });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(true);
      setSuccess(false);
      setLoader(false);
      console.log(err);
    }
  };
  const handleClose = () => {
    setError(false);
    setSuccess(false);
  };
  const handleAdminPage = () => {
    navigate("/admin");
  };

  return (
    <div>
      {/* <h1>InputComponent</h1> */}
      <div className="input_wrapper">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <input type="file" onChange={handleSelectedFile} />
          </Grid>
          {/* <Grid item xs={12}>
            <input
              type="text"
              onChange={handleNameInput}
              value={name}
              placeholder="Name"
            />
          </Grid> */}
          {/* <Grid item xs={12}>
            <input
              type="text"
              onChange={handleTagInput}
              value={tag}
              placeholder="Tag"
            />
          </Grid> */}
          <Grid item xs={12}>
            <SelectComponent selectFieldDataHandle={selectFieldDataHandle} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleUpload}
              className={classes.button}
            >
              UPLOAD
            </Button>
          </Grid>
        </Grid>
        {loader && <Loader />}
      </div>
      {error && (
        <Snackbar
          message="Failed Uploading!"
          open={true}
          onClose={handleClose}
          autoHideDuration={2000}
        />
      )}
      {success && (
        <Snackbar
          message="Successfully Uploaded"
          open={true}
          onClose={handleClose}
          autoHideDuration={2000}
        />
      )}
      <Button
        variant="contained"
        onClick={handleAdminPage}
        className={classes.buttonsigninadmin}
      >
        ADMIN SIGN UP
      </Button>
    </div>
  );
}

export default connect(null, { dataUploadAction })(InputComponent);
