import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./adminsignup.css";

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

export default function AdminSignUp() {
  const classes = useStyles();
  const [userId,setUserId]=useState('');
  const [password,setPassword]=useState('');
  const [adminKey,setadminKey]=useState('');  
  const handleSubmit=(event)=>{
        event.preventDefault();
        const data={userId,password,adminKey}
        console.log('data: ',data);
        setUserId('');
        setPassword('');
        setadminKey('');
    }
  return (
    <div className="admin_form_wrapper" onSubmit={handleSubmit}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="UserID" value={userId} onChange={(event)=>setUserId(event.target.value)}/>
        <TextField id="filled-basic" label="Pasword" variant="standard" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        <TextField id="outlined-basic" label="Admin Key" variant="standard" value={adminKey} onChange={(event)=>setadminKey(event.target.value)} />
        <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              SUBMIT
            </Button>
      </form>
    </div>
  );
}
