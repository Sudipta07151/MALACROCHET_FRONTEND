import React from "react";
import "./footer.css";

export default function FooterComponent({children}) {
  return (
    <div className="wrapper">
      <div className="child">
        <p>Website Designed By: Sudipta Adak</p>
        <p>email: adak07151@gmail.com</p>
      </div>
      <div className="child">
      <p>@malascrochetstore2022 </p>
      {children}
      </div>
    </div>
  );
}
