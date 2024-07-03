
const dbConnection = require('./db-connection');

async function dbMiddleware(req, res, next) {
    try {
      const conn = await dbConnection.connect();
      req.db = conn;
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  module.exports = dbMiddleware;
