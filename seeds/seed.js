const sequelize = require('../config/connection');
const { User, Blogs } = require('../models');

const userData = require('./userData.json');
const blogsData = require('./blogsData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blogs.bulkCreate(blogsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDB();
