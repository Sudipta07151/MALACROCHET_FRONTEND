import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm({ handleNextTrigger }) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setStateName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const handleNext = () => {
    if (
      fname !== "" &&
      lname !== "" &&
      address !== "" &&
      city !== "" &&
      phone.length === 10 &&
      phone !== "" &&
      landmark !== "" &&
      pin !== "" &&
      state !== ""
    ) {
      const addressObj = {
        fname,
        lname,
        address,
        phone,
        city,
        landmark,
        state,
        pin
      };
      handleNextTrigger(addressObj);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={fname}
            onChange={(event) => setfname(event.target.value)}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => setlname(event.target.value)}
            value={lname}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setAddress(event.target.value)}
            value={address}
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setLandmark(event.target.value)}
            value={landmark}
            id="landmark"
            name="landmark"
            label="Nearest Landmark"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => setCity(event.target.value)}
            value={city}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => setStateName(event.target.value)}
            value={state}
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => setPin(event.target.value)}
            required
            value={pin}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      <button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className="addtobag"
      >
        Next
      </button>
    </React.Fragment>
  );
}
