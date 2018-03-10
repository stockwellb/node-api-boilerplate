'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define(
    'ListItem',
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
    ListItem.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    });
  };
  return ListItem;
};
