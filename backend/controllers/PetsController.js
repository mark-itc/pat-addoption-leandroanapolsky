const PetsDAO = require("../models/PetsDAO");

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

  static async PostNewPet(req, res) {
    try {
      console.log("postMewPet controller");

      await PetsDAO.postNewPet(req.body);
      return res.json(req.body);
    } catch (e) {
      console.log("error en el pet controller del posteo", e);
    }
  }
};
