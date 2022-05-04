import React from "react";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import { connect } from "react-redux";

function LogininLogoutWrapper({ user }) {
  return (
    <div>
      {(!user || user.login===false) && <LoginComponent />}
      {user && user.login === true && <LogoutComponent />}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.getLoginReducers,
  };
};

export default connect(mapStateToProps, {})(LogininLogoutWrapper);
