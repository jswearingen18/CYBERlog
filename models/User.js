const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  validatePWD(loginPWD) {
    return bcrypt.compareSync(loginPWD, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 16],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserPWD) => {
        newUserPWD.password = await bcrypt.hash(newUserPWD.password, 15);
        return newUserPWD;
      },
      beforeUpdate: async (updatedUserPWD) => {
        updatedUserPWD.password = await bcrypt.hash(
          updatedUserPWD.password,
          15
        );
        return updatedUserPWD;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
