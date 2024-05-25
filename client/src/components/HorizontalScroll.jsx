import React, { useRef } from "react";
import "./HorizontalScroll.css";

const images = [
  "https://m.media-amazon.com/images/I/81j+qOqAh+L._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/61rq2K0-BTL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/714bvwi99EL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/71zuep1NKmL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/31t8hfoDhoL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/511D23CyTqL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/715eFnSZD6L._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/81j+qOqAh+L._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/61rq2K0-BTL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/714bvwi99EL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/71zuep1NKmL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/31t8hfoDhoL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/511D23CyTqL._AC_SY200_.jpg",
  "https://m.media-amazon.com/images/I/715eFnSZD6L._AC_SY200_.jpg",
];

const HorizontalScroll = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const newPosition =
        scrollRef.current.scrollLeft + (direction === "left" ? -1420 : 1420);
      scrollRef.current.scrollLeft = newPosition;
    }
  };

  return (
    <div className="scroll">
      <span>Inspired by your shopping trends</span>

      <div className="scroll__container" ref={scrollRef}>
        <button
          className="scroll__button scroll__button--left"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </button>
        {images.map((src, index) => (
          <img key={index} className="scroll__image" src={src} alt={`product-${index}`} />
        ))}
        <button
          className="scroll__button scroll__button--right"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroll;
