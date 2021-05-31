'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.posts, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      users.hasMany(models.comments, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      users.hasMany(models.recomments, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
    }
  }

  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return users;
};
