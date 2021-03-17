'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.task)
      user.hasMany(models.comment)
    }
  };
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.ENUM("admin","user","supervisor"),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    paranoid:true
  });
  return user;
};