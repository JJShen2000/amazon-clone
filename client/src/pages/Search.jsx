import React from "react";
import "./Search.css";
import { useLocation } from "react-router-dom";
import { Filters } from "../components";

function Search() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const keyword = query.get("k");
  const itemsPerPage = 16;
  const numResults = 979;

  // const filters = [
  //   { type: "Customer Reviews" },
  //   { type: "Price", high: 10000, low: 100 },
  //   {
  //     type: "checkbox",
  //     title: "Delivery Day",
  //     options: ["Get It by Tomorrow"],
  //   },
  // ];
  return (
    <div>
      <div className="search__infoBar">
        <span className="search__infoBar--text">
          1-{itemsPerPage} of {numResults} results for{" "}
          <span style={{ color: "#c45500" }}>"{keyword}"</span>
        </span>
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
