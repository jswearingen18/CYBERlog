// Import models this will be the root model
const User = require("./User");
const Blogs = require("./Blogs");

User.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blogs.belongsTo(USER, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Blogs,
};
