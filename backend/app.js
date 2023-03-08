require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDB } = require("./models/init");

const UsersController = require("./controllers/UsersController");
const PetsController = require("./controllers/PetsController");

const { AuthMiddleware } = require("./middlewares/AuthMiddleware");
const app = express();

initDB();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.post("/register", UsersController.Register);
app.post("/login", UsersController.Login);
app.get("/search", PetsController.Search);
app.get("/search/:id", PetsController.SearchOne);
app.post("/admin/newPet", PetsController.PostNewPet);

app.listen(3001, () => {
  console.log("connection running on port 3001");
});
