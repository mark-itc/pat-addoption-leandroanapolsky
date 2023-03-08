require("dotenv").config();
const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const UsersDAO = require("../models/UsersDAO");
const {
  RegisterValidation,
  LoginValidation,
} = require("../validations/UsersValidations");

const tokenPass = process.env.JWT;

module.exports = class UsersController {
  static async Register(req, res) {
    try {
      const userObject = req.body;
      const validRequest = RegisterValidation(userObject);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please try filling your data again",
        });
      }

      const existingUser = await UsersDAO.getUserByUsername(
        userObject.username
      );
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            "this user name already exists, please choose a different user name",
        });
      }

      userObject.password = sha256.sha256(userObject.password);
      userObject.password2 = sha256.sha256(userObject.password2);

      await UsersDAO.createUser(req.body);
      return res.json(req.body);
    } catch (e) {
      console.log(`Error in UsersController.Register ${e}`);
      return res.status(500).json({
        success: false,
        message: "Unknown error",
      });
    }
  }

  static async Login(req, res) {
    try {
      const validRequest = LoginValidation(req.body);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Wrong user name or password",
        });
      }

      const user = await UsersDAO.getUserByUsername(req.body.username);

      if (!user || user.password != sha256(req.body.password)) {
        return res.status(400).json({
          success: false,
          message: "Wrong username or password",
        });
      }

      //   await UsersDAO.getUserById("640668a9ea3a49d5538a56a9");

      const token = jwt.sign(
        {
          user_id: user._id,
          username: user.username,
        },
        tokenPass
      );

      return res.json({
        token: token,
      });
    } catch (e) {
      console.log(`Error in UsersController.Login ${e}`);
      return res.status(500).json({
        success: false,
        message: "Unknown error",
      });
    }
  }
};
