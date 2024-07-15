import React from "react";
import { Link } from "react-router-dom";

import "./AuthContainer.css";

const AuthContainer = ({ children }) => {
  const logoAmazonClone = process.env.PUBLIC_URL + "/logo-amazon-clone-black.png";

  return (
    <div>
      <Link to="/">
        <img
          className="authContainer__logo"
          src={logoAmazonClone}
          alt="Amazon Clone Logo"
        />
      </Link>
      <div className="authContainer">{children}</div>
    </div>
  );
};

export default AuthContainer;
