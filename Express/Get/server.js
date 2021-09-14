const express = require("express");
const app = express();
const db = require("./db.json");

let newdata = JSON.stringify(db);
let formatedata = JSON.parse(newdata);
let desending = formatedata.sort((a, b) => {
  return b.id - a.id;
});
//console.log(desending);

//sending my first response
app.get("/", (req, res) => {
  res.send("Hello wrold");
});

//sending users
app.get("/users", (req, res) => {
  res.send(db);
});

//sending users in desending manners
app.get("/users&desending", (req, res) => {
  res.send(desending);
});

app.listen(3000, () => {
  console.log("Listning on port 3000");
});
