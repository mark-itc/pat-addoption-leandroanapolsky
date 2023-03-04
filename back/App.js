const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(express.json());
app.use(bodyParser.json());

let notes = [];

try {
  const notesData = fs.readFileSync("./notes.json");
  notes = JSON.parse(notesData);
  console.log(notes);
} catch (e) {
  console.log(e);
}

app.get("/hola", function (req, res) {
  res.send("holis");
});

app.post("/post", function (req, res) {
  const body = {};

  body["key"] = req.body["key2"];
  body["key2"] = req.body["key"];

  console.log(body);
  res.send(body);
});

// aca hace un push de cosas a un array como un objeto. y lo agrega al archivo de fs
app.post("/notes/add", function (req, res) {
  const { subject, note } = req.body;

  notes.push({ subject, note });

  console.log("notes", notes);

  fs.writeFileSync("./notes.json", JSON.stringify(notes));

  return res.json({});
});

//para ir a buscar un array
app.get("/notes/get", function (req, res) {
  return res.json(notes);
});

// fs.writeFileSync("./notes.json", JSON.stringify(notes));

//leer el archivo guardado
// fs.readFile("./file3.txt", { encoding: "utf-8" }, function (err, data) {
//   if (!err) {
//     console.log("async", data);
//   } else {
//     console.log(err);
//   }
// });

// try {
//   const data = fs.readFileSync("./file2.txt", { encoding: "utf-8" });
//   console.log("sync", data);
// } catch (e) {
//   console.log("sync err", e);
// }

// //como escribir en el archivo
// fs.writeFile("./file2.txt", "este es otro archivo", function (err) {
//   console.log(err);
// });

// fs.writeFileSync("./file3.txt", "esto es otro archivo 3");

// //escribir un objeto en el archivo y despues leerlo

// const users = {
//   user1: "pass1",
//   user2: "pass2",
//   user3: "pass3",
//   user4: "pass4",
// };

// fs.writeFileSync("./users.json", JSON.stringify(users));

// const usersFile = fs.readFileSync("./users.json", { encoding: "utf-8" });

// const parsedUsersFile = JSON.parse(usersFile);

// console.log("users", parsedUsersFile["user3"]);
// parsedUsersFile["user3"] = "nuevo pass 3";

// //con esto modifica el archivo

// fs.writeFileSync("./users.json", JSON.stringify(parsedUsersFile));

app.listen(3000);
