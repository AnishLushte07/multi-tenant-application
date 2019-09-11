const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const url = require('url');

const root = path.normalize(`${__dirname}/../..`);
const envFile = path.join(root, '.env');

let config = {};
let env = {};

if (fs.existsSync(envFile)) {
  env = dotenv.config({ path: envFile });
  config = env.parsed || env;
}

function getDBSettings(mysqlUrl) {
  const conn = url.parse(mysqlUrl);
  const [username, password] = conn.auth.split(':');

  const [host, port] = conn.hostname.split(':');

  return {
    database: conn.pathname.slice(1),
    username: username || 'root',
    password: password || '',
    dialect: 'mysql',
    host: host || '127.0.0.1',
    port: port || 3306,
    seederStorage: 'sequelize',
  };
}

module.exports = {
  common: getDBSettings(config.MYSQL_COMMON),
  tenant1: getDBSettings(config.MYSQL_TENANT1),
  tenant2: getDBSettings(config.MYSQL_TENANT2),
};
