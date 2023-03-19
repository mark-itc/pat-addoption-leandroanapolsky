require("dotenv").config();
const { MongoClient } = require("mongodb");
const dbClient = process.env.MONGODB_URL;

const client = new MongoClient(dbClient);

async function run() {
  await client.connect();
  const db = client.db("readyPetGo");
  
  const petsCollection = db.collection("pets");


  client.close();
}

run();
