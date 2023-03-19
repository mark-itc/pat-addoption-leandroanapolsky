require("dotenv").config();
const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const UsersDAO = require("../models/UsersDAO");
const { ObjectId } = require("mongodb");
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

      const token = jwt.sign(
        {
          user_id: user._id,
          username: user.username,
        },
        tokenPass
      );

      return res.json({
        auth: true,
        token: token,

        user: {
          _id: new ObjectId(user._id),
          username: user.username,
          role: user.role,
        },
      });
    } catch (e) {
      console.log(`Error in UsersController.Login ${e}`);
      return res.status(500).json({
        success: false,
        message: "Unknown error",
      });
    }
  }

  static async UserById(req, res) {
    try {
      const foundUser = await UsersDAO.getUserById(req.params);
      console.log(foundUser);
      return res.send(foundUser);
    } catch (error) {
      console.log(error);
    }
  }

  static async DeleteUser(req, res) {
    try {
      const deletedUser = await UsersDAO.deleteUser(req.params);
      console.log(deletedUser);
      return res.send(deletedUser);
    } catch (error) {
      console.log(error);
    }
  }

  static async PetsById(req, res) {
    try {
      const foundPetsIDs = await UsersDAO.getPetsById(req.params);
      console.log(foundPetsIDs);
      return res.send(foundPetsIDs);
    } catch (error) {
      console.log(error);
    }
  }

  static async GetAllUsers(req, res) {
    try {
      const allUsers = await UsersDAO.showAllUsers(req);
      return res.send(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  static async Adopt(req, res) {
    try {
      console.log("el adopt", req.body);
      const adopt = await UsersDAO.adopt(req.body);
      return res.send(adopt);
    } catch (error) {
      console.log("el error es de controller", error);
    }
  }

  static async Foster(req, res) {
    try {
      console.log("el foster", req.body);
      const foster = await UsersDAO.foster(req.body);
      return res.send(foster);
    } catch (error) {
      console.log("el error es de controller", error);
    }
  }

  static async Save(req, res) {
    try {
      console.log("el save", req.body);
      const save = await UsersDAO.save(req.body);
      return res.send(save);
    } catch (error) {
      console.log("el error es de controller", error);
    }
  }

  static async EditUser(req, res) {
    try {
      const editUser = await UsersDAO.editUser(req.body);
      return res.send(editUser);
    } catch (error) {
      console.log(error);
    }
  }
};
