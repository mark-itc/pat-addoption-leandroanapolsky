const { editPet } = require("../models/PetsDAO");
const PetsDAO = require("../models/PetsDAO");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

module.exports = class PetsController {
  static async Search(req, res) {
    try {
      const petsArray = await PetsDAO.getPetBySearch(req.query.type);
      console.log("resultados del controller", petsArray);
      return res.send(petsArray);
    } catch (e) {
      console.log("the search failed in pets controller");
    }
  }

  static async SearchOne(req, res) {
    try {
      const petFound = await PetsDAO.getPetByID(req.params);
      console.log("pet found", petFound);
      return res.send(petFound);
    } catch (e) {
      console.log("the search failed in pets controller search one");
    }
  }

  static async AdoptPet(req, res) {
    try {
      console.log("el adopt del pet", req.body);
      const adoptPet = await PetsDAO.adoptPet(req.body);
      return res.send(adoptPet);
    } catch (error) {
      console.log("el error es de controller", error);
    }
  }

  static async FosterPet(req, res) {
    try {
      console.log("el foster del pet", req.body);
      const adoptPet = await PetsDAO.fosterPet(req.body);
      return res.send(fosterPet);
    } catch (error) {
      console.log("el error es de controller", error);
    }
  }

  static async Photo(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result.secure_url);

      return res.send({ url: result.secure_url });
     
    } catch (e) {
      console.log("error en el pet controller de la foto", e);
    }
  }

  static async PostNewPet(req, res) {
    try {
      await PetsDAO.postNewPet(req.body);
      return res.json(req.body);
    } catch (e) {
      console.log("error en el pet controller del posteo", e);
    }
  }
};
