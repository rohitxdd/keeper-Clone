const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/keeperApp");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const noteSchema = new Schema({
  id: ObjectId,
  title: String,
  content: String,
  date: Date,
});

const note = new mongoose.model("Note", noteSchema);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  note.find({}, (err, arr) => {
    if (!err) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(arr));
    }
  });
});

app.post("/", (req, res) => {
  if (!req.body.data) res.send("No entry to made");
  let title = req.body.data.title;
  let content = req.body.data.content;
  let date = new Date();

  const newEntry = new note({
    title: title,
    content: content,
    date: date,
  });

  newEntry.save((err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
  res.statusCode = 200;
  res.send("ok");
});

app.delete("/api/:id", (req, res) => {
  note.deleteOne({ _id: req.params.id }, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
});

app.listen(5000, (err) => {
  if (!err) console.log("server up");
});
