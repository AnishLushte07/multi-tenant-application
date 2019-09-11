const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

const config = require('./config/environment');
const db = require('./conn/sqldb');
const logger = require('./components/logger');
const { buildDynamicConnection } = require('./conn/sqldb/dynamicConnection');

function startServer() {
  server.listen(config.port, config.ip, () => {
    buildDynamicConnection(db);
    logger.log('Server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException', err);
});

db.sequelizeCommon
  .authenticate()
  .then(startServer)
  .catch((err) => {
    logger.error('Server failed to start due to error: %s', err);
  });

module.exports = app;
