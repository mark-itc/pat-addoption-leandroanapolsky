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
app.get("/user/:id", AuthMiddleware, UsersController.UserById);
app.put("/user/:id", AuthMiddleware, UsersController.EditUser);
app.get("/user", UsersController.GetAllUsers);
app.get("/user/:id/full", UsersController.UserById);
app.get("/user/pets/:id", UsersController.PetsById);
app.delete("/user/delete/:id", UsersController.DeleteUser);

app.put("/pet/adopt", AuthMiddleware, UsersController.Adopt);
app.put("/pet/foster", AuthMiddleware, UsersController.Foster);
app.put("/pet/save", AuthMiddleware, UsersController.Save);

//pet APIs
app.get("/search", PetsController.Search);
app.get("/pet/:id", PetsController.SearchOne);
app.post("/pet", PetsController.PostNewPet);
app.put("/pet/adopted", AuthMiddleware, PetsController.AdoptPet);
app.put("/pet/fostered", AuthMiddleware, PetsController.FosterPet);

app.post("/pet/foto", upload.single("image"), PetsController.Photo);

app.listen(3001, () => {
  console.log("connection running on port 3001");
});
