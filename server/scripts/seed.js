const fs = require("fs");
const csv = require("csv-parser");
const sequelize = require("../configs/database");
const { Product, ProductCategory } = require("../models");

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); 

    const categories = new Set();
    const products = [];

    fs.createReadStream('./data/amazon_processed.csv')
      .pipe(csv())
      .on('data', (row) => {
        categories.add(row.FirstCategory);
        categories.add(row.SecondCategory);
        products.push(row);
      })
      .on('end', async () => {
        const categoryMap = new Map();
        for (const category of categories) {
          const [cat, _] = await ProductCategory.findOrCreate({ where: { name: category } });
          categoryMap.set(category, cat.id);
        }

        for (const product of products) {
          await Product.create({
            name: product.name,
            price: parseFloat(product.price),
            rating: parseFloat(product.rating),
            ratingNumber: parseInt(product.ratingNumber),
            img: product.img,
            firstCategoryId: categoryMap.get(product.FirstCategory),
            secondCategoryId: categoryMap.get(product.SecondCategory),
            GetItByTomorrow: product.GetItByTomorrow.toLowerCase() === 'true'
          });
        }

        console.log('Seeding Completed.');
        process.exit(0);
      });
  } catch (error) {
    console.error('Error when seeding:', error);
    process.exit(1);
  }
}

seedDatabase();