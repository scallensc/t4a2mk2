'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment);
    User.hasMany(models.Thread);
  };
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    delete values.createdAt;
    delete values.updatedAt;

    return values;
  }
  return User;
};