import React, { useState } from "react";
import "./Search.css";
import { useLocation } from "react-router-dom";
import { Filters } from "../components";
import Select from "react-select";

import useUrlParams from "../utils/useUrlParams";

function Search() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const keyword = query.get("k");
  const itemsPerPage = 16;
  const numResults = 979;

  const options = [
    { value: "option1", label: "Featured" },
    { value: "option2", label: "Price: Low to High" },
    { value: "option3", label: "Price: High to Low" },
    { value: "option4", label: "Avg. Customer Review" },
    { value: "option5", label: "Newest Arrivals" },
    { value: "option6", label: "Best Sellers" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const formatOptionLabel = ({ label }) => {
    return selectedOption && selectedOption.label === label
      ? `Sort by: ${label}`
      : label;
  };

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

  const { removeUrlParams, replaceUrlParams } = useUrlParams();

  return (
    <div>
      <div className="search__infoBar">
        <span className="search__infoBar--text">
          1-{itemsPerPage} of {numResults} results for{" "}
          <span style={{ color: "#c45500" }}>"{keyword}"</span>
        </span>
        <div className="search__infoBar--sort">
          <Select
            options={options}
            value={selectedOption}
            onChange={(selectedOption) => {
              setSelectedOption(selectedOption);
              replaceUrlParams("sort", selectedOption.value);
            }}
            formatOptionLabel={(option, { context }) => {
              return context === "menu"
                ? option.label
                : "Sort by: " + option.label;
            }}
            placeholder="Select an option"
            isSearchable={false}
            styles={customStyles}
            className="search__infoBar--sortDropdown"
          />
        </div>
      </div>
      <div className="search__content">
        <div className="search__filtersPanel">
          <Filters />
        </div>
        <div className="search__results">
          <span>Results</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
