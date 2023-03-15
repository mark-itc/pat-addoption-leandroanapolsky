require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDB } = require("./models/init");
const cookieparser = require("cookie-parser");
const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary");

const UsersController = require("./controllers/UsersController");
const PetsController = require("./controllers/PetsController");

const { AuthMiddleware } = require("./middlewares/AuthMiddleware");
const { auth } = require("./middlewares/AuthorizationMiddleware");
const app = express();

initDB();

app.use(cookieparser());

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
//user APIs
app.post("/signup", UsersController.Register);
app.post("/login", UsersController.Login);
app.get("/user/:id", UsersController.UserById);
app.get("/user/auth", auth);
app.put("/user/:id", UsersController.EditUser);
app.get("/user", UsersController.GetAllUsers);
app.get("/user/:id/full", UsersController.UserById);
app.post("/task/new", AuthMiddleware, (req, res) => {
  console.log("req currentUser", req.currentUser);
  res.send({ user: req.currentUser });
});

//pet APIs
app.get("/search", PetsController.Search);
app.get("/pet/:id", PetsController.SearchOne);
app.put("/pet/:id", PetsController.EditPet);
app.post("/pet", PetsController.PostNewPet);
app.post("/pet/foto", upload.single("image"), PetsController.Photo);

app.listen(3001, () => {
  console.log("connection running on port 3001");
});
