const seedUser = require("./user-seeds");
const seedBlogs = require("./blogs-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\nDATABASE NOW SYNCED\n");

  await seedUser();
  console.log("\nUSER NOW SYNCED\n");

  await seedBlogs();
  console.log("\nBLOGS NOW SYNCED\n");

  process.exit(0);
};

seedAll();
