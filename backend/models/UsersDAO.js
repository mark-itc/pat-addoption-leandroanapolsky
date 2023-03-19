const { ObjectId } = require("mongodb");

let collection;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      collection = await connection.collection("users");
    } catch (e) {
      console.log(`Couldn't establish connection tu users collection ${e}`);
    }
  }
  

  static async createUser(userData) {
    userData.created_at = new Date();
    userData.login_attempts = 0;
    await collection.insertOne({ ...userData });
  }

  static async getUserByUsername(username) {
    return await collection.findOne({ username });
  }

  static async getUserById(userId) {
    return await collection.findOne({ _id: new ObjectId(userId) });
  }

  static async deleteUser(userId) {
    return await collection.deleteOne({ _id: new ObjectId(userId) });
  }
  
  static async getPetsById(userId) {
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    const userPetsIDs = user.adopted
    return userPetsIDs
  }



 

  static async updateUser(userData) {
    return await collection.updateOne(
      { username: userData.username },
      { $set: { userData } }
    );
  }

  static async showAllUsers(req) {
    return await collection.find().toArray();
  }

  static async adopt(adoption) {
    console.log("la adocion", adoption);

    return await collection.updateOne(
      { _id: new ObjectId(adoption.userId) },
      { $push: { adopted: new ObjectId(adoption.petId) } }
    );
  }

  static async foster(fostering) {
    console.log("la fosteracion", fostering);

    return await collection.updateOne(
      { _id: new ObjectId(fostering.userId) },
      { $push: { fostered: new ObjectId(fostering.petId) } }
    );
  }

  static async save(saving) {
    console.log("la fosteracion", saving);

    return await collection.updateOne(
      { _id: new ObjectId(saving.userId) },
      { $push: { saved: new ObjectId(saving.petId) } }
    );
  }

  static async editUser(newData) {
    return await collection.updateOne(
      { username: newData.username },
      { $set: newData }
    );
  }
};
