var express = require("express");
var router = express.Router();

router.get("/search", function (req, res) {
  let { query, category, minPrice, maxPrice, sort, page, limit } = req.query;

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
    { id: 1, name: "ipad", price: 699 },
    { id: 2, name: "iphone", price: 999 },
  ];

  res.json({
    filters,
    products,
  });
});

module.exports = router;
