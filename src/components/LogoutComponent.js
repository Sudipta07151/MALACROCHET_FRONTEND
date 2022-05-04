import React from "react";
import { Button } from "@material-ui/core";
import { logout } from "../actions";
import { connect } from "react-redux";

function LogoutComponent({logout}) {
  return (
    <div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "orange",
          color: "white",
          fontWeight: "900",
        }}
        onClick={()=>logout()}
      >
        Logout
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    signUpData: state.getAuthenticationReducers,
  };
};

export default connect(mapStateToProps, { logout })(
  LogoutComponent
);



