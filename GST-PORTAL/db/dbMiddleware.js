

const dbConnection = require('./db-connection');
require('dotenv').config()

async function dbMiddleware(req, res, next) {
  try {
  
    const conn = await dbConnection.connect();
    req.db = {
      connection: conn,
      schema: process.env.DB_SCHEMA
    };
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = dbMiddleware;
