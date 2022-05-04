import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { connect } from "react-redux";
import { placeOrder } from "../../actions";
import { startLoaderForOrder } from "../../actions";
import BackDrop from "../BackDrop";
import ErrorMessage from "../../components/message/ErrorMessage";
import SuccessMessage from "../../components/message/SuccessMessage";
import { clearBag } from "../../actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        malacrochet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function Checkout({
  bagListData,
  placeOrder,
  user,
  startLoaderForOrder,
  orderDetails,
}) {
  // const steps = ["Shipping address", "Payment details", "Review your order"];
  const steps = ["Shipping address", "Review your order"];
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleNextTrigger={handleNext} />;
      // case 1:
      //   return <PaymentForm handleNextTrigger={handleNext} />;
      case 1:
        return (
          <Review
            handleNextTrigger={handleNextReview}
            addressData={addressFormData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressFormData, setAddressFormData] = React.useState({});
  const handleNext = (obj) => {
    console.log(obj);
    setAddressFormData(obj);
    setActiveStep(activeStep + 1);
  };
  const handleNextReview = () => {
    console.log("called");
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handlePlaceOrder = () => {
    startLoaderForOrder();
    setShow(true);
    setActiveStep(activeStep + 1);
    const userId = JSON.parse(user.login_data).id.$oid;
    placeOrder(addressFormData, bagListData, userId);
    if (orderDetails && orderDetails.upload === true) {
      clearBag();
    }
    //console.log("PLACE ORDER",userId);
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, [orderDetails.loader]);
  return (
    <React.Fragment>
      {orderDetails.loader === true && <BackDrop />}
      {orderDetails != null && orderDetails.upload === false && show && (
        <ErrorMessage message={orderDetails.message_data} />
      )}
      {orderDetails != null && orderDetails.upload === true && show && (
        <SuccessMessage message={orderDetails.message_data} />
      )}
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          {activeStep === steps.length - 1 && (
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          <React.Fragment>
            {activeStep === steps.length + 1 &&
            orderDetails.loader === false &&
            orderDetails.upload === true ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is{" "}
                  {orderDetails ? orderDetails.orderid : ""}. We have emailed
                  your order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep < steps.length ? getStepContent(activeStep) : ""}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePlaceOrder}
                      className={classes.button}
                    >
                      {activeStep === steps.length ? "Place order" : ""}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    bagListData: state.getBagListReducers,
    user: state.getLoginReducers,
    orderDetails: state.getPlacedOrderReducers,
  };
};

export default connect(mapStateToProps, { placeOrder, startLoaderForOrder })(
  Checkout
);
