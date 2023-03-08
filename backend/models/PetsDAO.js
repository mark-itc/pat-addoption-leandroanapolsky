const {ObjectId} = require('mongodb')

let collection;

module.exports = class PetsDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      collection = await connection.collection("pets");
      console.log("succesfully connected to pets collection", collection);
    } catch (e) {
      console.log("PetsDAO error", e);
    }
  }
  //SEARCH PET
  static async getPetBySearch(type) {
    console.log("sucede la busqueda", type);

    return await collection
      .find({
        type: { $eq: type },
      })
      .toArray();
  }

  //SEARCH BY ID
  static async getPetByID(id) {
    console.log("sucede la busqueda", id);

    return await collection.findOne({ _id: new ObjectId(id) })
      
  }

  //ADD PET
  static async postNewPet(newPet) {
    await collection.insertOne({ ...newPet });
    // return newPet
  }
};
