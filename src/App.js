import React, { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";

import GiftsPage from "./pages/GiftsPage";
import InputComponent from "./components/InputComponent";
import SwitchComponent from "./components/SwitchComponent";
import FooterComponent from "./components/FooterComponent";
import SelectComponent from "./components/SelectComponent";
import AdminSignUp from "./pages/AdminSignUp";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Checkout from "./components/order/Checkout";
import CustomizedBadges from "./components/CustomizedBadge";
import AccessoriesPage from "./pages/AccessoriesPage";
import SignleItemPage from "./pages/SignleItemPage";
import WishListPage from "./pages/WishListPage";
import BagPage from "./pages/BagPage";

import LoginLogoutWrapper from "./components/LoginLogoutWrapper";
import { login } from "./actions";
//import LoginComponent from "./components/LoginComponent";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { connect } from "react-redux";

import logoimage from "./assets/logostore.png";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import "./app.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    opacity: 1,
    // background:
    //   "radial-gradient(circle, transparent 20%, #f4ff41 20%, #f4ff81 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #fffbdf 20%, #fffbdf 80%, transparent 80%, transparent) 10px 10px, linear-gradient(#b3f026 0.8px, transparent 0.8px) 0 -0.4px, linear-gradient(90deg, #b3f026 0.8px, #fffbdf 0.8px) -0.4px 0",
    // backgroundSize: "20px 20px, 20px 20px, 10px 10px, 10px 10px",
    //backgroundImage: "linear-gradient(to bottom right, #F172A2, #E64391)",
    backgroundColor: "#f8f8f9",
  },
});
const App = ({ login, wishListData, bagListData }) => {
  // console.log(process.env.NODE_ENV);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email === null && password === null) {
      return;
    } else {
      login({ email, password });
    }
  }, [login]);

  const classes = useStyles();
  const [showInputComponent, setShowInputComponent] = useState(false);
  const showInputComponentHandle = (value) => {
    setShowInputComponent(value);
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment id="AppMain">
      <CssBaseline />
      <BrowserRouter>
        <Container
          maxWidth="lg"
          align="center"
          className={classes.root}
          maxWidth={false}
        >
          <div className="navbar">
            <div>
              <Link to="/" onClick={handleScrollToTop} className="homelogo">
                Mala's
              </Link>
            </div>
            <div className="right_elements">
              <div className="buy_love_wrapper">
                <div>
                  <Link
                    to="/wishlist"
                    onClick={handleScrollToTop}
                    className="homelogo"
                  >
                    <CustomizedBadges count={wishListData.length}>
                      <LoyaltyIcon style={{ color: "white" }} />
                    </CustomizedBadges>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/bagpage"
                    onClick={handleScrollToTop}
                    className="homelogo"
                  >
                    <CustomizedBadges count={bagListData.length}>
                      <ShoppingCartIcon style={{ color: "white" }} />
                    </CustomizedBadges>
                  </Link>
                </div>
              </div>
              <LoginLogoutWrapper />
            </div>
          </div>
          <div className="logoimage_wrapper">
            <img src={logoimage} alt="logo"></img>
          </div>
          <div className="select_component">
            <SelectComponent />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gifts" element={<GiftsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route
              path="/upload"
              element={showInputComponent && <InputComponent />}
            />
            <Route path="/admin" element={<AdminSignUp />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="gifts/item/:oid" element={<SignleItemPage />} />
            <Route path="/item/:oid" element={<SignleItemPage />} />
            <Route path="accessories/item/:oid" element={<SignleItemPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/bagpage" element={<BagPage />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/*" element={<Navigate to="/" />} /> */}
          </Routes>
          <FooterComponent>
            <SwitchComponent showInputComponent={showInputComponentHandle} />
          </FooterComponent>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    wishListData: state.getWishlistReducers,
    bagListData: state.getBagListReducers,
  };
};

export default connect(mapStateToProps, { login })(App);
