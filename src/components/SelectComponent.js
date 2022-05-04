import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    border: "2px solid black",
  },
}));

export default function ControlledOpenSelect({ selectFieldDataHandle }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setAge(event.target.value);
    if (selectFieldDataHandle) {
      selectFieldDataHandle(event.target.value);
      return;
    }
    navigate(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">STORE</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={"/"}>All</MenuItem>
          <MenuItem value={"/gifts"}>Gifts</MenuItem>
          <MenuItem value={"/accessories"}>Accessories</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
