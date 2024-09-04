const { Op, Sequelize } = require("sequelize");

const { Product, ProductCategory } = require("../models");

const getSearchResult = async (req, res) => {
  let {
    k,
    department,
    rating_low,
    priceMin,
    priceMax,
    sort,
    page = 1,
  } = req.query;

  const productsPerPage = 25;

  try {
    let whereCondition = {
      name: {
        [Op.iLike]: `%${k}%`,
      },
    };

    if (rating_low) {
      whereCondition.rating = { [Op.gte]: parseFloat(rating_low) };
    }

    if (priceMin || priceMax) {
      whereCondition.price = {};
      if (priceMin) whereCondition.price[Op.gte] = parseFloat(priceMin);
      if (priceMax) whereCondition.price[Op.lte] = parseFloat(priceMax);
    }

    let order = [];
    if (sort === "price_asc") order.push(["price", "ASC"]);
    else if (sort === "price_desc") order.push(["price", "DESC"]);
    else order.push(["rating", "DESC"]); // default

    let categoryWhere = {};
    if (department) {
      categoryWhere = {
        id: department,
      };
    }

    // fetch products
    const { count, rows } = await Product.findAndCountAll({
      where: whereCondition,
      order,
      limit: productsPerPage,
      offset: (page - 1) * productsPerPage,
      include: [
        {
          model: ProductCategory,
          as: "FirstCategory",
          where: categoryWhere,
          attributes: ["id", "name"],
        },
        // {
        //   model: ProductCategory,
        //   as: "SecondCategory",
        //   attributes: ["id", "name"],
        // },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const meta = {
      productsPerPage,
      totalProducts: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / productsPerPage),
    };

    // get FirstCategory list for filters data
    const departments = await ProductCategory.findAll({
      where: categoryWhere,
      attributes: ["id", "name"],
      include: [
        {
          model: Product,
          as: "FirstCategoryProducts",
          where: { name: { [Op.iLike]: `%${k}%` } },
          attributes: [],
        },
      ],
      group: ["ProductCategory.id"],
      having: Sequelize.literal('COUNT("FirstCategoryProducts"."id") > 0'),
    });

    // get customer rating range for filters
    const ratingRange = await Product.findAll({
      where: { name: { [Op.iLike]: `%${k}%` } },
      attributes: [
        [
          Sequelize.fn("CEIL", Sequelize.fn("MIN", Sequelize.col("rating"))),
          "minRating",
        ],
        [
          Sequelize.fn("CEIL", Sequelize.fn("MAX", Sequelize.col("rating"))),
          "maxRating",
        ],
      ],
      raw: true,
    });

    // get price range for filters
    const priceRange = await Product.findAll({
      where: { name: { [Op.iLike]: `%${k}%` } },
      attributes: [
        [Sequelize.fn("MIN", Sequelize.col("price")), "minPrice"],
        [Sequelize.fn("MAX", Sequelize.col("price")), "maxPrice"],
      ],
      raw: true,
    });

    const filters = [
      {
        type: "checkbox",
        title: "Delivery Day",
        options: [{ id: "tomorrow", label: "Get It by Tomorrow" }],
      },
      {
        type: "list",
        title: "Department",
        backLabel: "Any Department",
        elements: departments.map((dept) => ({
          id: dept.id,
          label: dept.name,
        })),
      },
      {
        type: "Customer Reviews",
        min: ratingRange[0].minRating,
        max: ratingRange[0].maxRating,
      },
      {
        type: "Price",
        high: priceRange[0].maxPrice,
        low: priceRange[0].minPrice,
      },
    ];

    res.json({
      meta,
      filters,
      products: rows,
    });
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ error: "An error occurred while searching" });
  }
};

module.exports = { getSearchResult };
