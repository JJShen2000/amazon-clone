var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  let { query, category, minPrice, maxPrice, sort, page, limit } = req.query;

  let meta = { productsPerPage: 25, totalProducts: 100 };

  // filters setting
  let filters = [
    {
      type: "checkbox",
      title: "Delivery Day",
      options: [{ id: "tomorrow", label: "Get It by Tomorrow" }],
    },
    {
      type: "list",
      title: "Department",
      backLable: "Any Department",
      elements: [
        { id: "Amazon-Devices", label: "Amazon Devices" },
        { id: "Electronics", label: "Electronics" },
      ],
    },
    {
      type: "Customer Reviews",
      min: 1,
      max: 4,
    },
    { type: "Price", high: 10000, low: 100 },
  ];

  // product list
  let products = [
    {
      id: 0,
      name: "Amazon Fire TV Stick 4K streaming device, more than 1.5 million movies and TV episodes, supports Wi-Fi 6, watch free & live TV",
      price: 49.99,
      rating: 4.7,
      ratingNumber: 32474,
      img: "https://m.media-amazon.com/images/I/41vhe0X8wbL._AC_UL320_.jpg",
    },
    {
      id: 1,
      name: "Amazon Basics Cotton Swabs, 500 Count",
      price: 2.96,
      rating: 4.7,
      ratingNumber: 47807,
      img: "https://m.media-amazon.com/images/I/612HeyYXOnL._AC_UL320_.jpg",
    },
    {
      id: 2,
      name: "Amazon Kindle - The lightest and most compact Kindle, with extended battery life, adjustable front light, and 16 GB storage - Denim",
      price: 99.99,
      rating: 4.6,
      ratingNumber: 19240,
      img: "https://m.media-amazon.com/images/I/71dFhAIwENL._AC_UL320_.jpg",
    },
    {
      id: 0,
      name: "Amazon Fire TV Stick 4K streaming device, more than 1.5 million movies and TV episodes, supports Wi-Fi 6, watch free & live TV",
      price: 49.99,
      rating: 4.7,
      ratingNumber: 32474,
      img: "https://m.media-amazon.com/images/I/41vhe0X8wbL._AC_UL320_.jpg",
    },
    {
      id: 1,
      name: "Amazon Basics Cotton Swabs, 500 Count",
      price: 2.96,
      rating: 4.7,
      ratingNumber: 47807,
      img: "https://m.media-amazon.com/images/I/612HeyYXOnL._AC_UL320_.jpg",
    },
    {
      id: 2,
      name: "Amazon Kindle - The lightest and most compact Kindle, with extended battery life, adjustable front light, and 16 GB storage - Denim",
      price: 99.99,
      rating: 4.6,
      ratingNumber: 19240,
      img: "https://m.media-amazon.com/images/I/71dFhAIwENL._AC_UL320_.jpg",
    },
  ];

  res.json({
    meta,
    filters,
    products,
  });
});

module.exports = router;
