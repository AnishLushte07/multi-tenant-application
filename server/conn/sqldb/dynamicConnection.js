const Sequelize = require('sequelize');
const _ = require('lodash');

const logger = require('../../components/logger');

const sqlDefaults = {
  dialect: 'mysql',
  timezone: '+05:30',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8mb4_general_ci',
    },
  },
};

const dynamicConnectionsMap = {};

function loadModel(sequelizeInstance) {
  [
    'User',
  ].forEach((model) => {
    sequelizeInstance[model] = sequelizeInstance.sequelize
      .import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model.js`);
  });

  Object.keys(sequelizeInstance).forEach((modelName) => {
    if ('associate' in sequelizeInstance[modelName]) {
      sequelizeInstance[modelName].associate(sequelizeInstance);
    }
  });

}

function connectMysql(connectionId) {
  return dynamicConnectionsMap[connectionId]
    .sequelize
    .authenticate()
    .then(() => {
      logger.log('mysql connection successful', connectionId);
      loadModel(dynamicConnectionsMap[connectionId]);
    })
    .catch(err => logger.error(`DB connection error ${connectionId}`, err));
}

async function buildDynamicConnection(db) {
  try {
    const connections = await db.Client.findAll({
      attributes: ['id', 'db_username', 'db_password', 'db_name', 'db_host'],
      where: { db_username: { $ne: null } },
      raw: true,
    });

    connections.forEach(v => {
      if (v.db_username && v.db_password) {
        dynamicConnectionsMap[v.id] = {};
        dynamicConnectionsMap[v.id].sequelize = new Sequelize(
            v.db_name, v.db_username,
            v.db_password, Object.assign({ host: v.db_host }, sqlDefaults),
          );
          connectMysql(v.id);
        }
    });
  } catch (err) {
    logger.error(err);
  }
}

async function getConnection(slug) {
  if (dynamicConnectionsMap && dynamicConnectionsMap[slug]) {
    return dynamicConnectionsMap[slug];
  }
  await buildDynamicConnection(db);
  return dynamicConnectionsMap[slug];
  
}

module.exports = {
  buildDynamicConnection,
  getConnection,
};
