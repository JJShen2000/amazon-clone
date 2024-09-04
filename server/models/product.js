module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ratingNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Product.associate = function(models) {
    Product.belongsTo(models.ProductCategory, {
      foreignKey: 'firstCategoryId',
      as: 'FirstCategory',
    });
    Product.belongsTo(models.ProductCategory, {
      foreignKey: 'secondCategoryId',
      as: 'SecondCategory',
    });
  };

  return Product;
};