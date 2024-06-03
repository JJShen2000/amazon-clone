import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Rating, Slider } from "@mui/material";
import axios from "axios";
import classNames from "classnames";

import apiUrl from "../config";
import { setFilters, setProducts } from "../store/modules/searchResultStore";
import "./Filters.css";

const Filters = () => {
  // states for price slider
  const [priceRange, setPriceRange] = useState([0, 0]);
  const navigate = useNavigate();
  const { filters, products } = useSelector((store) => store.searchResult);
  const dispatch = useDispatch();
  const location = useLocation();

  // Handle price slider change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Fetch data from backend API
  const fetchData = () => {
    return async (dispatch) => {
      const response = await axios.get(
        `${apiUrl}/search${window.location.search}`
      );
      dispatch(setFilters(response.data.filters));
      dispatch(setProducts(response.data.products));
    };
  };

  // Fetch data on component mount or URL change
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, location]);

  // Set price range by new fetched data or url
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("priceMin") && searchParams.has("priceMax")) {
      const priceMin = Number(searchParams.get("priceMin"));
      const priceMax = Number(searchParams.get("priceMax"));
      setPriceRange([priceMin, priceMax]);
    } else {
      const priceFilter = filters.find((filter) => filter.type === "Price");
      if (priceFilter) {
        setPriceRange([Number(priceFilter.low), Number(priceFilter.high)]);
      }
    }
  }, [filters]);

  // Get key of URL parameter by the filter title
  // applicable to types checkbox and list
  const getUrlParamKey = (filterTitle) => {
    return filterTitle.replace(/\s+/g, "").toLowerCase();
  };

  // Update multiple URL parameters
  const updateUrlParams = (params) => {
    // current URL's query
    const searchParams = new URLSearchParams(window.location.search);

    // Iterate over the list of parameter
    params.forEach(({ key, value, deleteFlag, replaceFlag }) => {
      if (deleteFlag === true) {
        if (value !== undefined && value !== null) {
          searchParams.delete(key, value);
        } else {
          searchParams.delete(key);
        }
      } else {
        if (replaceFlag === true) {
          searchParams.delete(key);
        }
        if (value !== null && value !== undefined) {
          searchParams.set(key, value);
        }
      }
    });

    // Navigate to the new URL
    navigate({ search: searchParams.toString() });
  };

  // Check if a specific parameter in URL exists
  const paramExists = (key, value = null) => {
    // current URL's query
    const searchParams = new URLSearchParams(window.location.search);
    if (value === null) {
      return searchParams.has(key);
    } else {
      return searchParams.has(key, value);
    }
  };

  // get value of specific parameter in URL
  const getUrlParams = (key) => {
    // current URL's query
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  };

  return (
    <div className="filters">
      {filters.map((filter, index) => {
        if (filter.type === "Customer Reviews") {
          // construct a descending array of stars numbers
          const length = filter.max - filter.min + 1;
          const range = Array.from({ length }, (_, i) => filter.max - i);

          return (
            <div key={index} className="filters__section">
              <h3 className="filters__title">Customer Reviews</h3>
              {paramExists("rating_low") && (
                <button
                  className="filters__link"
                  onClick={(e) =>
                    updateUrlParams([
                      { key: "rating_low", value: null, deleteFlag: true },
                    ])
                  }
                >
                  &lt; Clear
                </button>
              )}
              {range.map(
                (numStar, idx) =>
                  (!paramExists("rating_low") ||
                    getUrlParams("rating_low") === numStar.toString()) && (
                    <div key={idx} className="filters__rating-option">
                      <button
                        onClick={(e) => {
                          updateUrlParams([
                            {
                              key: "rating_low",
                              value: numStar,
                              replaceFlag: true,
                            },
                          ]);
                        }}
                        className="filters__link"
                      >
                        <Rating
                          name={`customer-reviews-${numStar}`}
                          value={numStar}
                          precision={1}
                          readOnly
                          sx={{ color: "#DE7921" }}
                          size="small"
                          className="filters__rating"
                        />
                        <span className="filters__text">& up</span>
                      </button>
                    </div>
                  )
              )}
            </div>
          );
        } else if (filter.type === "Price") {
          return (
            <div key={index} className="filters__section">
              <h3 className="filters__title">Price</h3>
              <h3 className="filters__title">
                ${priceRange[0]} - ${priceRange[1]}
              </h3>
              <div className="filters__sliderRow">
                <Slider
                  className="filters__slider"
                  value={priceRange}
                  onChange={handlePriceChange}
                  min={filter.low}
                  max={filter.high}
                  valueLabelDisplay="auto"
                />
                <button
                  onClick={(e) => {
                    if (
                      priceRange[0] === filter.low &&
                      priceRange[1] === filter.high
                    ) {
                      updateUrlParams([
                        { key: "priceMin", value: null, deleteFlag: true },
                        { key: "priceMax", value: null, deleteFlag: true },
                      ]);
                    } else {
                      updateUrlParams([
                        {
                          key: "priceMin",
                          value: priceRange[0],
                          replaceFlag: true,
                        },
                        {
                          key: "priceMax",
                          value: priceRange[1],
                          replaceFlag: true,
                        },
                      ]);
                    }
                  }}
                  className="filters__price--button"
                >
                  Go
                </button>
              </div>
              {paramExists("priceMin") && paramExists("priceMax") && (
                <button
                  className="filters__price--reset"
                  onClick={(e) => {
                    updateUrlParams([
                      { key: "priceMin", value: null, deleteFlag: true },
                      { key: "priceMax", value: null, deleteFlag: true },
                    ]);
                  }}
                >
                  Reset price range
                </button>
              )}
            </div>
          );
        } else if (filter.type === "checkbox") {
          return (
            <div key={index} className="filters__section">
              <h3 className="filters__title">{filter.title}</h3>
              {paramExists(getUrlParamKey(filter.title)) && (
                <button
                  className="filters__link"
                  onClick={(e) =>
                    updateUrlParams([
                      {
                        key: getUrlParamKey(filter.title),
                        value: null,
                        deleteFlag: true,
                      },
                    ])
                  }
                >
                  &lt; Clear
                </button>
              )}
              {filter.options.map((option, idx) => {
                const queryKey = getUrlParamKey(filter.title);
                return (
                  <div key={idx}>
                    <Checkbox
                      checked={paramExists(queryKey, option.id)}
                      onChange={(e) => {
                        const newSetting = !paramExists(queryKey, option.id);
                        if (newSetting) {
                          updateUrlParams([
                            {
                              key: queryKey,
                              value: option.id,
                              replaceFlag: true,
                            },
                          ]);
                        } else {
                          // remove
                          updateUrlParams([
                            {
                              key: queryKey,
                              value: option.id,
                              deleteFlag: true,
                            },
                          ]);
                        }
                      }}
                      sx={{"&:hover": {color: "#1196AB"}}}
                      className="filters__checkbox"
                    />
                    <span className="filters__text">{option.label}</span>
                  </div>
                );
              })}
            </div>
          );
        } else if (filter.type === "list") {
          return (
            <div key={index} className="filters__section">
              <h3 className="filters__title">{filter.title}</h3>
              {paramExists(getUrlParamKey(filter.title)) && (
                <button
                  className="filters__link"
                  onClick={(e) =>
                    updateUrlParams([
                      {
                        key: getUrlParamKey(filter.title),
                        value: null,
                        deleteFlag: true,
                      },
                    ])
                  }
                >
                  &lt; {filter.backLable}
                </button>
              )}
              {filter.elements.map((element, idx) => {
                const queryKey = getUrlParamKey(filter.title);
                return (
                  (!paramExists(queryKey) ||
                    getUrlParams(queryKey) === element.id) && (
                    <div key={idx}>
                      <button
                        onClick={(e) => {
                          const newSetting = !paramExists(queryKey, element.id);
                          if (newSetting) {
                            updateUrlParams([
                              {
                                key: queryKey,
                                value: element.id,
                                replaceFlag: true,
                              },
                            ]);
                          } else {
                            // remove
                            updateUrlParams([
                              {
                                key: queryKey,
                                value: element.id,
                                deleteFlag: true,
                              },
                            ]);
                          }
                        }}
                        className={classNames("filters__link", {
                          clicked: paramExists(queryKey, element.id),
                        })}
                      >
                        {element.label}
                      </button>
                    </div>
                  )
                );
              })}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Filters;
