import React from "react";
import "./Nav.css";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const navOptions = [
    "Today's Deals",
    "Customer Service",
    "Registry",
    "Gift Cards",
    "Sell",
  ];
  return (
    <div className="nav">
      <div className="nav__menu">
        <MenuIcon style={{ color: "white" }} />
        <span className="nav__menuTitle">All</span>
      </div>
      {navOptions.map((option, index) => (
        <div className="nav__option" key={index}>
          <span className="nav__optionTitle">{option}</span>
        </div>
      ))}
    </div>
  );
}

export default Nav;
