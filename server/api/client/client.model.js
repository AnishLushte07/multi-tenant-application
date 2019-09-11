const properties = require('./client.property');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', Object
    .assign(properties(DataTypes)), {
      tableName: 'clients',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: false,
      deletedAt: 'deleted_on',
    });

  Client.associate = (db) => {};

  return Client;
};
