const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('users', Object.assign(
      properties('user', DataTypes),
      timestamps(['c', 'u', 'd'], DataTypes),
      {},
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
