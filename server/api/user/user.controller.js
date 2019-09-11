const { getConnection } = require('../../conn/sqldb/dynamicConnection');

async function test(req, res, next) {
 try {
   const conn = await getConnection(req.query.clientId);

   const data = await conn.User.findAll();

   return  res.json(data);
 } catch (err) {
   return next(err);
 }
}

module.exports = {
  test,
};
