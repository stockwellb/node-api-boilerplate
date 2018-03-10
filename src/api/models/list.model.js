'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'list',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  List.associate = models => {
    // noinspection Annotator
    List.hasMany(models.list_item, {
      foreignKey: 'listId',
      as: 'listItems'
    });
  };
  return List;
};
