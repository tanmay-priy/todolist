//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const ejs = require("ejs");
const app = express();



let tasks = ["Buy Game", "Install Game", "Play Game"];
let workTasks = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("list", {
    listItem: day,
    newItems: tasks
  });

});

app.post("/", function(req, res) {
  let newTask = req.body.newTask;
  if (req.body.list === "Work Todos") {
    workTasks.push(newTask);
    res.redirect("/work");
  } else {
    tasks.push(newTask);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listItem: "Work Todos",
    newItems: workTasks
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
