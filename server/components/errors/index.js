/**
 * Error responses
 */

module.exports[404] = function pageNotFound(req, res) {
  res.status(404).json({ error: 'Not found', status: 404 });
};
