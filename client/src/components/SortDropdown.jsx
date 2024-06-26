import React from "react";
import Select from "react-select";

import useUrlParams from "../utils/useUrlParams";
import "./SortDropdown.css";

const SortDropdown = () => {
  const { getUrlParams, replaceUrlParams } = useUrlParams();
  const options = [
    { value: "featured", label: "Featured" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "customer", label: "Avg. Customer Review" },
    { value: "arrivals", label: "Newest Arrivals" },
    { value: "sellers", label: "Best Sellers" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      zIndex: 1,
      position: "relative",
      fontSize: "10px",
      padding: "0px 2px 0px 0px",
      height: "20px",
      minHeight: "20px",
      lineHeight: "14px",
      maxWidth: "185px",
      backgroundColor: "#f0f2f2",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px 7px 0px 3px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      width: "20px",
      height: "20px",
      padding: "2px",
      svg: {
        width: "16px",
        height: "16px",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      zIndex: 2,
      position: "absolute",
      marginTop: "-30px",
      backgroundColor: "white",
      border: "1px solid gray",
      width: "185px",
      right: 0,
      fontSize: "12px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#edfdff"
        : state.isFocused
        ? "#f0f2f2"
        : "white",
      color: "black",
      border: state.isSelected ? "3px solid #007185" : "none",
      padding: "2px 12px 1px 13px",
      cursor: "pointer",
    }),
  };

  return (
    <div className="sort">
      <Select
        options={options}
        value={
          options.find((option) => option.value === getUrlParams("sort")) ||
          options[0]
        }
        onChange={(selectedOption) => {
          replaceUrlParams("sort", selectedOption.value);
        }}
        formatOptionLabel={(option, { context }) => {
          return context === "menu" ? option.label : "Sort by: " + option.label;
        }}
        placeholder="Select an option"
        isSearchable={false}
        styles={customStyles}
        className="sort__select"
      />
    </div>
  );
};

export default SortDropdown;
