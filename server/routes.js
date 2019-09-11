const errors = require('./components/errors');
const logger = require('./components/logger');
const { name, version } = require('../package.json');
const user = require('./api/user');

module.exports = (app) => {
  app.get('/api/health', (req, res) => res.json({ name, version }));
  app.use('/api/user', user);

  app.use(logger.transports.sentry.raven.errorHandler());

  app.use((e, req, res) => {
    logger.error(e);
    return (res.status(e.statusCode || e.code || 500)
      .json({ message: e.message, stack: e.stack }));
  });

  app.route('/*')
    .get(errors[404]);
};
