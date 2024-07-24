import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Rating, Slider } from "@mui/material";
import classNames from "classnames";

import "./Filters.css";
import { useUrlParams } from "@/utils";

const Filters = () => {
  // states for price slider
  const [priceRange, setPriceRange] = useState([0, 0]);
  const { filters } = useSelector((store) => store.searchResult);

  const {
    removeUrlParams,
    replaceUrlParams,
    appendUrlParams,
    paramExists,
    getUrlParams,
  } = useUrlParams();

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
                  onClick={(e) => removeUrlParams("rating_low")}
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
                        onClick={(e) => replaceUrlParams("rating_low", numStar)}
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
                  onChange={(e, newValue) => {
                    setPriceRange(newValue);
                  }}
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
                      removeUrlParams([
                        { key: "priceMin" },
                        { key: "priceMax" },
                      ]);
                    } else {
                      console.log("priceRange", priceRange);
                      replaceUrlParams([
                        {
                          key: "priceMin",
                          value: priceRange[0],
                        },
                        {
                          key: "priceMax",
                          value: priceRange[1],
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
                    removeUrlParams([{ key: "priceMin" }, { key: "priceMax" }]);
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
                  onClick={() => removeUrlParams(getUrlParamKey(filter.title))}
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
                          appendUrlParams(queryKey, option.id);
                        } else {
                          removeUrlParams(queryKey, option.id);
                        }
                      }}
                      sx={{ "&:hover": { color: "#1196AB" } }}
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
                  onClick={() => removeUrlParams(getUrlParamKey(filter.title))}
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
                          paramExists(queryKey, element.id)
                            ? removeUrlParams(queryKey, element.id)
                            : replaceUrlParams(queryKey, element.id);
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
