'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
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
    List.hasMany(models.ListItem, {
      foreignKey: 'listId',
      as: 'listItems'
    });
  };
  return List;
};
