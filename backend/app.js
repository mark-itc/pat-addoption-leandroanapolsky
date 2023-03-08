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
app.post("/newPet", PetsController.PostNewPet);
// app.get("/search", (req, res) => {

//   console.log(req.query);
//   res.send(req.query.type);
// });

// app.post("/task/new", AuthMiddleware, (req, res) => {
//   console.log(req.currentUser);
//   res.send();
// });

app.listen(3001, () => {
  console.log("connection running on port 3001");
});
