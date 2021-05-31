'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recomments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      recomments.belongsTo(models.users, {
        foreignKey: 'users_id',
        as: 'useremail',
        targetKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      recomments.belongsTo(models.posts, {
        foreignKey: 'users_id',
        as: 'useremail',
        targetKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
      recomments.belongsTo(models.comments, {
        foreignKey: 'users_id',
        as: 'useremail',
        targetKey: 'id',
        onUpdate: 'cascade',
        onDelete: 'set null',
      });
  recomments.init({
    users_id: DataTypes.INTEGER,
    posts_id: DataTypes.INTEGER,
    comments_id: DataTypes.INTEGER,
    recomment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recomments',
  });
  return recomments;
};