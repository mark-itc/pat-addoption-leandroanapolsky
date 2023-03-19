require("dotenv").config();
const { MongoClient } = require("mongodb");
const UsersDAO = require("./UsersDAO");
const PetsDAO = require("./PetsDAO");
const dbClient = process.env.MONGODB_URL;



module.exports.initDB = async function initDB() {
  MongoClient.connect(dbClient)
    .then(async (connection) => {
      console.log("succeeded to connect with DB");
      await UsersDAO.injectDB(connection.db(process.env.DB));
      await PetsDAO.injectDB(connection.db(process.env.DB));
    })
    .catch((error) => {
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};

