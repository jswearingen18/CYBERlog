// Import models this will be the root model
const User = require("./User");
const Blogs = require("./Blogs");

User.hasMany(Blogs, {
  onDelete: 'CASCADE',
});

Blogs.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Blogs,
};