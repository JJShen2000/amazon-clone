const Sequelize = require("sequelize");
const sequelize = require("../configs/database");

const User = require("./user")(sequelize, Sequelize.DataTypes);
const ProductCategory = require("./productCategory")(
  sequelize,
  Sequelize.DataTypes
);
const Product = require("./product")(sequelize, Sequelize.DataTypes);

const models = {
  User,
  ProductCategory,
  Product,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

const db = {
  ...models,
  sequelize,
  Sequelize,
};

async function syncModels() {
  try {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while synchronizing the models:", error);
  }
}

syncModels();

module.exports = db;
