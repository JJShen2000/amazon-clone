import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import "./Search.css";
import {
  Filters,
  CustomPagination,
  ProductCard,
  SortDropdown,
} from "@/components";
import apiUrl from "@/config";
import {
  setMeta,
  setFilters,
  setProducts,
} from "@/store/modules/searchResultStore";

function Search() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const keyword = query.get("k");
  const dispatch = useDispatch();
  const location = useLocation();

  // Fetch data from backend API
  const fetchData = () => {
    return async (dispatch) => {
      const response = await axios.get(`${apiUrl}/search${location.search}`);
      dispatch(setMeta(response.data.meta));
      dispatch(setFilters(response.data.filters));
      dispatch(setProducts(response.data.products));
    };
  };

  // Fetch data on component mount or URL change
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, location]);

  const { meta, products } = useSelector((store) => store.searchResult);

  return (
    <div>
      <div className="search__infoBar">
        <span className="search__infoBar--text">
          1-{meta.productsPerPage} of {meta.totalProducts} results for{" "}
          <span style={{ color: "#c45500" }}>"{keyword}"</span>
        </span>
        <SortDropdown />
      </div>
      <div className="search__content">
        <div className="search__filtersPanel">
          <Filters />
        </div>
        <div className="search__results">
          <span className="search__results--title">Results</span>
          <div className="search__results--container">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          <CustomPagination {...meta} />
        </div>
      </div>
    </div>
  );
}

export default Search;
