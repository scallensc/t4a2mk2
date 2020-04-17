'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    name: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});
  Thread.associate = function(models) {
    // associations can be defined here
    Thread.belongsTo(models.Topic);
    Thread.belongsTo(models.User);
    Thread.hasMany(models.Comment);
  };
  return Thread;
};