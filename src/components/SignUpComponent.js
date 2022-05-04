import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "900",
        }}
        onClick={() => navigate("/signup")}
      >
        SIGNUP
      </Button>
    </div>
  );
}
