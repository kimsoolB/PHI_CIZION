'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.hasMany(models.comments, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      posts.hasMany(models.recomments, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      posts.belongsTo(models.users, {
        foreignKey: 'users_id',
        as: 'useremail',
        targetKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
    }
  }
  posts.init(
    {
      users_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'posts',
    },
  );
  return posts;
};
