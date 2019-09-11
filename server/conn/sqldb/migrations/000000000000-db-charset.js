module.exports = {
  up: queryInterface => (
    queryInterface.sequelize.query(`ALTER DATABASE ${queryInterface.sequelize.config.database}
      CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`)
  ),
  down: () => { },
};
