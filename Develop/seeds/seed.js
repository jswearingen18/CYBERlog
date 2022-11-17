const sequelize = require('../config/connection');
const { User, Blogs } = require('../models');

const userData = require("./user-seeds");
const blogsData = require("./blogs-seeds");

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blogs.bulkCreate(blogsData, {
    returning: true,
  });

  process.exit(0);
}

seedDB();
