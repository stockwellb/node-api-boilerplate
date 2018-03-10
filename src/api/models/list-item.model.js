'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define(
    'list_item',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  ListItem.associate = models => {
    ListItem.belongsTo(models.list, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    });
  };
  return ListItem;
};
