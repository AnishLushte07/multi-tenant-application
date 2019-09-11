const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('clients', Object.assign(
      properties('client', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {},
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('clients');
  },
};
