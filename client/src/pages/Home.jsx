import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

function Home() {
  const baners = [
    "https://m.media-amazon.com/images/I/61ijBS0fWUL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71SfPTteZsL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/61Fl0kMW-ZL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71FJQVPqGbL._SX3000_.jpg",
  ];
  return (
    <div className="home__carousel">
      <Carousel indicators={false} interval={5000}>
        {baners.map((baner, index) => (
          <Carousel.Item key={index}>
            <img className="home__carousel_image" src={baner} alt="banner"/>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
