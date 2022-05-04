import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function Review({ bagListData, addressData, handleNextTrigger }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {bagListData.map((product, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={product._oid} />
            {/* <Typography variant="body2">{product.price}</Typography> */}
            <div>
              <img
                src={product.image_url}
                alt="img"
                className="wishlist_image"
              />
            </div>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          {/* <ListItemText primary="Total" /> */}
          {/* <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography> */}
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {addressData.fname} {addressData.lname}
          </Typography>
          <Typography gutterBottom>
            {addressData.city},{addressData.pin},{addressData.state}{" "}
            {addressData.landmark}
          </Typography>
          <Typography gutterBottom>{addressData.address}</Typography>
          <Typography gutterBottom>{addressData.phone}</Typography>
        </Grid>
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
        <Grid>
          <button
            variant="contained"
            color="primary"
            onClick={() => handleNextTrigger()}
            className="addtobag"
          >
            Next
          </button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    bagListData: state.getBagListReducers,
  };
};

export default connect(mapStateToProps, {})(Review);
