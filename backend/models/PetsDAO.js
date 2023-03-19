const { ObjectId } = require("mongodb");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

let collection;

module.exports = class PetsDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      collection = await connection.collection("pets");
      
    } catch (e) {
      console.log("PetsDAO error", e);
    }
  }
  //SEARCH PET
  static async getPetBySearch(type) {
    return await collection
      .find({
        type: { $eq: type },
      })
      .toArray();
  }

  //SEARCH BY ID
  static async getPetByID(id) {
    console.log("sucede la busqueda", id);

    return await collection.findOne({ _id: new ObjectId(id) });
  }



//ADOPT, FOSTER
static async adoptPet(adoption) {
  console.log("la adocion del pet", adoption);

  return await collection.updateOne(
    { _id: new ObjectId(adoption.petId) },
    { $set: { status: 'Adopted' } }
  );
}

static async fosterPet(fostering) {
  console.log("la fosteracion del pet", fostering);

  return await collection.updateOne(
    { _id: new ObjectId(fostering.petId) },
    { $set: { status: 'Fostered' } }
  );
}

  //ADD PET
  static async postNewPet(newPet) {
    console.log(newPet);
    await collection.insertOne({ ...newPet });
    return newPet;
  }

};
