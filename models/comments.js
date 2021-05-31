'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.belongsTo(models.posts, {
        foreignKey: 'users_id',
        as: 'useremail',
        targetKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      comments.hasMany(models.recomments, {
        foreignKey: 'users_id',
        sourceKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
    }
  }
  comments.init(
    {
      users_id: DataTypes.INTEGER,
      posts_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'comments',
    },
  );
  return comments;
};
