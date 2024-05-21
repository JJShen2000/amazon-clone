import React from "react";
import "./Header.css";
import logo from "../logo.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReactCountryFlag from "react-country-flag";
import cart from "../cart-icon.svg";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="Amazon Logo" />
        <div className="header__location">
          <LocationOnOutlinedIcon className="header__locationIcon" />
          <div className="header__locText">
            <span className="header__locLine1">Delivering to Queens 11361</span>
            <span className="header__optionLine2">Update Location</span>
          </div>
        </div>
      </div>
      <div className="header__fill">
        <div className="header__searchDropdown">
          <p>All</p>
          <ArrowDropDownIcon className="header__searchDropdownIcon" />
        </div>
        <input
          className="header__search"
          type="text"
          placeholder="Search Amazon"
        />
        <SearchSharpIcon className="header__searchIcon" />
      </div>
      <div className="header__right">
        <div className="header__language">
          <ReactCountryFlag countryCode="US" svg />
          <p className="header__optionLine2">EN</p>
          <ArrowDropDownIcon className="header__searchDropdownIcon" />
        </div>
        <div className="header__accountOrder">
          <span className="header__optionLine1">Hello, sign in</span>
          <div className="header__optionLine2">
            <span>Account & Lists</span>
            <ArrowDropDownIcon className="header__searchDropdownIcon" />
          </div>
        </div>
        <div className="header__accountOrder">
          <span className="header__optionLine1">Returns</span>
          <div className="header__optionLine2">
            <span>& Orders</span>
          </div>
        </div>
        <div className="header__cart">
          <div className="header__cartIconCount">
            <img className="header__cartIcon" src={cart} alt="Amazon Cart" />
            <span className="header__cartCount">0</span>
          </div>

          <div className="header__optionLine2">
            <span>Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
