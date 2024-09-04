module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define("ProductCategory", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ProductCategory.associate = function(models) {
    ProductCategory.hasMany(models.Product, {
      foreignKey: 'firstCategoryId',
      as: 'FirstCategoryProducts',
    });
    ProductCategory.hasMany(models.Product, {
      foreignKey: 'secondCategoryId',
      as: 'SecondCategoryProducts',
    });
  };

  return ProductCategory;
};
