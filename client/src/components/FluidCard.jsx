import React from "react";
import "./FluidCard.css";

function FluidCard() {
  return (
    <div className="fluidCard">
      <span className="fluidCard__header">
        Save on pre-owned Amazon devices
      </span>
      <img src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/YjAwMjVmYjUt/YjAwMjVmYjUt-YmMzZGJjMzYt-w379._SY304_CB410321238_.jpg" />
      <a className="fluidCard__footer">Shop now</a>
    </div>
  );
}

export default FluidCard;
