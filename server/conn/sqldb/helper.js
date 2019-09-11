const Sequelize = require('sequelize');

const r = require;
const { DataTypes } = Sequelize;

module.exports = {
  engine: {
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },

  properties(model) {
    return r(`../../api/${model}/${model}.property`)(DataTypes);
  },

  keys(model) {
    return {
      type: DataTypes.INTEGER,
      references: {
        model,
        key: 'id',
      },
      onUpdate: 'restrict',
      onDelete: 'restrict',
    };
  },

  timestamps(type = [], sequelize) {
    const options = {};

    if (type.includes('c')) {
      options.created_on = {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      };
    }

    if (type.includes('u')) {
      options.updated_on = {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      };
    }

    if (type.includes('d')) {
      options.deleted_on = {
        type: Sequelize.DATE,
        defaultValue: null,
      };
    }

    return options;
  },
};
